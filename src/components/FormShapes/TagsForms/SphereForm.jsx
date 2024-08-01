import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import React, { useEffect, useState } from 'react';

// Отображает форму трапеции
export default function HemisphereForm({ handleFormSubmit, selectedShape, handleClose, updateFigure }) {
    const [formKey, setFormKey] = useState(0);
   
   
    useEffect(() => {
        setFormKey(formKey + 1); // Увеличение ключа при изменении updateFigure
    }, [updateFigure]);

    
    

    console.log(updateFigure)
    if (updateFigure != null) {
        
        console.log(updateFigure.formValues[0]);

        return (
            <div className="forms-container">
                <div className="form-wrapper">
                    <form key={formKey}>
                        <p>{selectedShape}</p>
                        <div className='form-group'>
                            <label htmlFor="rr">r</label>
                            <input type="text" id="rr" name="rr" defaultValue={updateFigure.formValues[0]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="dd">d</label>
                            <input type="text" id="dd" name="dd" defaultValue={updateFigure.formValues[1]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="PP">P</label>
                            <input type="text" id="PP" name="PP" defaultValue={updateFigure.formValues[2]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="SobSob">Sob</label>
                            <input type="text" id="SobSob" name="SobSob" defaultValue={updateFigure.formValues[3]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="VV">V</label>
                            <input type="text" id="VV" name="VV" defaultValue={updateFigure.formValues[4]} />
                        </div>
                    </form>
                </div>
                <div className="form-wrapper">
                
                    <form key={formKey + 1} onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                        <button onClick={handleClose}>Close</button>
                        <p>{selectedShape}</p>
                        <div className='form-group'>
                            <label htmlFor="r-empty">r</label>
                            <input type="text" id="r-empty" name="r" defaultValue="" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="d-empty">d</label>
                            <input type="text" id="d-empty" name="d" defaultValue="" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="P-empty">P</label>
                            <input type="text" id="P-empty" name="P" defaultValue="" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Sob-empty">Sob</label>
                            <input type="text" id="Sob-empty" name="Sob" defaultValue="" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="V-empty">V</label>
                            <input type="text" id="V-empty" name="V" defaultValue="" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }


    
    

    const calcWithSides = (r) => {
        let Sob = 4 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }
    const calcWithDiametr = (d) => {
        let r = d / 2;
        let Sob = 4 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r

        return [r, d, P, Sob, V]
    }
    const calcWithVolume = (V) => {
        let r = Math.cbrt(V * 3 / 2 / Math.PI)
        let Sob = 4 * Math.PI * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }
    const calcWithSob = (Sob) => {
        let r = Math.sqrt(Sob / 4 / Math.PI)
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }




    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let r = fixedNum(Number(document.getElementById('r').value))
        let d = fixedNum(Number(document.getElementById('d').value)) // добавил диаметр
        let P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
        let Sob = fixedNum(Number(document.getElementById('Sob').value))
        let V = fixedNum(Number(document.getElementById('V').value))


        const arrInput = [r, d, P, Sob, V]
        const idInputs = ['r', 'd', 'P', 'Sob', 'V']

        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (r) {
            let arrCheck = calcWithSides(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (d) {
            let arrCheck = calcWithDiametr(d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

        if (V) {
            let arrCheck = calcWithVolume(V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (Sob) {
            let arrCheck = calcWithSob(Sob)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
    }
    
    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>
            <div className='form-group'>
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
            </div>
            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>
            <div className='form-group'>
                <label htmlFor="Sob">Sob</label>
                <input type="text" id="Sob" name="Sob" />
            </div>
            <div className='form-group'>
                <label htmlFor="V">V</label>
                <input type="text" id="V" name="V" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}