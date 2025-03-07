import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./QuestionnaireForm.css";
import RequestBlock from "./RequestBlock";
import DocsBlock from "./DocsBlock";

const QuestionnaireForm = () => {
  const [requests, setRequests] = useState([
    {
      name: "",
      application: "",
      questions: [],
      currentQuestion: null,
      selectedAnswers: {},
      answeredQuestions: [],
      documents: [],
      charges: [],
      rule: "",
    },
  ]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rules, setRules] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [traceId, setTraceId] = useState("");
  const serverEndpoint = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsData, answersData, rulesData, documentsData] =
          await Promise.all([
            fetch(`${serverEndpoint}/questions`).then((res) => res.json()),
            fetch(`${serverEndpoint}/answers`).then((res) => res.json()),
            fetch(`${serverEndpoint}/rules`).then((res) => res.json()),
            fetch(`${serverEndpoint}/documents`).then((res) => res.json()),
          ]);

        setAllQuestions(questionsData);
        setAnswers(answersData);
        setRules(rulesData);
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [serverEndpoint]);

  useEffect(() => {
    const generateTraceId = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const traceId = Array.from({ length: 6 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");

      setTraceId(traceId);
    };

    generateTraceId();
  }, []);

  const addRequest = useCallback(() => {
    setRequests((prevRequests) => [
      ...prevRequests,
      {
        name: "",
        sex: "",
        application: "",
        age: "",
        questions: [],
        currentQuestion: null,
        selectedAnswers: {},
        answeredQuestions: [],
        documents: [],
        charges: [],
        rule: "",
      },
    ]);
  }, []);

  const link = useCallback(
    (questionList) => {
      const linkedQuestions = questionList
        .map((key) => allQuestions.find((q) => q.key === key))
        .filter(Boolean);

      linkedQuestions.forEach((question, index) => {
        question.next_question_key = linkedQuestions[index + 1]?.key || null;
      });
      return linkedQuestions;
    },
    [allQuestions]
  );

  const handleInputChange = useCallback((index, field, value) => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      updatedRequests[index][field] = value;
      return updatedRequests;
    });
  }, []);

  const saveAuditLog = useCallback(
    async (requests) => {
      const refine = (req) => {
        req.rule = req.rule.application;
        req.documents = req.documents.map((d) => d.key);
        req.questions = req.questions.map((d) => d.key);
        req.charges = req.charges.map((d) => d.amount);
      };

      const logObj = requests.map((req) => {
        const clonedReq = {
          ...req,
          documents: [...req.documents],
          questions: [...req.questions],
          charges: [...req.charges],
        };

        refine(clonedReq);
        return clonedReq;
      });
      console.log(requests, logObj);
      try {
        const response = await fetch(`${serverEndpoint}/log`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: logObj,
            traceId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save audit log");
        }
      } catch (error) {
        console.error("Error saving audit log:", error);
      }
    },
    [serverEndpoint, traceId]
  );

  const handleAnswerChange = useCallback(
    (index, questionKey, value) => {
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        const request = updatedRequests[index];

        if (request.selectedAnswers[questionKey]) return updatedRequests;

        request.selectedAnswers[questionKey] = value;

        const currentQuestion = allQuestions.find((q) => q.key === questionKey);
        const selectedAnswer = answers.find((a) => a.key === value);

        request.answeredQuestions.push({
          question: currentQuestion.text,
          answer: selectedAnswer.text,
        });

        if (selectedAnswer?.next_question_key) {
          const temp = request.currentQuestion.next_question_key;
          request.currentQuestion = allQuestions.find(
            (q) => q.key === selectedAnswer.next_question_key
          );
          request.currentQuestion.next_question_key = temp;
        } else {
          request.currentQuestion = request.currentQuestion?.next_question_key
            ? allQuestions.find(
                (q) => q.key === request.currentQuestion.next_question_key
              )
            : null;
        }

        return updatedRequests;
      });
    },
    [allQuestions, answers]
  );

  const handleSubmit = useCallback(async () => {
    await submitRequests();
    saveAuditLog(requests);
  }, [requests, saveAuditLog]);

  const submitRequests = async () => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];

      try {
        updatedRequests.forEach((request) => {
          const submittedAnswersArray = Object.values(request.selectedAnswers);
          const ruleDocuments = request.rule?.documents || [];
          const ruleCharges = request.rule?.charges || [];

          const answerDocuments = submittedAnswersArray.flatMap(
            (answerKey) =>
              answers.find((ans) => ans.key === answerKey)?.documents || []
          );
          const answerCharges = submittedAnswersArray.flatMap(
            (answerKey) =>
              answers.find((ans) => ans.key === answerKey)?.charges || []
          );

          request.documents = [
            ...new Set([...ruleDocuments, ...answerDocuments]),
          ]
            .map((docKey) => documents.find((doc) => doc.key === docKey))
            .filter(Boolean);

          request.charges = [...new Set([...ruleCharges, ...answerCharges])];
        });
      } catch (error) {
        console.error("Error submitting answers:", error);
      }

      return updatedRequests;
    });
  };

  const uniqueApplications = useMemo(
    () => [
      { value: "پاسپورت", text: "درخواست گذرنامه" },
      { value: "وکالت", text: "درخواست وکالت‌نامه" },
    ],
    []
  );

  if (!allQuestions.length || !answers.length || !rules.length) {
    return <div>در حال بارگزاری ...</div>;
  }
  const docExists = requests.some(
    (request) => request.documents.length > 0 || request.charges.length > 0
  );
  return (
    <div>
      <div className="traceid">
      <p>برای راهنمایی و ارایه بهتر خدمات، ابتدا طی چند گام، می‌کوشیم نیاز و شرایط شما را بهتر بشناسیم. پس از آن بسته پیشنهادی برای انجام خدمات مورد نیاز شما به بهترین و سریع‌ترین روش ممکن را به شما پیشنهاد خواهیم داد. </p>
      <p>لطفا ابتدا مشخص کنید خدمات را برای چه کسی یا چه کسانی نیاز دارید. اگر می‌خواهید همزمان برای خود و اعضای خانواده خود اقدام کنید، ابتدا با ثبت مشخصات خودتان شروع کنید.</p>
        <h3>شناسه پیگیری:  ‌{traceId}</h3>
        <p>لطفا این شماره پیگیری را یادداشت نمایید تا در پیگیری‌های بعدی همکاران ما بتوانند بهتر و سریع‌تر به شما کمک کنند. </p>
      </div>
      <div className="questionnaire-form">
        {requests.map((request, index) => {
          if (request.application) {
            request.rule =
              rules.find((r) => r.application === request.application) || null;
            if (!request.rule) return null;

            request.questions = link(request.rule.questions);
            if (
              !request.currentQuestion &&
              request.answeredQuestions.length === 0
            ) {
              request.currentQuestion = request.questions[0];
            }
          }

          const currentAnswers = request.currentQuestion
            ? answers.filter((a) =>
                request.currentQuestion.options?.includes(a.key)
              )
            : [];

          return (
            <RequestBlock
              key={index}
              traceId={traceId}
              request={request}
              index={index}
              handleInputChange={handleInputChange}
              handleAnswerChange={handleAnswerChange}
              handleSubmit={handleSubmit}
              currentAnswers={currentAnswers}
              answers={answers}
              uniqueApplications={uniqueApplications}
            />
          );
        })}
        {requests[requests.length - 1].application &&
          requests[requests.length - 1].currentQuestion === null && (
            <div>
              <button onClick={addRequest} className="add-request-button">
                افزودن درخواست جدید
              </button>
              <button
                onClick={() => handleSubmit()}
                style={{ margin: "0 5px" }}
              >
                پایان و نمایش نتیجه
              </button>
            </div>
          )}
        {docExists && <DocsBlock requests={requests} traceId={traceId} />}
      </div>
    </div>
  );
};

export default QuestionnaireForm;
