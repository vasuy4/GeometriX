import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'
import circleImage from '../formShapesImg/circle.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Отображает форму трапеции
export default function CircleForm({handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick}) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithRadius = (r) => {
        let d = r*2
        let S = Math.PI*r**2
        let P = 2*Math.PI*r
        return [r, d, S, P]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let r = fixedNum(Number(document.getElementById('r').value))
        let d = fixedNum(Number(document.getElementById('d').value))
        let S = fixedNum(Number(document.getElementById('S').value))
        let P = fixedNum(Number(document.getElementById('P').value))
        const arrInput = [r, d, S, P]
        const idInputs = ['r', 'd', 'S', 'P']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // Радиус
        if (r){
            let arrCheck = calcWithRadius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'r ok', 'r bad')
        }
        // Диаметр
        else if (d){
            r = d/2.0
            let arrCheck = calcWithRadius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd ok', 'd bad')
        }
        // Площадь
        else if (S){
            r = Math.sqrt(S/Math.PI)
            let arrCheck = calcWithRadius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S ok', 'S bad')
        }
        // Длину окружности
        else if (P){
            r = P/(2*Math.PI)
            let arrCheck = calcWithRadius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'P ok', 'P bad')
        }
        else {

            toast.error('Ошибка ввода данных');
        }
    }

    let rform = 3, dform = null, Sform = null, Pform = null;
    if (updateFigure != null) {
        rform = updateFigure.formValues[0];
        dform = updateFigure.formValues[1];
        Sform = updateFigure.formValues[2];
        Pform = updateFigure.formValues[3];
    }

    return (
        <div  className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>
            <img className="squareImage" src={circleImage} alt='circle' />

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="r" className='label_inner_text'>
                        r=
                        <input className='labela w70' type="text" id="r" name="r" defaultValue={rform} />
                    </label>
                </div>

                <div className='form-group'>
                    <label htmlFor="d" className='label_inner_text'>
                        d=
                        <input className='labeld w70' type="text" id="d" name="d" defaultValue={dform}/>
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="S">
                    S=
                </label>
                <input className='w220' type="text" id="S" name="S"defaultValue={Sform} />
            </div>

            <div className='form-group row'>
                <label htmlFor="P">
                    P=
                </label>
                <input className='w220' type="text" id="P" name="P"defaultValue={Pform} />
            </div>

            <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
            </div>
        </form>
        </div>
    )
}