import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import circleImage from '../formShapesImg/circle.svg'

// Отображает форму трапеции
export default function CircleForm({handleFormSubmit, selectedShape, handleClose, updateFigure}) {
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
            console.log('error input')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <img className="squareImage" src={circleImage} alt='circle' />

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
                <label htmlFor="S">
                    S=
                </label>
                <input className='w220' type="text" id="S" name="S" />
            </div>

            <div className='form-group row'>
                <label htmlFor="P">
                    P=
                </label>
                <input className='w220' type="text" id="P" name="P" />
            </div>

            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}