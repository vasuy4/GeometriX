import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (n, a) => {
        let P = a * n
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let R = a / (2 * Math.sin(Math.PI / n))
        let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        let alpha = (n - 2) / n * 180
        return [n, a, r, R, alpha, S, P]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let nSides = fixedNum(Number(document.getElementById('nSides').value))
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let R = fixedNum(Number(document.getElementById('R').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол между сторонами основания
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))

        const arrInput = [nSides, side_a, r, R, alpha, S, P]
        const idInputs = ['nSides', 'side_a', 'r', 'R', 'alpha', 's', 'perimeter']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        console.log()
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (side_a && nSides >= 4) {
            let arrCheck = calcWithSides(nSides, side_a,)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
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
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>
            <div className='form-group'>
                <label htmlFor="R">R</label>
                <input type="text" id="R" name="R" />
            </div>
            <div className='form-group'>
                <label htmlFor="alpha">alpha</label>
                <input type="text" id="alpha" name="alpha" />
            </div>
            <div className='form-group'>
                <label htmlFor="s">S</label>
                <input type="text" id="s" name="s" />
            </div>
            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}