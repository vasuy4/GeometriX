import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import sphereImage from '../formShapesImg/sphere.svg'


// Отображает форму трапеции
export default function HemisphereForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (r) => {
        let Sob = 4 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }
    const calcWithDiametr = (d) => {
        let r = d / 2;
        let Sob = 4 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r

        return [r, d, P, Sob, V]
    }
    const calcWithVolume = (V) => {
        let r = Math.cbrt(V * 3 / 2 / Math.PI)
        let Sob = 4 * Math.PI * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }
    const calcWithSob = (Sob) => {
        let r = Math.sqrt(Sob / 4 / Math.PI)
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, Sob, V]
    }




    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let r = fixedNum(Number(document.getElementById('r').value))
        let d = fixedNum(Number(document.getElementById('d').value)) // добавил диаметр
        let P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
        let Sob = fixedNum(Number(document.getElementById('Sob').value))
        let V = fixedNum(Number(document.getElementById('V').value))


        const arrInput = [r, d, P, Sob, V]
        const idInputs = ['r', 'd', 'P', 'Sob', 'V']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (r) {
            let arrCheck = calcWithSides(r)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (d) {
            let arrCheck = calcWithDiametr(d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }

        if (V) {
            let arrCheck = calcWithVolume(V)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (Sob) {
            let arrCheck = calcWithSob(Sob)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <img className="squareImage" src={sphereImage} alt='sphere' />


            <div className="row">
                <div className='form-group'>
                    <label htmlFor="r" className='label_inner_text'>
                        r=
                        <input className='labela w70' type="text" id="r" name="r" />
                    </label>
                </div>

                <div className='form-group'>
                    <label htmlFor="d" className='label_inner_text'>
                        d=
                        <input className='labeld w70' type="text" id="d" name="d" />
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="P">
                    P=
                </label>
                <input className='w220' type="text" id="P" name="P" />
            </div>

            <div className='form-group row'>
                <label htmlFor="Sob">S=</label>
                <input className='w220' type="text" id="Sob" name="Sob" />
            </div>

            <div className='form-group row'>
                <label htmlFor="V">V=</label>
                <input className='w220' type="text" id="V" name="V" />
            </div>
            
            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}