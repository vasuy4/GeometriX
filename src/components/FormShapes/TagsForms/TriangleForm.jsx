import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, areaOfHeron, perimetrTriangle, findAngleTeorCos, findHeightSideArea } from '../formulas.js'


// Отображает форму трапеции
export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (a, b, c) => {


        let conor_a = toDegrees(findAngleTeorCos(a, b, c))
        let conor_b = toDegrees(findAngleTeorCos(b, a, c))
        let conor_c = toDegrees(findAngleTeorCos(c, b, a))
        let P = perimetrTriangle(a, b, c)//периметр
        let S = areaOfHeron(a, b, c)
        let height_h = findHeightSideArea(c, S)
        let height_m = findHeightSideArea(b, S)
        let height_l = findHeightSideArea(a, S)

        let inscribed_R = S * 2 / P
        let described_R = a * b * c / (4 * S)
        // console.log(S)]

        return [a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R];
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        //сначала код сюда
        event.preventDefault();

        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let conor_a = fixedNum(Number(document.getElementById('conor_a').value))
        let conor_b = fixedNum(Number(document.getElementById('conor_b').value))
        let conor_c = fixedNum(Number(document.getElementById('conor_c').value))
        let height_h = fixedNum(Number(document.getElementById('height_h').value))
        let height_m = fixedNum(Number(document.getElementById('height_m').value))
        let height_l = fixedNum(Number(document.getElementById('height_l').value))
        let Square = fixedNum(Number(document.getElementById('Square').value))
        let Perimeter = fixedNum(Number(document.getElementById('Perimeter').value))
        let inscribed_R = fixedNum(Number(document.getElementById('inscribed_R').value))
        let described_R = fixedNum(Number(document.getElementById('described_R').value))
        const arrInput = [side_a, side_b, side_c, conor_a, conor_b, conor_c, height_h, height_m, height_l, Square, Perimeter, inscribed_R, described_R]
        const idInputs = ['side_a', 'side_b', 'side_c', 'conor_a', 'conor_b', 'conor_c', 'height_h', 'height_m', 'height_l', 'Square', 'Perimeter', 'inscribed_R', 'described_R']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return


        // Подсчёт остальных параметров, опираясь на:
        // 3 стороны
        if (side_a && side_b && side_c) {
            let arrCheck = calcWithSides(side_a, side_b, side_c)
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
                <label htmlFor="conor_a">угол а</label>
                <input type="text" id="conor_a" name="conor_a" />
            </div>
            <div className='form-group'>
                <label htmlFor="conor_b">угол б</label>
                <input type="text" id="conor_b" name="conor_b" />
            </div>
            <div className='form-group'>
                <label htmlFor="conor_c">угол с</label>
                <input type="text" id="conor_c" name="conor_c" />
            </div>
            <div className='form-group'>
                <label htmlFor="height_h">h</label>
                <input type="text" id="height_h" name="height_h" />
            </div>
            <div className='form-group'>
                <label htmlFor="height_m">m</label>
                <input type="text" id="height_m" name="height_m" />
            </div>
            <div className='form-group'>
                <label htmlFor="height_l">l</label>
                <input type="text" id="height_l" name="height_l" />
            </div>
            <div className='form-group'>
                <label htmlFor="Square">Площадь</label>
                <input type="text" id="Square" name="Square" />
            </div>
            <div className='form-group'>
                <label htmlFor="Perimeter">Периметр</label>
                <input type="text" id="Perimeter" name="Perimeter" />
            </div>
            <div className='form-group'>
                <label htmlFor="inscribed_R">вписанный радиус</label>
                <input type="text" id="inscribed_R" name="inscribed_R" />
            </div>
            <div className='form-group'>
                <label htmlFor="described_R">описанный радиус</label>
                <input type="text" id="described_R" name="described_R" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}