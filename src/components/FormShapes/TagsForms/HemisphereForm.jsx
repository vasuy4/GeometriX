import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (r) => {
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        return [r, P, S, Ss, Sob, V]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let r = fixedNum(Number(document.getElementById('r').value))
        let P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
        let S = fixedNum(Number(document.getElementById('S').value))
        let Ss = fixedNum(Number(document.getElementById('Ss').value))
        let Sob = fixedNum(Number(document.getElementById('Sob').value))
        let V = fixedNum(Number(document.getElementById('V').value))


        const arrInput = [r, P, S, Ss, Sob, V]
        const idInputs = ['r', 'P', 'S', 'Ss', 'Sob', 'V']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        console.log()
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (r) {
            let arrCheck = calcWithSides(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>
            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>
            <div className='form-group'>
                <label htmlFor="S">S</label>
                <input type="text" id="S" name="S" />
            </div>
            <div className='form-group'>
                <label htmlFor="Ss">Ss</label>
                <input type="text" id="Ss" name="Ss" />
            </div>
            <div className='form-group'>
                <label htmlFor="Sob">Sob</label>
                <input type="text" id="Sob" name="Sob" />
            </div>
            <div className='form-group'>
                <label htmlFor="V">V</label>
                <input type="text" id="V" name="V" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}