import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'

import React, { useEffect, useState } from 'react';

import cubeImage from '../formShapesImg/cube.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'



// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {

    const [formKey, setFormKey] = useState(0);
    const translateShape = dictTranslate[selectedShape];

    useEffect(() => {
        setFormKey(formKey + 1); // Увеличение ключа при изменении updateFigure
    }, [updateFigure]);

    if (updateFigure != null) {
        return null
    }

    const calcWithSides = (a) => {
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let S = a * a * 6;
        let P = a * 12;
        let V = a * a * a;
        return [a, d, D, S, P, V, r, R]
    }
    const calcWithArea = (S) => {
        let a = Math.sqrt(S / 6);
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let P = a * 12;
        let V = a * a * a;
        return [a, d, D, S, P, V, r, R]
    }
    const calcWithVolume = (V) => {
        let a = Math.cbrt(V);
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let P = a * 12;
        let S = a * a * 6;
        return [a, d, D, S, P, V, r, R]
    }
    const calcWithPerimetr = (P) => {
        let a = P / 12;
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        return [a, d, D, S, P, V, r, R]
    }

    const calcWithdiagonal = (d) => {
        let a = Math.sqrt(d * d / 2)
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, S, P, V, r, R]
    }

    const calcWithDiagonal = (D) => {
        let a = Math.sqrt(D * D / 3)
        let d = Math.sqrt(a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, S, P, V, r, R]
    }

    const calcWithradius = (r) => {
        let a = r * 2
        let d = Math.sqrt(a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let D = Math.sqrt(a * a + a * a + a * a);
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, S, P, V, r, R]
    }

    const calcWithRadius = (R) => {
        let a = R / Math.sqrt(3) * 2
        let d = Math.sqrt(a * a + a * a);
        let r = a / 2;
        let D = Math.sqrt(a * a + a * a + a * a);
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, S, P, V, r, R]
    }


    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let side_a, d, D, r, R, S, P, V;
        let idInputsTime
        if (updateFigure != null) {
            side_a = fixedNum(Number(document.getElementById('side_a-empty').value))
            d = fixedNum(Number(document.getElementById('d-empty').value))
            D = fixedNum(Number(document.getElementById('D-empty').value))
            r = fixedNum(Number(document.getElementById('r-empty').value)) // радиус основания
            R = fixedNum(Number(document.getElementById('R-empty').value))
            S = fixedNum(Number(document.getElementById('s-empty').value))//площадь стороны
            P = fixedNum(Number(document.getElementById('perimeter-empty').value))
            V = fixedNum(Number(document.getElementById('V-empty').value))
            idInputsTime = ['side_a-empty', 'd-empty', 'D-empty', 'r-empty', 'R-empty', 's-empty', 'perimeter-empty', 'V-empty']
        }
        else {
            side_a = fixedNum(Number(document.getElementById('side_a').value))
            d = fixedNum(Number(document.getElementById('d').value))
            D = fixedNum(Number(document.getElementById('D').value))
            r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
            R = fixedNum(Number(document.getElementById('R').value))
            S = fixedNum(Number(document.getElementById('s').value))//площадь стороны
            P = fixedNum(Number(document.getElementById('perimeter').value))
            V = fixedNum(Number(document.getElementById('V').value))
            idInputsTime = ['side_a', 'd', 'D', 'r', 'R', 's', 'perimeter', 'V']
        }


        const arrInput = [side_a, d, D, r, R, S, P, V]
        const idInputs = idInputsTime;

        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return


        if (side_a) {
            let arrCheck = calcWithSides(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (S) {
            let arrCheck = calcWithArea(S)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (V) {
            let arrCheck = calcWithVolume(V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (P) {
            let arrCheck = calcWithPerimetr(P)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (d) {
            let arrCheck = calcWithdiagonal(d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (D) {
            let arrCheck = calcWithDiagonal(D)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (r) {
            let arrCheck = calcWithradius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R) {
            let arrCheck = calcWithRadius(R)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

        if (updateFigure != null) {
            side_a = fixedNum(Number(document.getElementById('side_a-empty').value))
            d = fixedNum(Number(document.getElementById('d-empty').value))
            D = fixedNum(Number(document.getElementById('D-empty').value))
            r = fixedNum(Number(document.getElementById('r-empty').value)) // радиус основания
            R = fixedNum(Number(document.getElementById('R-empty').value))
            S = fixedNum(Number(document.getElementById('s-empty').value))//площадь стороны
            P = fixedNum(Number(document.getElementById('perimeter-empty').value))
            V = fixedNum(Number(document.getElementById('V-empty').value))
            let arrInput = [side_a, d, D, r, R, S, P, V]


            handleOptionsClick(['rebuldFigure', [arrInput, updateFigure]])

            ///!!!!!!!!заменить руками
            let idInputsTime2 = ['side_aside_a', 'dd', 'DD', 'rr', 'RR', 'ss', 'perimeterperimeter', 'VV']///!!!!!!!!заменить руками
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
                        <button onClick={(event) => { event.preventDefault(); handleClose(); handleOptionsClick(['deleteFigure', updateFigure.id]); }}>Delete</button>
                        <p>{selectedShape}</p>
                        <div className='form-group'>
                            <label htmlFor="side_aside_a">a</label>
                            <input type="text" id="side_aside_a" name="side_aside_a" defaultValue={updateFigure.formValues[0]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="dd">d</label>
                            <input type="text" id="dd" name="dd" defaultValue={updateFigure.formValues[1]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="DD">D</label>
                            <input type="text" id="DD" name="DD" defaultValue={updateFigure.formValues[2]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="rr">r</label>
                            <input type="text" id="rr" name="rr" defaultValue={updateFigure.formValues[3]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="RR">R</label>
                            <input type="text" id="RR" name="RR" defaultValue={updateFigure.formValues[4]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="ss">S</label>
                            <input type="text" id="ss" name="ss" defaultValue={updateFigure.formValues[5]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="perimeterperimeter">P</label>
                            <input type="text" id="perimeterperimeter" name="perimeterperimeter" defaultValue={updateFigure.formValues[6]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="perimeterperimeter">V</label>
                            <input type="text" id="VV" name="VV" defaultValue={updateFigure.formValues[7]} />
                        </div>
                        <button onClick={handleClose}>Close</button>
                    </form>
                </div>
                <div className="form-wrapper">

                    <form key={formKey + 1} onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                        <button onClick={handleClose}>Close</button>
                        <p>{selectedShape}</p>
                        <div className='form-group'>
                            <label htmlFor="side_a-empty">a</label>
                            <input type="text" id="side_a-empty" name="side_a" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="d-empty">d</label>
                            <input type="text" id="d-empty" name="d" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="D-empty">D</label>
                            <input type="text" id="D-empty" name="D" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="r-empty">r</label>
                            <input type="text" id="r-empty" name="r" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="R-empty">R</label>
                            <input type="text" id="R-empty" name="R" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="s-empty">S</label>
                            <input type="text" id="s-empty" name="s" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="perimeter-empty">P</label>
                            <input type="text" id="perimeter-empty" name="perimeter" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="perimeter-empty">V</label>
                            <input type="text" id="V-empty" name="V" />
                        </div>
                        <button type="submit">Построить</button>
                        <button onClick={handleClose}>Close</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <form className="form-container" onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

                <img className="squareImage" src={cubeImage} alt='circle' />

                <div className='form-group row'>
                    <label htmlFor="side_a">
                        a=
                    </label>
                    <input className='w220' type="text" id="side_a" name="side_a" />
                </div>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="d" className='label_inner_text'>
                            d=
                            <input className='labeld w70' type="text" id="d" name="d" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="D" className='label_inner_text'>
                            D=
                            <input className='labela w70' type="text" id="D" name="D" />
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="s">
                        S=
                    </label>
                    <input className='w220' type="text" id="s" name="s" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="perimeter">
                        P=
                    </label>
                    <input className='w220' type="text" id="perimeter" name="perimeter" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="perimeter">V=</label>
                    <input className='w220' type="text" id="V" name="V" />
                </div>


                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labeld w70' type="text" id="r" name="r" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="R" className='label_inner_text'>
                            R=
                            <input className='labeld w70' type="text" id="R" name="R" />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="sFormText">Построить</button>
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    )

}