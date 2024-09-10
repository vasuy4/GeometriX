import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'
import hemisphere from '../formShapesImg/hemisphere.svg'

// Отображает форму трапеции
export default function HemisphereForm({ handleFormSubmit, selectedShape, handleClose }) {
    const calcWithSides = (r) => {
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, S, Ss, Sob, V]
    }
    const calcWithdiametr = (d) => {
        let r = d / 2;
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r

        return [r, d, P, S, Ss, Sob, V]
    }
    const calcWithVolume = (V) => {
        let r = Math.cbrt(V * 3 / 2 / Math.PI)
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, S, Ss, Sob, V]
    }
    const calcWithSob = (Sob) => {
        let r = Math.sqrt(Sob / 3 / Math.PI)
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d, P, S, Ss, Sob, V]
    }
    const calcWithSs = (Ss) => {
        let r = Math.sqrt(Ss / 2 / Math.PI)
        let S = Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        let Sob = S + Ss;
        return [r, d, P, S, Ss, Sob, V]
    }

    const calcWithS = (S) => {
        let r = Math.sqrt(S / Math.PI)
        let Ss = 2 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        let Sob = S + Ss;
        return [r, d, P, S, Ss, Sob, V]
    }



    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let r = fixedNum(Number(document.getElementById('r').value))
        let d = fixedNum(Number(document.getElementById('d').value)) // добавил диаметр
        let P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
        let S = fixedNum(Number(document.getElementById('S').value))
        let Ss = fixedNum(Number(document.getElementById('Ss').value))
        let Sob = fixedNum(Number(document.getElementById('Sob').value))
        let V = fixedNum(Number(document.getElementById('V').value))


        const arrInput = [r, d, P, S, Ss, Sob, V]
        const idInputs = ['r', 'd', 'V', 'P', 'S', 'Ss', 'Sob']
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
            let arrCheck = calcWithdiametr(d)
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
        if (S) {
            let arrCheck = calcWithS(S)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        if (Ss) {
            let arrCheck = calcWithSs(Ss)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }


    }


    return (
        <div  className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <img className="hemisphere" src={hemisphere} alt='hemisphere' />
            
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
                <label htmlFor="V">
                    V=
                </label>
                <input className='w220' type="text" id="V" name="V" />
            </div>

            <div className='form-group row'>
                <label htmlFor="P">
                P=
                </label>
                <input className='w220' type="text" id="P" name="P" />
            </div>
            <div className='form-group row'>
                <label htmlFor="S">
                S=
                </label>
                <input className='w220' type="text" id="S" name="S" />
            </div>
            <div className='form-group row'>
                <label htmlFor="Ss">
                Sk=
                </label>
                <input className='w220' type="text" id="Ss" name="Ss" />
            </div>

            <div className='form-group row'>
                <label htmlFor="Sob">
                Sпп=
                </label>
                <input className='w220' type="text" id="Sob" name="Sob" />
            </div>

            <div className="row">
                <button type="submit" className= "sFormText">Построить</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>



        </form>
        </div>
    )

}