import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import squareImage from '../formShapesImg/square.svg'

export default function SquareForm({handleFormSubmit, selectedShape, handleClose}) {
    // Подсчёт параметров при известных стороне и высоте
    const calcParamsSide = (a) => {
        let d = Math.sqrt(2*a**2)
        let S = a*a
        let P = 4*a
        let r = a/2.0
        let R = d/2.0
        return [a, d, S, P, r, R]
    }   
    
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault()
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let diagonal = fixedNum(Number(document.getElementById('diagonal').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let r = fixedNum(Number(document.getElementById('r').value))
        let R = fixedNum(Number(document.getElementById('R').value))
        let arrInput = [side_a, diagonal, S, P, r, R]
        const idInputs = ['side_a', 'diagonal', 's', 'perimeter', 'r', 'R']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // Сторону
        if (side_a) {
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side ok', 'side bad')
        } 
        // диагональ
        else if (diagonal) {
            side_a = Math.sqrt((diagonal**2)/2.0)
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd ok', 'd bad')
        }
        // площадь
        else if (S) {
            side_a = Math.sqrt(S)
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 's ok', 's bad')
        }
        // периметр
        else if (P) {
            side_a = P/4.0
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'P ok', 'P bad')
        }
        // радиус вписанной окружности
        else if (r) {
            side_a = r*2
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'r ok', 'r bad')
        }
        // радиус описанной окружности 
        else if (R) {
            diagonal = R*2
            side_a = Math.sqrt((diagonal**2)/2.0)
            let arrCheck = calcParamsSide(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'R ok', 'R bad')
        }
    }
    
    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{selectedShape}</p>
            <img className="squareImage" src={squareImage} alt='square' />

            <div className="row">
                <div className='form-group'>
                    <input className='labela w90' type="text" id="side_a" name="side_a" placeholder='a='/>
                </div>
                <div className='form-group'>
                    <input className='labeld w90' type="text" id="diagonal" name="diagonal" placeholder='d=' />
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="s">S</label>
                <input className='w220' type="text" id="s" name="s" />
            </div>

            <div className='form-group row'>
                <label htmlFor="perimeter">P</label>
                <input className='w220' type="text" id="perimeter" name="perimeter" />
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="r">r</label>
                    <input className='w90' type="text" id="r" name="r" />
                </div>
                <div className='form-group'>
                    <label htmlFor="R">R</label>
                    <input className='w90' type="text" id="R" name="R" />
                </div>
            </div>
            
            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
            
        </form>
    )
}