import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSides = (n, a, h) => {
        let P = a*n
        let So = (n/4.0)*a**2 * (1/Math.tan(Math.PI/n))
        let V = So*h
        let r = a/(2*Math.tan(Math.PI/n)) // pi/n уже в радианах
        let R = a/(2*Math.sin(Math.PI/n)) 
        let Sbp = P*h
        let S = 2*So+Sbp
        return [n, a, h, r, R, So, Sbp, S, P, V]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let nSides = fixedNum(Number(document.getElementById('nSides').value))
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let h = fixedNum(Number(document.getElementById('h').value))
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let R = fixedNum(Number(document.getElementById('R').value)) 
        let So = fixedNum(Number(document.getElementById('so').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))  
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [nSides, side_a, h, r, R, So, Sbp, S, P, V]
        const idInputs = ['nSides', 'side_a', 'h', 'r', 'R', 'so', 'Sbp', 's', 'perimeter', 'volume']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        if (nSides <= 4) return // Проверка на правильность ввода числа сторон

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту
        if (side_a && h) {
            let arrCheck = calcWithSides(nSides, side_a, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side h ok', 'side h bad')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
    
            <div className='form-group'>
                <label htmlFor="nSides">n-сторон</label>
                <input type="text" id="nSides" name="nSides" />
            </div>
    
            <div className='form-group'>
                <label htmlFor="side_a">a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="h">h</label>
                <input type="text" id="h" name="h" />
            </div>

            <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>

            <div className='form-group'>
                <label htmlFor="R">R</label>
                <input type="text" id="R" name="R" />
            </div>

            <div className='form-group'>
                <label htmlFor="so">Sо</label>
                <input type="text" id="so" name="so" />
            </div>

            <div className='form-group'>
                <label htmlFor="Sbp">Sбп</label>
                <input type="text" id="Sbp" name="Sbp" />
            </div>

            <div className='form-group'>
                <label htmlFor="s">S</label>
                <input type="text" id="s" name="s" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>

            <div className='form-group'>
                <label htmlFor="volume">V</label>
                <input type="text" id="volume" name="volume" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}