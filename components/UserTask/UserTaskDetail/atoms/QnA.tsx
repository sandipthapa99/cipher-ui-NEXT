import React from "react";
import type { Question } from "staticData/userTasks";

interface QnAProps {
    questions: Question[];
}
export const QnA = ({ questions }: QnAProps) => {
    const renderQuestions = () => {
        return questions.map((question, index) => (
            <li className="qna-list__item" key={index}>
                <h4 className="title">{`Q) ${question.question}`}</h4>
                <p className="text">{`A) ${question.answer}`}</p>
            </li>
        ));
    };
    return (
        <div className="qna-container">
            <h2 className="title mb-24">Q&A</h2>
            <ul className="qna-list">{renderQuestions()}</ul>
        </div>
    );
};
