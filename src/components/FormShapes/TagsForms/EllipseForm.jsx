import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'


// Отображает форму трапеции
export default function EllipseForm({handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick}) {
    const calcWithHalfAxis = (a, b) => {
        let c = a*2
        let d = b*2
        let S = Math.PI*a*b
        let P = 4*((Math.PI*a*b+(a-b)**2)/(a+b))
        return [a,b,c,d,S,P]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('a').value))
        let b = fixedNum(Number(document.getElementById('b').value))
        let c = fixedNum(Number(document.getElementById('c').value))
        let d = fixedNum(Number(document.getElementById('d').value))
        let S = fixedNum(Number(document.getElementById('S').value))
        let P = fixedNum(Number(document.getElementById('P').value))
        const arrInput = [a, b, c, d, S, P]
        const idInputs = ['a', 'b', 'c', 'd', 'S', 'P']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // Полуось a b
        if (a && b){
            let arrCheck = calcWithHalfAxis(a, b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'ab ok', 'ab bad')
        }
        // ось c d
        else if (c && d){
            a = c/2.0
            b = d/2.0
            let arrCheck = calcWithHalfAxis(a, b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'cd ok', 'cd bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <div  className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
            <div className='form-group'>
                <label htmlFor="a">a</label>
                <input type="text" id="a" name="a" />
            </div>

            <div className='form-group'>
                <label htmlFor="b">b</label>
                <input type="text" id="b" name="b" />
            </div>

            <div className='form-group'>
                <label htmlFor="c">c</label>
                <input type="text" id="c" name="c" />
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
        </div>
    )
}