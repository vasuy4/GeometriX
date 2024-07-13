import React from 'react';
import './WorkbenchPage.css';

export function ResAnswer({ resAnswerUser }) {
    console.log(resAnswerUser)
    return (
        <>
            {resAnswerUser === 0 && (
                <div className="green-rectangle">Верно, молодец!</div>
            )}
            {resAnswerUser === 1 && (
                <div className="orange-rectangle">Почти правильно</div>
            )}
            {resAnswerUser === 2 && (
                <div className="red-rectangle">Попробуй ещё раз</div>
            )}
        </>
    );
}
