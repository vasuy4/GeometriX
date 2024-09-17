import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'
import polygon from '../formShapesImg/polygon.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Отображает форму трапеции
export default function PolygonalPrismForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (n, a) => {
        let P = a * n
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let R = a / (2 * Math.sin(Math.PI / n))
        let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        let alpha = (n - 2) / n * 180
        return [n, a, r, R, alpha, S, P]
    }
    const calcWithArea = (n, S) => {
        let a = Math.sqrt(4 * S * Math.tan(Math.PI / n) / n)
        let P = a * n
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let R = a / (2 * Math.sin(Math.PI / n))
        let alpha = (n - 2) / n * 180
        return [n, a, r, R, alpha, S, P]
    }
    const calcWithConorAndSide = (alpha, a) => {
        let n = (360 / (180 - alpha))
        let P = a * n
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let R = a / (2 * Math.sin(Math.PI / n))
        let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        return [n, a, r, R, alpha, S, P]
    }
    const calcWithrAndN = (r, n) => {
        let a = 2 * r * Math.tan(Math.PI / n)
        let P = a * n
        let R = a / (2 * Math.sin(Math.PI / n))
        let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        let alpha = (n - 2) / n * 180
        return [n, a, r, R, alpha, S, P]
    }
    const calcWithRAndN = (R, n) => {
        let a = 2 * R * Math.sin(Math.PI / n);
        let P = a * n
        let r = a / (2 * Math.tan(Math.PI / n)) // pi/n уже в радианах
        let S = (n / 4.0) * a ** 2 * (1 / Math.tan(Math.PI / n))
        let alpha = (n - 2) / n * 180
        return [n, a, r, R, alpha, S, P]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let nSides = fixedNum(Number(document.getElementById('nSides').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол между сторонами основания
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let R = fixedNum(Number(document.getElementById('R').value))
        const arrInput = [nSides, side_a, r, R, alpha, S, P]
        const idInputs = ['nSides','side_a','r', 'R' , 'alpha', 's', 'perimeter' ]
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // Сторону и высоту и число сторон основания
        if (side_a && nSides >= 3) {
            let arrCheck = calcWithSides(nSides, side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (S && nSides >= 3) {
            let arrCheck = calcWithArea(nSides, S)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (alpha && side_a >= 3) {
            let arrCheck = calcWithConorAndSide(alpha, side_a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (r && nSides) {
            let arrCheck = calcWithrAndN(r, nSides)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else if (R && nSides) {
            let arrCheck = calcWithRAndN(R, nSides)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'side n h ok', 'side n h bad')
        }
        else{
            toast.error('Ошибка ввода данных');
        }
    }

    let nForm = 5,
    aForm = 1,
    rForm = null,
    RForm = null,
    alphaForm = null,
    SForm = null,
    PForm = null;
    if (updateFigure != null) {
        nForm = updateFigure.formValues[0];    // n
        aForm = updateFigure.formValues[1];    // a
        rForm = updateFigure.formValues[2];    // r
        RForm = updateFigure.formValues[3];    // R
        alphaForm = updateFigure.formValues[4]; // alpha
        SForm = updateFigure.formValues[5];    // S
        PForm = updateFigure.formValues[6];    // P
    }
    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>
    
                <img src={polygon} alt='polygon' />
                <p className='subtitle2 mt0'>Сторона и их количество правильного многоугольника</p>
    
                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="side_a" className='label_inner_text'>
                            a=
                            <input className='labela w70' type="text" id="side_a" name="side_a" defaultValue={aForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="nSides" className='label_inner_text'>
                            n=
                            <input className='labela w70' type="text" id="nSides" name="nSides" defaultValue={nForm} />
                        </label>
                    </div>
                </div>
                <p className='subtitle2 mt0'>Угол правильного многоугольника</p>
    
                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                            α=
                            <input className='w230 bgc0 colfff' type="text" id="alpha" name="alpha" defaultValue={alphaForm} />
                        </label>
                    </div>
                </div>
    
                <div className='form-group row'>
                    <label htmlFor="s">S=
                        <input type="text" id="s" name="s" className='w220' defaultValue={SForm} />
                    </label>
                </div>
                <div className='form-group row'>
                    <label htmlFor="perimeter">P=
                        <input type="text" id="perimeter" name="perimeter" className='w220' defaultValue={PForm} />
                    </label>
                </div>
    
                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="r" className='label_inner_text'>
                            r=
                            <input className='labela w70' type="text" id="r" name="r" defaultValue={rForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="R" className='label_inner_text'>
                            R=
                            <input className='labela w70' type="text" id="R" name="R" defaultValue={RForm} />
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