import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (a) => {
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let S = a * a * 6;
        let P = a * 12;
        let V = a * a * a;
        return [a, d, D, r, R, S, P, V]
    }
    const calcWithArea = (S) => {
        let a = Math.sqrt(S / 6);
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let P = a * 12;
        let V = a * a * a;
        return [a, d, D, r, R, S, P, V]
    }
    const calcWithVolume = (V) => {
        let a = Math.cbrt(V);
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let P = a * 12;
        let S = a * a * 6;
        return [a, d, D, r, R, S, P, V]
    }
    const calcWithPerimetr = (P) => {
        let a = P / 12;
        let d = Math.sqrt(a * a + a * a);
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        return [a, d, D, r, R, S, P, V]
    }

    const calcWithdiagonal = (d) => {
        let a = Math.sqrt(d * d / 2)
        let D = Math.sqrt(a * a + a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, r, R, S, P, V]
    }

    const calcWithDiagonal = (D) => {
        let a = Math.sqrt(D * D / 3)
        let d = Math.sqrt(a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let r = a / 2;
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, r, R, S, P, V]
    }

    const calcWithradius = (r) => {
        let a = r * 2
        let d = Math.sqrt(a * a + a * a);
        let R = a * Math.sqrt(3) / 2
        let D = Math.sqrt(a * a + a * a + a * a);
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, r, R, S, P, V]
    }

    const calcWithRadius = (R) => {
        let a = R / Math.sqrt(3) * 2
        let d = Math.sqrt(a * a + a * a);
        let r = a / 2;
        let D = Math.sqrt(a * a + a * a + a * a);
        let V = a * a * a;
        let S = a * a * 6;
        let P = a * 12;
        return [a, d, D, r, R, S, P, V]
    }


    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let d = fixedNum(Number(document.getElementById('d').value))
        let D = fixedNum(Number(document.getElementById('D').value))
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let R = fixedNum(Number(document.getElementById('R').value))
        let S = fixedNum(Number(document.getElementById('s').value))//площадь стороны
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let V = fixedNum(Number(document.getElementById('V').value))

        const arrInput = [side_a, d, D, r, R, S, P, V]
        const idInputs = ['side_a', 'd', 'D', 'r', 'R', 's', 'perimeter', 'V']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        console.log()
        if (belowZero) return


        if (side_a) {
            let arrCheck = calcWithSides(side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (S) {
            let arrCheck = calcWithArea(S)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (V) {
            let arrCheck = calcWithVolume(V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (P) {
            let arrCheck = calcWithPerimetr(P)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (d) {
            let arrCheck = calcWithdiagonal(d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (D) {
            let arrCheck = calcWithDiagonal(D)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (r) {
            let arrCheck = calcWithradius(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (R) {
            let arrCheck = calcWithRadius(R)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <div className='form-group'>
                <label htmlFor="side_a">a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>
            <div className='form-group'>
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
            </div>
            <div className='form-group'>
                <label htmlFor="D">D</label>
                <input type="text" id="D" name="D" />
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
                <label htmlFor="s">S</label>
                <input type="text" id="s" name="s" />
            </div>
            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>
            <div className='form-group'>
                <label htmlFor="perimeter">V</label>
                <input type="text" id="V" name="V" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}