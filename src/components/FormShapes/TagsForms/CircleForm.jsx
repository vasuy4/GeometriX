import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function CircleForm({handleFormSubmit, selectedShape, handleClose}) {
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
        <button onClick={handleClose}>Close</button>
        <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>

            <div className='form-group'>
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
            </div>

            <div className='form-group'>
                <label htmlFor="S">S</label>
                <input type="text" id="S" name="S" />
            </div>

            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>

            <button type="submit">Построить</button>
        </form>
    )
}