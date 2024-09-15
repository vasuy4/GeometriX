import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'
import hemisphere from '../formShapesImg/hemisphere.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

// Отображает форму трапеции
export default function HemisphereForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (r) => {
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d,V, P, S, Ss, Sob ]
    }
    const calcWithdiametr = (d) => {
        let r = d / 2;
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r

        return [r, d,V, P, S, Ss, Sob ]
    }
    const calcWithVolume = (V) => {
        let r = Math.cbrt(V * 3 / 2 / Math.PI)
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let Sob = S + Ss;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d,V, P, S, Ss, Sob ]
    }
    const calcWithSob = (Sob) => {
        let r = Math.sqrt(Sob / 3 / Math.PI)
        let S = Math.PI * r * r;
        let Ss = 2 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        return [r, d,V, P, S, Ss, Sob ]
    }
    const calcWithSs = (Ss) => {
        let r = Math.sqrt(Ss / 2 / Math.PI)
        let S = Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        let Sob = S + Ss;
        return [r, d,V, P, S, Ss, Sob ]
    }

    const calcWithS = (S) => {
        let r = Math.sqrt(S / Math.PI)
        let Ss = 2 * Math.PI * r * r;
        let V = 2 / 3 * Math.PI * r * r * r;
        let P = 2 * Math.PI * r
        let d = r * 2
        let Sob = S + Ss;
        return [r, d,V, P, S, Ss, Sob ]
    }



    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();


        let r = fixedNum(Number(document.getElementById('r').value))
        let d = fixedNum(Number(document.getElementById('d').value)) // добавил диаметр
        let V = fixedNum(Number(document.getElementById('V').value))
        let P = fixedNum(Number(document.getElementById('P').value)) // добавил длину основания (окружности)
        let S = fixedNum(Number(document.getElementById('S').value))
        let Ss = fixedNum(Number(document.getElementById('Ss').value))
        let Sob = fixedNum(Number(document.getElementById('Sob').value))

        

        const arrInput = [r, d,V, P, S, Ss, Sob ]
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


    let rform = 3, dform = null,Vform = null, Pform = null, Sform = null, Ssform = null, Sobform = null;
    if (updateFigure != null) {
        rform = updateFigure.formValues[0];
        dform = updateFigure.formValues[1];
        Vform = updateFigure.formValues[2];
        Pform = updateFigure.formValues[3];
        Sform = updateFigure.formValues[4];
        Ssform = updateFigure.formValues[5];
        Sobform = updateFigure.formValues[6];

    }

    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

                <img className="hemisphere" src={hemisphere} alt='hemisphere' />

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labela w70' type="text" id="r" name="r" defaultValue={rform} />
                        </label>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="d" className='label_inner_text'>
                            d=
                            <input className='labeld w70' type="text" id="d" name="d"defaultValue={dform} />
                        </label>
                    </div>
                </div>

                <div className='form-group row'>
                    <label htmlFor="V">
                        V=
                    </label>
                    <input className='w220' type="text" id="V" name="V"defaultValue={Vform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="P">
                        P=
                    </label>
                    <input className='w220' type="text" id="P" name="P" defaultValue={Pform}/>
                </div>
                <div className='form-group row'>
                    <label htmlFor="S">
                        S=
                    </label>
                    <input className='w220' type="text" id="S" name="S"defaultValue={Sform} />
                </div>
                <div className='form-group row'>
                    <label htmlFor="Ss">
                        Sk=
                    </label>
                    <input className='w220' type="text" id="Ss" name="Ss"defaultValue={Ssform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Sob">
                        Sпп=
                    </label>
                    <input className='w220' type="text" id="Sob" name="Sob"defaultValue={Sobform} />
                </div>

                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>



            </form>
        </div>
    )

}