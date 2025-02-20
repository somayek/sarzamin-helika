import React, { useState, useEffect } from "react";
import "./QuestionnaireForm.css"; // Import the CSS file

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
        currentQuestion: {},
        selectedAnswers: {},
        answeredQuestions: [],
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRequests = [...requests];
    updatedRequests[index][field] = value;
    setRequests(updatedRequests);
  };

  const insertIntoQuestions = (currentQuestion, extraQuestion) => {
    const temp = currentQuestion.next_question_key;
    extraQuestion.next_question_key = temp;
    currentQuestion.next_question_key = extraQuestion.key;
  };

  const handleAnswerChange = (index, questionKey, value) => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      const request = updatedRequests[index];

      // Check if the answer is the same as before, if so, don't update.
      if (request.selectedAnswers[questionKey]) {
        return updatedRequests;
      }

      request.selectedAnswers[questionKey] = value;

      // Find the current question and selected answer
      const currentQuestion = allQuestions.find((q) => q.key === questionKey);
      const selectedAnswer = answers.find((a) => a.key === value);

      // Add the question and answer to answeredQuestions
      const newAnsweredQuestions = [
        ...request.answeredQuestions,
        { question: currentQuestion.text, answer: selectedAnswer.text },
      ];

      request.answeredQuestions = newAnsweredQuestions;

      // Update the next question based on the selected answer
      // if (selectedAnswer?.next_question_key) {
      //   const extraQuestion = allQuestions.find(
      //     (q) => q.key === selectedAnswer.next_question_key
      //   );
      //   if (extraQuestion) {
      //     console.log(extraQuestion);
      //     insertIntoQuestions(currentQuestion, extraQuestion);
      //   }
      // }

      // request.next_question_key = currentQuestion?.next_question_key || null;
      if (selectedAnswer?.next_question_key) {
        const nextQuestion = allQuestions.find(
          (q) => q.key === selectedAnswer.next_question_key
        );
        if (nextQuestion) {
          nextQuestion.next_question_key = currentQuestion.next_question_key;

          // Update the current question with the next question
          request.currentQuestion = nextQuestion;
        }
      } else if (request.currentQuestion.next_question_key) {
        request.currentQuestion = allQuestions.find(
          (q) => q.key === request.currentQuestion.next_question_key
        );
      } else {
        request.currentQuestion = null;
      }

      // Set next_question_key to the next question or null
      // request.next_question_key = currentQuestion?.next_question_key || null;

      return updatedRequests;
    });
  };

  const handleSubmit = async (index) => {
    const request = requests[index];
    setIsSubmitting(true);

    try {
      const submittedAnswersArray = Object.values(request.selectedAnswers);
      const matchingRules = rules.filter(
        (rule) =>
          rule.answers.length === submittedAnswersArray.length &&
          rule.answers.every((key) => submittedAnswersArray.includes(key))
      );

      const matchingDocuments = matchingRules
        .map((rule) =>
          documents.filter((doc) => rule.documents.includes(doc.key))
        )
        .flat();

      if (matchingDocuments.length > 0) {
        request.documents = matchingDocuments;
      } else {
        request.documents = [];
      }

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
          const questionApplication = `${request.application}_${request.sex}_${request.age}`;
          const matchRule = rules.find(
            (q) => q.application === questionApplication
          );
          if (!matchRule) {
            console.warn(`No rule found for ${questionApplication}`);
            return null;
          }

          request.questions = allQuestions.filter((q) =>
            matchRule?.questions?.includes(q.key)
          );
          if (!request.currentQuestion && request.questions.length > 0) {
            request.currentQuestion = request.questions[0];
          }
        }
        const currentAnswers = request.currentQuestion
          ? answers.filter((a) =>
              request.currentQuestion?.options?.includes(a.key)
            )
          : [];

        return (
          <div key={index} className="request-block">
            <h3>درخواست {index + 1}</h3>
            <input
              type="text"
              placeholder="نام"
              value={request.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
            <select
              value={request.sex}
              onChange={(e) => handleInputChange(index, "sex", e.target.value)}
            >
              <option value="">انتخاب جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            <select
              value={request.application}
              onChange={(e) =>
                handleInputChange(index, "application", e.target.value)
              }
            >
              <option value="">انتخاب برنامه</option>
              {uniqueApplications.map((app, i) => (
                <option key={i} value={app.value}>
                  {app.text}
                </option>
              ))}
            </select>
            <select
              value={request.age}
              onChange={(e) => handleInputChange(index, "age", e.target.value)}
            >
              <option value="">سن</option>
              {ageRanges.map((app, i) => (
                <option key={i} value={app.value}>
                  {app.text}
                </option>
              ))}
            </select>

            {request.answeredQuestions.length > 0 && (
              <div className="answered-questions">
                <h3>Answered Questions</h3>
                <ul>
                  {request.answeredQuestions.map((item, idx) => (
                    <li key={idx}>{`${item.question}: ${item.answer}`}</li>
                  ))}
                </ul>
              </div>
            )}

            {request.currentQuestion && (
              <div>
                <label>{request.currentQuestion.text}</label>
                <select
                  value={
                    request.selectedAnswers[request.currentQuestion.key] || ""
                  }
                  onChange={(e) =>
                    handleAnswerChange(
                      index,
                      request.currentQuestion.key,
                      e.target.value
                    )
                  }
                >
                  <option value="">انتخاب کنید</option>
                  {currentAnswers.map((answer) => (
                    <option key={answer.key} value={answer.key}>
                      {answer.text}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {request.currentQuestion === null && (
              <button onClick={() => handleSubmit(index)}>
                دریافت لیست مدارک
              </button>
            )}
            {request.documents && request.documents.length > 0 && (
              <ul>
                {request.documents.map((doc, i) => (
                  <li key={i}>{doc.text}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionnaireForm;
