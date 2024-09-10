import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import polygonalPrism from '../formShapesImg/polygonalPrism.svg'

// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (n, a, h) => {
        let P = (a * 2 + h) * n
        let So = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        let V = So * h
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let R = a / (2 * Math.sin(Math.PI / n))
        let Sbp = P * h
        let S = 2 * So + Sbp
        let alpha = (n - 2) / n * 180

        return [n, a, h, r, R, alpha, So, Sbp, S, P, V]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let nSides = fixedNum(Number(document.getElementById('nSides').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол между сторонами основания
        let h = fixedNum(Number(document.getElementById('h').value))
        let R = fixedNum(Number(document.getElementById('R').value))
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let V = fixedNum(Number(document.getElementById('volume').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let So = fixedNum(Number(document.getElementById('so').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))
        let S = fixedNum(Number(document.getElementById('s').value))


        const arrInput = [nSides, side_a, h, r, R, alpha, So, Sbp, S, P, V]
        const idInputs = ['side_a', 'nSides', 'alpha', 'h', 'R', 'r', 'volume', 'perimeter', 'so', 'Sbp', 's']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (side_a && h && nSides >= 3) {
            let arrCheck = calcWithSides(nSides, side_a, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        // Площадь основания и высоту и число сторон основания
        else if (So && h && nSides >= 3) {
            let side_a = Math.sqrt(So / ((nSides / 4.0) * (1 / Math.tan(Math.PI / nSides))))
            let arrCheck = calcWithSides(nSides, side_a, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S n h ok', 'S n h bad')
        }
        // Угол, сторону и высоту
        else if (side_a && alpha < 180 && h) {
            let nSides = -360 / (alpha - 180)
            let arrCheck = calcWithSides(nSides, side_a, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a alpha h ok', 'a alpha h bad')
        }
        // рвдиус вписанной или описанной окр, число сторон и высоту
        else if ((r || R) && nSides >= 3 && h) {
            if (r) side_a = r * (2 * Math.tan(Math.PI / nSides))
            else if (R) side_a = R * (2 * Math.sin(Math.PI / nSides))
            let arrCheck = calcWithSides(nSides, side_a, h)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a alpha h ok', 'a alpha h bad')
        } else {
            console.log("Error input")
        }
    }



    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <img src={polygonalPrism} alt='polygonalPrism' />
                <p className='subtitle2 mt0'> Сторона основания многоуг. призмы</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="side_a" className='label_inner_text'>
                            a=
                            <input className='labela w70' type="text" id="side_a" name="side_a" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="nSides" className='label_inner_text'>
                            n=
                            <input className='labela w70' type="text" id="nSides" name="nSides" />
                        </label>
                    </div>
                </div>
                <p className='subtitle2 mt0'>Угол правильного многоугольника</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            a =
                            <input className='w230 bgc0 colfff' type="text" id="alpha" name="alpha" />
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="h">h=</label>
                    <input type="text" id="h" name="h" className='w220' />
                </div>


                <div className='form-group row'>
                    <label htmlFor="R">R=</label>
                    <input type="text" id="R" name="R" className='w220' />
                </div>


                <div className='form-group row'>
                    <label htmlFor="r">r=</label>
                    <input type="text" id="r" name="r" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="volume">V=</label>
                    <input type="text" id="volume" name="volume" className='w220' />
                </div>


                <div className='form-group row'>
                    <label htmlFor="perimeter">P=</label>
                    <input type="text" id="perimeter" name="perimeter" className='w220' />
                </div>


                <div className='form-group row'>
                    <label htmlFor="so">So=</label>
                    <input type="text" id="so" name="so" className='w220' />
                </div>
                <div className='form-group row'>
                    <label htmlFor="Sbp">Sбп=</label>
                    <input type="text" id="Sbp" name="Sbp" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="s">S=</label>
                    <input type="text" id="s" name="s" className='w220' />
                </div>

                <div className="row">
                    <button type="submit" className="sFormText">Построить</button>
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    )


}