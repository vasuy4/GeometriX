import { useState } from 'react';


export default function FormShapes({selectedShape, setSelectedShape}){

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSelectedShape(false);
    }
    
    return (
        <>
            {selectedShape && (
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="sepelected">{selectedShape}</label>
                <label htmlFor="name">a</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">b</label>
                <input type="email" id="email" name="email" />

                <button type="submit">Отправить</button>
            </form>
            )}
        </>
    )
}