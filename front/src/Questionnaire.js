import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./QuestionnaireForm.css";
import RequestBlock from "./RequestBlock";

const QuestionnaireForm = () => {
  const [requests, setRequests] = useState([
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
  const [allQuestions, setAllQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rules, setRules] = useState([]);
  const [documents, setDocuments] = useState([]);
  const serverEndpoint = "http://localhost:5000/api";

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

  const handleSubmit = useCallback(
    (index) => {
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        const request = updatedRequests[index];

        try {
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
        } catch (error) {
          console.error("Error submitting answers:", error);
        }

        return updatedRequests;
      });
    },
    [answers, documents]
  );

  const uniqueApplications = useMemo(
    () => [{ value: "passport", text: "درخواست گذرنامه" }],
    []
  );

  if (!allQuestions.length || !answers.length || !rules.length) {
    return <div>Loading...</div>;
  }

  return (
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
          <button onClick={addRequest} className="add-request-button">
            افزودن درخواست جدید
          </button>
        )}
    </div>
  );
};

export default QuestionnaireForm;
