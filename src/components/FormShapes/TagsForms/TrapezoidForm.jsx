import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero } from '../formulas.js'


// Отображает форму трапеции
export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (a, b, c, d) => {

        // calc sides
        let m = (a + b) / 2.0  // true
        let P = a + b + c + d  // true
        let p = P / 2.0  // true
        let d1 = Math.sqrt(d ** 2 + a * b - (a * (d ** 2 - c ** 2)) / (a - b))  // true
        let d2 = Math.sqrt(c ** 2 + d ** 2 + 2 * a * b - d1 ** 2)  // true
        let S = (a + b) / 2.0 * Math.sqrt(c ** 2 - (((a - b) ** 2 + c ** 2 - d ** 2) / (2 * (a - b))) ** 2)  // true
        let h = S / m  // true

        // calc angles
        let alpha = toDegrees(Math.asin(h / c))
        let betta = toDegrees(Math.asin(h / d))
        let angle_y = toDegrees(Math.asin((h * (a + b)) / (d1 * d2)))
        let angle_o = toDegrees(Math.asin((h * (a + b)) / (d1 * d2)))
        let angle_e = 0
        let angle_z = 0
        return [a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {

        event.preventDefault();
        // a - нижнее основание, b - верхнее
        // c - левая сторона d - правая сторона
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let side_d = fixedNum(Number(document.getElementById('side_d').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))
        let h = fixedNum(Number(document.getElementById('height1').value))
        let m = fixedNum(Number(document.getElementById('m').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let angle_e = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_z = fixedNum(Number(document.getElementById('angle_o').value))
        const arrInput = [side_a, side_b, side_c, side_d, diagonal1, diagonal2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
        const idInputs = ['side_a', 'side_b', 'side_c', 'side_d', 'diagonal1', 'diagonal2', 'height1', 'm', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o', 'angle_e', 'angle_z']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return


        // Подсчёт остальных параметров, опираясь на:
        // 4 стороны
        if (side_a && side_b && side_c && side_d) {
            let arrCheck = calcWithSides(side_a, side_b, side_c, side_d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
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
                <label htmlFor="side_b">b</label>
                <input type="text" id="side_b" name="side_b" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_c">c</label>
                <input type="text" id="side_c" name="side_c" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_d">d</label>
                <input type="text" id="side_d" name="side_d" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal1">d1</label>
                <input type="text" id="diagonal1" name="diagonal1" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal2">d2</label>
                <input type="text" id="diagonal2" name="diagonal2" />
            </div>

            <div className='form-group'>
                <label htmlFor="height1">h</label>
                <input type="text" id="height1" name="height1" />
            </div>

            <div className='form-group'>
                <label htmlFor="m">Средняя линяя m</label>
                <input type="text" id="m" name="m" />
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
                <label htmlFor="alpha">Угол α</label>
                <input type="text" id="alpha" name="alpha" />
            </div>

            <div className='form-group'>
                <label htmlFor="betta">Угол β</label>
                <input type="text" id="betta" name="betta" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_y">Угол γ</label>
                <input type="text" id="angle_y" name="angle_y" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_o">Угол δ</label>
                <input type="text" id="angle_o" name="angle_o" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_e">Угол ε</label>
                <input type="text" id="angle_e" name="angle_e" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_z">Угол ζ</label>
                <input type="text" id="angle_z" name="angle_z" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}