import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'

import React, { useEffect, useState } from 'react';

import sphereImage from '../formShapesImg/sphere.svg'


// Отображает форму трапеции
export default function HemisphereForm({ handleFormSubmit, selectedShape, handleClose, updateFigure,handleOptionsClick }) {
    const [formKey, setFormKey] = useState(0);
   
   
    useEffect(() => {
        setFormKey(formKey + 1); // Увеличение ключа при изменении updateFigure
    }, [updateFigure]);

    
    

   
   


    // handleOptionsClick(['rebuldFigure',updateFigure.id]);
    

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
        
        let r,d,P,Sob,V;
        let idInputsTime
        if(updateFigure != null){
             r = fixedNum(Number(document.getElementById('r-empty').value))
             d = fixedNum(Number(document.getElementById('d-empty').value)) // добавил диаметр
             P = fixedNum(Number(document.getElementById('P-empty').value)) // добавил длину основания (окружности)
             Sob = fixedNum(Number(document.getElementById('Sob-empty').value))
             V = fixedNum(Number(document.getElementById('V-empty').value))
             idInputsTime = ['r-empty', 'd-empty', 'P-empty', 'Sob-empty', 'V-empty']
        }else{
             r = fixedNum(Number(document.getElementById('r').value))
             d = fixedNum(Number(document.getElementById('d').value)) // добавил диаметр
             P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
             Sob = fixedNum(Number(document.getElementById('Sob').value))
             V = fixedNum(Number(document.getElementById('V').value))
             idInputsTime = ['r', 'd', 'P', 'Sob', 'V']
        }

        const arrInput = [r, d, P, Sob, V]
        const idInputs=idInputsTime;
        
        
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

        //тут перестройка
        if(updateFigure != null){
            r = fixedNum(Number(document.getElementById('r-empty').value))
            d = fixedNum(Number(document.getElementById('d-empty').value)) // добавил диаметр
            P = fixedNum(Number(document.getElementById('P-empty').value)) // добавил длину основания (окружности)
            Sob = fixedNum(Number(document.getElementById('Sob-empty').value))
            V = fixedNum(Number(document.getElementById('V-empty').value))
            let arrInput = [r, d, P, Sob, V]


            handleOptionsClick(['rebuldFigure',[arrInput,updateFigure]])

            ///!!!!!!!!заменить руками
            let idInputsTime2=['rr','dd','PP','SobSob','VV']///!!!!!!!!заменить руками
            ///!!!!!!!!заменить руками
            for (let i = 0; i < arrInput.length; i++) {

                let inputObj = document.getElementById(idInputsTime[i])
                inputObj.value = ''
                inputObj = document.getElementById(idInputsTime2[i])
                inputObj.value = arrInput[i]
            }
       }
    }

    if (updateFigure != null) {
        
        return (
            <div className="forms-container">
                <div className="form-wrapper">
                    <form key={formKey}>
                    <button onClick={(event) => { event.preventDefault();handleClose(); handleOptionsClick(['deleteFigure',updateFigure.id]);}}>Delete</button>
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
                        <button onClick={handleClose}>Close</button>
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
                        <button type="submit">Построить</button>
                        <button onClick={handleClose}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
    
    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <img className="squareImage" src={sphereImage} alt='sphere' />


            <div className="row">
                <div className='form-group'>
                    <label htmlFor="r" className='label_inner_text'>
                        r=
                        <input className='labela w70' type="text" id="r" name="r" />
                    </label>
                </div>

                <div className='form-group'>
                    <label htmlFor="d" className='label_inner_text'>
                        d=
                        <input className='labeld w70' type="text" id="d" name="d" />
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="P">
                    P=
                </label>
                <input className='w220' type="text" id="P" name="P" />
            </div>

            <div className='form-group row'>
                <label htmlFor="Sob">S=</label>
                <input className='w220' type="text" id="Sob" name="Sob" />
            </div>

            <div className='form-group row'>
                <label htmlFor="V">V=</label>
                <input className='w220' type="text" id="V" name="V" />
            </div>
            
            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}