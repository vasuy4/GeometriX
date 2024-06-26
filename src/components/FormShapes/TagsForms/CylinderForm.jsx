import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (R, h) => {

        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;

        return [h, R, d, So, Sbp, S, P, V]
    }

    const calcWithSRadiusAndVolume = (R, V) => {
        let So = Math.PI * R * R;
        let h = V / So;
        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let Sbp = P * h;
        let S = 2 * So + Sbp;
        return [h, R, d, So, Sbp, S, P, V]
    }

    const calcWithSRadiusAndDiagonal = (R, d) => {
        let h = Math.sqrt(d * d - R * R);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;
        return [h, R, d, So, Sbp, S, P, V]
    }

    const calcWithHeightAndSo = (h, So) => {
        let R = Math.sqrt(So / Math.PI);
        let d = Math.sqrt(R * R + h * h);
        let P = Math.PI * R * 2;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;


        return [h, R, d, So, Sbp, S, P, V]
    }
    const calcWithShEIGHTAndDiagonal = (h, d) => {

        let R = Math.sqrt(d * d - h * h);
        let P = Math.PI * R * 2;
        let So = Math.PI * R * R;
        let V = So * h;
        let Sbp = P * h;
        let S = 2 * So + Sbp;

        return [h, R, d, So, Sbp, S, P, V]
    }


    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let h = fixedNum(Number(document.getElementById('h').value))
        let R = fixedNum(Number(document.getElementById('R').value))
        let d = fixedNum(Number(document.getElementById('d').value))
        let So = fixedNum(Number(document.getElementById('so').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [h, R, d, So, Sbp, S, P, V]
        const idInputs = ['h', 'R', 'd', 'so', 'Sbp', 's', 'perimeter', 'volume']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        if (R && h) {
            let arrCheck = calcWithSides(R, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R && V) {
            let arrCheck = calcWithSRadiusAndVolume(R, V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R && d) {
            let arrCheck = calcWithSRadiusAndDiagonal(R, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (h && So) {
            let arrCheck = calcWithHeightAndSo(h, So)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (h && d) {
            let arrCheck = calcWithShEIGHTAndDiagonal(h, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>

            <div className='form-group'>
                <label htmlFor="h">h</label>
                <input type="text" id="h" name="h" />
            </div>
            <div className='form-group'>
                <label htmlFor="R">R</label>
                <input type="text" id="R" name="R" />
            </div>
            <div className='form-group'>
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
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