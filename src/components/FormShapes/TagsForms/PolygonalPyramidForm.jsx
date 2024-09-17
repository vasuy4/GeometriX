import { fixedNum, toDegrees, checkCalculate, checkBelowZero, calcPolygon } from '../formulas.js'
import polygonPyr from '../formShapesImg/polygonPyr.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Отображает форму трапеции
export default function PolygonalPyramidForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSideHeight = (n, a, H) => {
        let [r, R, So, Po, alpha] = calcPolygon(n, a)
        let b = Math.sqrt(R ** 2 + H ** 2)
        let h = Math.sqrt(r ** 2 + H ** 2)
        let V = 1 / 3 * (So * H)
        let Sbp = 1 / 2 * (Po * h)
        let S = Sbp + So
        let betta = toDegrees(Math.asin(H / h))
        let angle_y = toDegrees(Math.asin(H / b))
        let P = Po + b * n
        return [n, a, b, h, H, r, R, V, So, Sbp, S, P, alpha, betta, angle_y]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let n = fixedNum(Number(document.getElementById('n').value))
        let a = fixedNum(Number(document.getElementById('a').value)) // сторона осноования
        let b = fixedNum(Number(document.getElementById('b').value)) // ребро
        let h = fixedNum(Number(document.getElementById('h').value)) // апофема
        let H = fixedNum(Number(document.getElementById('H').value)) // высота
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус вписанной окр. основания
        let R = fixedNum(Number(document.getElementById('R').value)) // описанной
        let V = fixedNum(Number(document.getElementById('V').value))
        let So = fixedNum(Number(document.getElementById('So').value)) // площадь основания
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value)) // площадь боковой поверхности
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let P = fixedNum(Number(document.getElementById('P').value)) // периметр всей фигуры
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол между сторонами основания
        let betta = fixedNum(Number(document.getElementById('betta').value)) // угол между апофемой и основанием
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value)) // угол между ребром и основанием
        const arrInput = [n, a, b, h, H, r, R, V, So, Sbp, S, P, alpha, betta, angle_y]
        const idInputs = ['n', 'a', 'b', 'h', 'H', 'r', 'R', 'V', 'So', 'Sbp', 'S', 'P', 'alpha', 'betta', 'angle_y']

        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // сторону основания и высоту a h
        if (a && H && n >= 3) {
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'aH ok', 'aH bad')
        }
        // ребро и сторону основания
        else if (b && a && n >= 3) {
            R = a / (2 * Math.sin(Math.PI / n))
            H = Math.sqrt(b ** 2 - R ** 2)
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'ab ok', 'ab bad')
        }
        // апофему и сторону основания
        else if (h && a && n >= 3) {
            b = Math.sqrt(h ** 2 + (a / 2.0) ** 2)
            R = a / (2 * Math.sin(Math.PI / n))
            H = Math.sqrt(b ** 2 - R ** 2)
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'ah ok', 'ah bad')
        }
        else {
            console.log('error input')
            toast.error('Ошибка ввода данных');
        }
    }
    let nForm = 6,
        aForm = 1,
        bForm = null,
        hForm = null,
        HForm = 3,
        rForm = null,
        RForm = null,
        VForm = null,
        SoForm = null,
        SbpForm = null,
        SForm = null,
        PForm = null,
        alphaForm = null,
        bettaForm = null,
        angle_yForm = null;
    if (updateFigure != null) {
        nForm = updateFigure.formValues[0];    // n
        aForm = updateFigure.formValues[1];    // a
        bForm = updateFigure.formValues[2];    // b
        hForm = updateFigure.formValues[3];    // h
        HForm = updateFigure.formValues[4];    // H
        rForm = updateFigure.formValues[5];    // r
        RForm = updateFigure.formValues[6];    // R
        VForm = updateFigure.formValues[7];    // V
        SoForm = updateFigure.formValues[8];   // So
        SbpForm = updateFigure.formValues[9];  // Sbp
        SForm = updateFigure.formValues[10];   // S
        PForm = updateFigure.formValues[11];   // P
        alphaForm = updateFigure.formValues[12];// alpha
        bettaForm = updateFigure.formValues[13];// betta
        angle_yForm = updateFigure.formValues[14]; // angle_y
    }

    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1)}</p>

                <img src={polygonPyr} alt='polygonPyr' />

                <p className='subtitle mt0'>Сторона основания пирамиды и их количество</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="a" className='label_inner_text'>
                            a=
                            <input className='w70' type="text" id="a" name="a" defaultValue={aForm}/>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="n" className='label_inner_text'>
                            n=
                            <input className='w70' type="text" id="n" name="n" defaultValue={nForm}/>
                        </label>
                    </div>
                </div>

                <p className='subtitle mt0'>Ребро пирамиды</p>
                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="b" className='label_inner_text'>
                            b =
                            <input className='labela w230' type="text" id="b" name="b" defaultValue={bForm} />
                        </label>
                    </div>
                </div>

                <p className='subtitle mt0'>Углы пирамиды</p>
                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            α=
                            <input className='w70 bgc0 colfff' type="text" id="alpha" name="alpha" defaultValue={alphaForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                            β=
                            <input className='w70 bgc0 colfff' type="text" id="betta" name="betta" defaultValue={bettaForm} />
                        </label>
                    </div>
                </div>

                <div className="row center">
                    <div className='form-group'>
                        <label htmlFor="angle_y" className='label_inner_text bgc0 colfff borderfff'>
                            γ=
                            <input className='w70 bgc0 colfff' type="text" id="angle_y" name="angle_y" defaultValue={angle_yForm} />
                        </label>
                    </div>
                </div>

                <div className='form-group row'>
                    <label htmlFor="H">h=</label>
                    <input className='w220' type="text" id="H" name="H" defaultValue={HForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="h">l=</label>
                    <input className='w220' type="text" id="h" name="h" defaultValue={hForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="V">V=</label>
                    <input className='w220' type="text" id="V" name="V" defaultValue={VForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="So">So=</label>
                    <input className='w220' type="text" id="So" name="So" defaultValue={SoForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="S">Sпп=</label>
                    <input className='w220' type="text" id="S" name="S" defaultValue={SForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="Sbp">Sбп=</label>
                    <input className='w220' type="text" id="Sbp" name="Sbp" defaultValue={SbpForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="P">P=</label>
                    <input className='w220' type="text" id="P" name="P" defaultValue={PForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="r">r=</label>
                    <input className='w220' type="text" id="r" name="r" defaultValue={rForm} />
                </div>

                <div className='form-group row'>
                    <label htmlFor="R">R=</label>
                    <input className='w220' type="text" id="R" name="R" defaultValue={RForm} />
                </div>

                <div className="row">
                    {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    );



}