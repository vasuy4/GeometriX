import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'

import React, { useEffect, useState } from 'react';

import cubeImage from '../formShapesImg/cube.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const [formKey, setFormKey] = useState(0);
    const translateShape = dictTranslate[selectedShape];

    useEffect(() => {
        setFormKey(formKey + 1); // Увеличение ключа при изменении updateFigure
    }, [updateFigure]);

    if (updateFigure != null) {
        //  return null
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
            // side_a = fixedNum(Number(document.getElementById('side_a-empty').value))
            // d = fixedNum(Number(document.getElementById('d-empty').value))
            // D = fixedNum(Number(document.getElementById('D-empty').value))
            // r = fixedNum(Number(document.getElementById('r-empty').value)) // радиус основания
            // R = fixedNum(Number(document.getElementById('R-empty').value))
            // S = fixedNum(Number(document.getElementById('s-empty').value))//площадь стороны
            // P = fixedNum(Number(document.getElementById('perimeter-empty').value))
            // V = fixedNum(Number(document.getElementById('V-empty').value))
            // idInputsTime = ['side_a-empty', 'd-empty', 'D-empty', 'r-empty', 'R-empty', 's-empty', 'perimeter-empty', 'V-empty']
        }
        else {
            side_a = fixedNum(Number(document.getElementById('side_a').value))
            d = fixedNum(Number(document.getElementById('d').value))
            D = fixedNum(Number(document.getElementById('D').value))
            S = fixedNum(Number(document.getElementById('s').value))//площадь стороны
            P = fixedNum(Number(document.getElementById('perimeter').value))
            V = fixedNum(Number(document.getElementById('V').value))
            r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
            R = fixedNum(Number(document.getElementById('R').value))
            idInputsTime = ['side_a', 'd', 'D', 's', 'perimeter', 'V', 'r', 'R']
        }


        const arrInput = [side_a, d, D, S, P, V, r, R]
        const idInputs = idInputsTime;

        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return


        if (side_a) {
            let arrCheck = calcWithSides(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (S) {
            let arrCheck = calcWithArea(S)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (V) {
            let arrCheck = calcWithVolume(V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (P) {
            let arrCheck = calcWithPerimetr(P)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (d) {
            let arrCheck = calcWithdiagonal(d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (D) {
            let arrCheck = calcWithDiagonal(D)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (r) {
            let arrCheck = calcWithradius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (R) {
            let arrCheck = calcWithRadius(R)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        } else {
            toast.error('Ошибка ввода данных');
        }

    }





    let side_aform = 3, dform = null, Dform = null, sform = null, perimeterform = null, Vform = null, rform = null, Rform = null
    if (updateFigure != null) {

        side_aform = updateFigure.formValues[0];
        dform = updateFigure.formValues[1];
        Dform = updateFigure.formValues[2];
        rform = updateFigure.formValues[3];
        Rform = updateFigure.formValues[4];
        sform = updateFigure.formValues[5];
        perimeterform = updateFigure.formValues[6];
        Vform = updateFigure.formValues[7];

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
                    <input className='w220' type="text" id="side_a" name="side_a" defaultValue={side_aform} />
                </div>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="d" className='label_inner_text'>
                            d=
                            <input className='labeld w70' type="text" id="d" name="d" defaultValue={dform} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="D" className='label_inner_text'>
                            D=
                            <input className='labela w70' type="text" id="D" name="D" defaultValue={Dform} />
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="s">
                        S=
                    </label>
                    <input className='w220' type="text" id="s" name="s" defaultValue={sform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="perimeter">
                        P=
                    </label>
                    <input className='w220' type="text" id="perimeter" name="perimeter" defaultValue={perimeterform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="perimeter">V=</label>
                    <input className='w220' type="text" id="V" name="V" defaultValue={Vform} />
                </div>


                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labeld w70' type="text" id="r" name="r" defaultValue={rform} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="R" className='label_inner_text'>
                            R=
                            <input className='labeld w70' type="text" id="R" name="R" defaultValue={Rform} />
                        </label>
                    </div>
                </div>
                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    )
}