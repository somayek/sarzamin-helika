import React, { useState, useEffect } from "react";
import "./QuestionnaireForm.css"; // Import the CSS file
import RequestBlock from "./RequestBlock";
import QuestionSelector from "./QuestionSelector";

const QuestionnaireForm = () => {
  const [requests, setRequests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rules, setRules] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serverEndpoint = "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await fetch(`${serverEndpoint}/questions`);
        const questionsData = await questionResponse.json();
        setAllQuestions(questionsData);

        const answerResponse = await fetch(`${serverEndpoint}/answers`);
        const answersData = await answerResponse.json();
        setAnswers(answersData);

        const rulesResponse = await fetch(`${serverEndpoint}/rules`);
        const rulesData = await rulesResponse.json();
        setRules(rulesData);

        const documentsResponse = await fetch(`${serverEndpoint}/documents`);
        const documentsData = await documentsResponse.json();
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addRequest = () => {
    setRequests([
      ...requests,
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
  };

  const handleInputChange = (index, field, value) => {
    const updatedRequests = [...requests];
    updatedRequests[index][field] = value;
    setRequests(updatedRequests);
  };

  const handleAnswerChange = (index, questionKey, value) => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      const request = updatedRequests[index];

      if (request.selectedAnswers[questionKey]) {
        return updatedRequests;
      }

      request.selectedAnswers[questionKey] = value;

      const currentQuestion = allQuestions.find((q) => q.key === questionKey);
      const selectedAnswer = answers.find((a) => a.key === value);

      const newAnsweredQuestions = [
        ...request.answeredQuestions,
        { question: currentQuestion.text, answer: selectedAnswer.text },
      ];

      request.answeredQuestions = newAnsweredQuestions;
      if (selectedAnswer?.next_question_key) {
        const nextQuestion = allQuestions.find(
          (q) => q.key === selectedAnswer.next_question_key
        );
        if (nextQuestion) {
          nextQuestion.next_question_key =
            request.currentQuestion.next_question_key;
          request.currentQuestion = nextQuestion;
        }
      } else if (request.currentQuestion?.next_question_key) {
        request.currentQuestion = allQuestions.find(
          (q) => q.key === request.currentQuestion.next_question_key
        );
      } else {
        request.currentQuestion = null;
      }

      return updatedRequests;
    });
  };

  const handleSubmit = async (index) => {
    const request = requests[index];
    setIsSubmitting(true);

    try {
      const submittedAnswersArray = Object.values(request.selectedAnswers);
      // const documents = request.rule?.documents;
      // console.log("submittedAnswersArray, ", submittedAnswersArray);
      // console.log("documents", documents);
      // debugger;
      const ruleCharges = request.rule?.charges;
      const ruleDocuments = request.rule?.documents;
      const answerDocuments = submittedAnswersArray.flatMap(
        (answerKey) =>
          answers.find((ans) => ans.key === answerKey)?.documents || []
      );
      const answerCharges = submittedAnswersArray.flatMap(
        (answerKey) =>
          answers.find((ans) => ans.key === answerKey)?.charges || []
      );

      // Combine documents and remove duplicates
      const allDocuments = [...new Set([...ruleDocuments, ...answerDocuments])];

      // Combine charges and remove duplicates
      const allCharges = [...new Set([...ruleCharges, ...answerCharges])];
      request.documents = allDocuments
        .map((docKey) => documents.find((doc) => doc.key === docKey))
        .filter(Boolean);
      request.charges = allCharges;
      setRequests([...requests]);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    setIsSubmitting(false);
  };

  if (allQuestions.length === 0 || answers.length === 0 || rules.length === 0) {
    return <div>Loading...</div>;
  }

  const uniqueApplications = [{ value: "passport", text: "درخواست گذرنامه" }];
  const ageRanges = [
    { value: "below_15", text: " زیر ۱۵سال تمام" },
    { value: "15_18", text: "۱۵ تا ۱۸سال تمام" },
    { value: "18_50", text: "بین۱۸ تا ۵۰ سال" },
    { value: "above_50", text: "۵۰ سال به بالا" },
  ];

  return (
    <div className="questionnaire-form">
      <h2>درخواست پاسپورت</h2>
      <button onClick={addRequest} className="add-request-button">
        افزودن درخواست جدید
      </button>
      {requests.map((request, index) => {
        if (request.sex && request.age && request.application) {
          const ruleName = `${request.application}_${request.sex}_${request.age}`;
          request.rule = rules.find((q) => q.application === ruleName);
          if (!request.rule) {
            console.warn(`No rule found for ${ruleName}`);
            return null;
          }

          request.questions = allQuestions.filter((q) =>
            request.rule?.questions?.includes(q.key)
          );

          if (
            !request.currentQuestion &&
            request.answeredQuestions.length === 0
          ) {
            request.currentQuestion = request.questions[0];
          }
        }
        const currentAnswers = request.currentQuestion
          ? answers.filter((a) =>
              request.currentQuestion?.options?.includes(a.key)
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
            allQuestions={allQuestions}
            answers={answers}
            uniqueApplications={uniqueApplications}
            ageRanges={ageRanges}
          />
        );
      })}
    </div>
  );
};

export default QuestionnaireForm;
