import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero } from '../formulas.js'
import cone from '../formShapesImg/cone.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Отображает форму трапеции
export default function ConeForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithRadiusL = (r, l) => {
        let d = r * 2
        let h = Math.sqrt(l ** 2 - r ** 2)
        let P = 2 * Math.PI * r
        let So = Math.PI * r ** 2
        let Sbp = Math.PI * r * l
        let S = So + Sbp
        let V = 1 / 3 * (So * h)
        let betta = toDegrees(Math.asin(h / l))
        let alpha = 180 - 2 * betta
        
        return [alpha, betta,h,l, P, V, So, Sbp, S,r, d   ]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол раствора
        let betta = fixedNum(Number(document.getElementById('betta').value)) // угол между образующей и основанием
        let h = fixedNum(Number(document.getElementById('h').value)) // высота
        let l = fixedNum(Number(document.getElementById('l').value)) // образующая
        let P = fixedNum(Number(document.getElementById('P').value)) // периметр основания
        let V = fixedNum(Number(document.getElementById('V').value))
        let So = fixedNum(Number(document.getElementById('So').value)) // площадь основания
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value)) // площадь боковой поверхности
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let d = fixedNum(Number(document.getElementById('d').value)) // радиус основания

        
        const arrInput = [alpha, betta,h,l, P, V, So, Sbp, S,r, d   ]
        const idInputs = ['alpha', 'betta', 'h', 'l', 'P', 'V', 'So', 'Sbp', 'S', 'r', 'd']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // радиус основания и образующую
        if (r && l) {
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rl ok', 'rl bad')
        }
        // радиус и высоту
        else if (r && h) {
            l = Math.sqrt(r ** 2 + h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rh ok', 'rh bad')
        }
        // образующую и высоту
        else if (h && l) {
            r = Math.sqrt(l ** 2 - h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'lh ok', 'lh bad')
        }
        // объём и высоту
        else if (V && h) {
            So = (3 * V) / h
            r = Math.sqrt(So / Math.PI)
            l = Math.sqrt(r ** 2 + h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'Vh ok', 'Vh bad')
        }
        // угол раствора и образующую
        else if (alpha && l) {
            r = Math.sin(toRadians(alpha / 2)) * l
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha l ok', 'alpha l bad')
        }
        // угол раствора и высоту
        else if (alpha && h) {
            r = Math.sin(toRadians(alpha / 2)) * l
            l = Math.sqrt(r ** 2 + h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha h ok', 'alpha h bad')
        }
        // угол раствора и радиус
        else if (alpha && r) {
            h = r / Math.tan(toRadians(alpha / 2))
            l = Math.sqrt(r ** 2 + h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha r ok', 'alpha r bad')
        }
        // Площадь основания и образующую
        else if (So && l) {
            r = Math.sqrt(So / Math.PI)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So l ok', 'So l bad')
        }
        // Площадь основания и высоту
        else if (So && h) {
            r = Math.sqrt(So / Math.PI)
            l = Math.sqrt(r ** 2 + h ** 2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So h ok', 'So h bad')
        }
        else {
            console.log('error input')
            toast.error('Ошибка ввода данных');
        }
    }

    let alphaform = null, bettaform = null, hform = 3, lform = null, Pform = null, Vform = null,Soform = null,Sbpform = null,Sform = null,rform = 3,dform = null;
    if (updateFigure != null) {
        alphaform = updateFigure.formValues[9];
        bettaform = updateFigure.formValues[10];
        hform = updateFigure.formValues[3];
        lform = updateFigure.formValues[2];
        Pform = updateFigure.formValues[8];
        Vform = updateFigure.formValues[4];
        Soform = updateFigure.formValues[5];
        Sbpform = updateFigure.formValues[6];
        Sform = updateFigure.formValues[7];
        rform = updateFigure.formValues[0];
        dform = updateFigure.formValues[1];
    }

    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>
                <img className="cone" src={cone} alt='cone' />

                <p className='subtitle mt0'>Углы конуса</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            α=
                            <input className='w70 bgc0 colfff' type="text" id="alpha" name="alpha" defaultValue={alphaform} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                            β=
                            <input className='w70 bgc0 colfff' type="text" id="betta" name="betta" defaultValue={bettaform}/>
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="h">h=</label>
                    <input type="text" id="h" name="h" className='w220'defaultValue={hform} />
                </div>
                <div className='form-group row'>
                    <label htmlFor="l">l=</label>
                    <input type="text" id="l" name="l" className='w220'defaultValue={lform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="P">P=</label>
                    <input type="text" id="P" name="perimeter" P='w220'defaultValue={Pform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="V">V=</label>
                    <input type="text" id="V" name="V" className='w220'defaultValue={Vform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="So">So=</label>
                    <input type="text" id="So" name="So" className='w220'defaultValue={Soform} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Sbp">Sбп=</label>
                    <input type="text" id="Sbp" name="Sbp" className='w220'defaultValue={Sbpform} />
                </div>
                <div className='form-group row'>
                    <label htmlFor="S">S=</label>
                    <input type="text" id="S" name="S" className='w220'defaultValue={Sform} />
                </div>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labela w70' type="text" id="r" name="r"defaultValue={rform} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="d" className='label_inner_text'>
                            d=
                            <input className='labela w70' type="text" id="d" name="d"defaultValue={dform} />
                        </label>
                    </div>
                </div>

                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>

            </form>
        </div>
    )


}