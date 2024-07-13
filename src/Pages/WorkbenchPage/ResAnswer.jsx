import React from 'react';
import './WorkbenchPage.css';

export function ResAnswer({ resAnswerUser }) {
    console.log(resAnswerUser)
    return (
        <>
            {resAnswerUser === 0 && (
                <div className="resAnswerRect greenResAnswerRect">Верно, молодец!</div>
            )}
            {resAnswerUser === 1 && (
                <div className="resAnswerRect orangeResAnswerRect">Почти правильно</div>
            )}
            {resAnswerUser === 2 && (
                <div className="resAnswerRect redResAnswerRect">Попробуй ещё раз</div>
            )}
        </>
    );
}
