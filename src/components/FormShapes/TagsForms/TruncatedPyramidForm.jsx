import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, calcPolygon } from '../formulas.js'
import truncatedPyramid from '../formShapesImg/truncatedPyramid.svg'

// Отображает форму трапеции
export default function TruncatedPyramidForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSideHeight = (n, a, b, d) => {
        let f = Math.sqrt(d ** 2 - (b / 2 - a / 2) ** 2)

        let [ra, Ra, Supper, Pa, angle_yy] = calcPolygon(n, a)
        let [rb, Rb, Slower, Pb, angle_y] = calcPolygon(n, b)
        let h = Math.sqrt(d ** 2 - (Rb - Ra) ** 2)
        let P = n * (a + b + d)
        let Sbp = ((a + b) / 4) * Math.sqrt(4 * d ** 2 - (b - a) ** 2) * n
        let S = Sbp + Slower + Supper
        let V = 1 / 3 * h * (Slower + Supper + Math.sqrt(Slower * Supper))
        let betta = toDegrees(Math.acos((Math.abs(rb - ra)) / f))
        let alpha = 180 - betta
        let angle_z = toDegrees(Math.acos(Math.abs(Rb - Ra) / d))
        let angle_o = 180 - angle_z
        return [n, a, b, d, f, h, P, Slower, Supper, Sbp, S, V, alpha, betta, angle_y, angle_o, angle_z]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();

        let a = fixedNum(Number(document.getElementById('a').value)) // сторона верхнего основания
        let b = fixedNum(Number(document.getElementById('b').value)) // сторона нижнего основания
        let d = fixedNum(Number(document.getElementById('d').value)) // ребро
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let angle_z = fixedNum(Number(document.getElementById('angle_z').value))
        let h = fixedNum(Number(document.getElementById('h').value))
        let f = fixedNum(Number(document.getElementById('f').value)) // апофема
        let V = fixedNum(Number(document.getElementById('V').value))
        let P = fixedNum(Number(document.getElementById('P').value))
        let Slower = fixedNum(Number(document.getElementById('Slower').value))
        let Supper = fixedNum(Number(document.getElementById('Supper').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))
        let S = fixedNum(Number(document.getElementById('S').value))
        let n = fixedNum(Number(document.getElementById('n').value))
        const arrInput = [n, a, b, d, f, h, P, Slower, Supper, Sbp, S, V, alpha, betta, angle_y, angle_o, angle_z]
        const idInputs = ['a', 'b', 'd', 'alpha', 'betta', 'angle_y', 'angle_o', 'angle_z', 'h', 'f', 'V', 'P', 'Slower', 'Supper', 'Sbp', 'S', 'n']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // стороны оснований и ребро
        if (a && b && d && n >= 3) {
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abd ok', 'abd bad')
        }
        // стороны оснований и высоту
        else if (a && b && h && n >= 3) {
            let Ra = a / (2 * Math.sin(Math.PI / n))
            let Rb = b / (2 * Math.sin(Math.PI / n))
            d = Math.sqrt(h ** 2 + (Rb - Ra) ** 2)
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abh ok', 'abh bad')
        }
        // стороны оснований и апофему
        else if (a && b && f && n >= 3) {
            d = Math.sqrt(f ** 2 + (b / 2 - a / 2) ** 2)
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abf ok', 'abf bad')
        }
        // стороны оснований и площадь боковой поверхности
        else if (a && b && Sbp && n >= 3) {
            d = Math.sqrt(a ** 2 - 2 * a * b + b ** 2 + (16 * Sbp ** 2) / (n ** 2 * (a + b) ** 2)) / 2
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abS ok', 'abS bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <img className="truncatedPyramid" src={truncatedPyramid} alt='truncatedPyramid' />
                <p className='subtitle mt0'>Сторона основания ус. пирамиды</p>



                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="a" className='label_inner_text'>
                            a=
                            <input className='labela w70' type="text" id="a" name="a" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="b" className='label_inner_text'>
                            b=
                            <input className='labela w70' type="text" id="b" name="b" />
                        </label>
                    </div>
                </div>

                <p className='subtitle mt0'>Ребро ус. призмы</p>
                <div className='form-group row'>
                    <label htmlFor="d" className='label_inner_text'>
                        d =
                        <input className='w230' type="text" id="d" name="d" />
                    </label>
                </div>

                <p className='subtitle mt0'>Углы усеченной призмы</p>


                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            a=
                            <input className='w70 bgc0 colfff' type="text" id="alpha" name="alpha" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                            b=
                            <input className='w70 bgc0 colfff' type="text" id="betta" name="betta" />
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="angle_y" className='label_inner_text bgc0 colfff borderfff'>
                            c=
                            <input className='w70 bgc0 colfff' type="text" id="angle_y" name="aangle_ylpha" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="angle_o" className='label_inner_text bgc0 colfff borderfff'>
                            d=
                            <input className='w70 bgc0 colfff' type="text" id="angle_o" name="angle_o" />
                        </label>
                    </div>
                </div>

                <div className="row center ">
                    <div className='form-group '>
                        <label htmlFor="angle_z" className='label_inner_text bgc0 colfff borderfff '>
                            k=
                            <input className='w70 bgc0 colfff ' type="text" id="angle_z" name="angle_z" />
                        </label>
                    </div>
                </div>



                <div className='form-group row'>
                    <label htmlFor="h">h=</label>
                    <input className='w220' type="text" id="h" name="h" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="f">f=</label>
                    <input className='w220' type="text" id="f" name="f" />
                </div>


                <div className='form-group row'>
                    <label htmlFor="V">V=</label>
                    <input className='w220' type="text" id="V" name="V" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="P">P=</label>
                    <input className='w220' type="text" id="P" name="P" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Slower">Sнп=</label>
                    <input className='w220' type="text" id="Slower" name="Slower" />
                </div>


                <div className='form-group row'>
                    <label htmlFor="Supper">Sвп=</label>
                    <input className='w220' type="text" id="Supper" name="Supper" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Sbp">Sбп=</label>
                    <input className='w220' type="text" id="Sbp" name="Sbp" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="S">Sпп=</label>
                    <input className='w220' type="text" id="S" name="S" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="n">n=</label>
                    <input className='w220' type="text" id="n" name="n" />
                </div>



                <div className="row">
                    <button type="submit" className="sFormText">Построить</button>
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>


            </form>
        </div>
    )


}