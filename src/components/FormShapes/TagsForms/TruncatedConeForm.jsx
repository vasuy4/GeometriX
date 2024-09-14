import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import truncatedCone from '../formShapesImg/truncatedCone.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

// Отображает форму трапеции
export default function TruncatedConeForm({ handleFormSubmit, selectedShape, handleClose }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithRadiusL = (R, r, l) => {
        let h = Math.sqrt(l ** 2 - (R - r) ** 2)
        let V = Math.PI * h / 3 * (R ** 2 + r * R + r ** 2)
        let Slower = Math.PI * R ** 2
        let Supper = Math.PI * r ** 2
        let Sbp = Math.PI * l * (R + r)
        let S = Slower + Supper + Sbp
        let betta = toDegrees(Math.acos((R - r) / l))
        let alpha = 180 - betta

        return [r, R, l, h, V, Slower, Supper, Sbp, S, alpha, betta]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус нижнего основания
        let R = fixedNum(Number(document.getElementById('R').value))
        let l = fixedNum(Number(document.getElementById('l').value)) // образующая
        let h = fixedNum(Number(document.getElementById('h').value)) // высота
        let V = fixedNum(Number(document.getElementById('V').value))
        let Slower = fixedNum(Number(document.getElementById('Slower').value)) // площадь нижнего основания
        let Supper = fixedNum(Number(document.getElementById('Supper').value)) // площадь верхнего основания
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value)) // площадь боковой поверхности
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол раствора
        let betta = fixedNum(Number(document.getElementById('betta').value)) // угол между образующей и основанием
        const arrInput = [r, R, l, h, V, Slower, Supper, Sbp, S, alpha, betta]
        const idInputs = ['alpha', 'betta', 'h', 'l', 'V', 'Slower', 'Supper', 'Sbp', 'S', 'r', 'R']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // радиусы оснований и образующую
        if (R && r && l) {
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rl ok', 'rl bad')
        }
        // радиусы и высоту
        else if (R && r && h) {
            let l = Math.sqrt(h ** 2 + (R - r) ** 2)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rh ok', 'rh bad')
        }
        // площади оснований и образующую
        else if (Slower && Supper && l) {
            let R = Math.sqrt(Slower / Math.PI)
            let r = Math.sqrt(Supper / Math.PI)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'SSl ok', 'SSl bad')
        }
        // площади оснований и высоту
        else if (Slower && Supper && h) {
            let R = Math.sqrt(Slower / Math.PI)
            let r = Math.sqrt(Supper / Math.PI)
            let l = Math.sqrt(h ** 2 + (R - r) ** 2)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'SSh ok', 'SSh bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

                <img className="truncatedCone" src={truncatedCone} alt='truncatedCone' />

                <p className='subtitle mt0'>Углы усеченного конуса</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            α=
                            <input className='w70 bgc0 colfff' type="text" id="alpha" name="alpha" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                            β=
                            <input className='w70 bgc0 colfff' type="text" id="betta" name="betta" />
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="h">h=</label>
                    <input type="text" id="h" name="h" className='w220' />
                </div>
                <div className='form-group row'>
                    <label htmlFor="l">l=</label>
                    <input type="text" id="l" name="l" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="V">V=</label>
                    <input type="text" id="V" name="V" className='w220' />
                </div>


                <div className='form-group row'>
                    <label htmlFor="Slower">Sнп=</label>
                    <input type="text" id="Slower" name="Slower" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Supper">Sвп=</label>
                    <input type="text" id="Supper" name="Supper" className='w220' />
                </div>
                <div className='form-group row'>
                    <label htmlFor="Sbp">Sбп=</label>
                    <input type="text" id="Sbp" name="Sbp" className='w220' />
                </div>

                <div className='form-group row'>
                    <label htmlFor="S">Sпп=</label>
                    <input type="text" id="S" name="S" className='w220' />
                </div>



                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labela w70' type="text" id="r" name="r" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="R" className='label_inner_text'>
                            R=
                            <input className='labela w70' type="text" id="R" name="R" />
                        </label>
                    </div>
                </div>


                <div className="row">
                    <button type="submit" className="sFormText">Построить</button>
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>

            </form>
        </div>
    )
}