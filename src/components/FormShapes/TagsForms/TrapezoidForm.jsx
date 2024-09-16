import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'

import trapezoid from '../formShapesImg/trapezoid.svg'
import rectangleAlfaBeta from '..//formShapesImg/rectangleAlfaBeta.svg'
import trapezoidK from '..//formShapesImg/trapezoidK.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

// Отображает форму трапеции
export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (a, b, c, d) => {

        // calc sides
        let m = (a + b) / 2.0  // true
        let P = a + b + c + d  // true
        let p = P / 2.0  // true
        let d1 = Math.sqrt(d ** 2 + a * b - (a * (d ** 2 - c ** 2)) / (a - b))  // true
        let d2 = Math.sqrt(c ** 2 + d ** 2 + 2 * a * b - d1 ** 2)  // true
        let S = (a + b) / 2.0 * Math.sqrt(c ** 2 - (((a - b) ** 2 + c ** 2 - d ** 2) / (2 * (a - b))) ** 2)  // true
        let h = S / m  // true

        // calc angles
        let alpha = toDegrees(Math.asin(h / c))
        let betta = 180 - alpha
        let angle_o = toDegrees(Math.asin(h / d))
        let angle_y = 180 - angle_o
        let angle_e = toDegrees(Math.asin(h / ((d1 * d2) / (a + b))))
        let angle_z = 180 - angle_e
        return [a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {

        event.preventDefault();
        // a - нижнее основание, b - верхнее
        // c - левая сторона d - правая сторона
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let side_d = fixedNum(Number(document.getElementById('side_d').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let angle_e = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_z = fixedNum(Number(document.getElementById('angle_o').value))
        let h = fixedNum(Number(document.getElementById('height1').value))
        let m = fixedNum(Number(document.getElementById('m').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))

        const arrInput = [side_a, side_b, side_c, side_d, diagonal1, diagonal2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z]
        const idInputs = ['side_a', 'side_b', 'side_c', 'side_d', 'diagonal1', 'diagonal2', 'height1', 'm', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o', 'angle_e', 'angle_z'];
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // 4 стороны
        if (side_a && side_b && side_c && side_d) {
            let arrCheck = calcWithSides(side_a, side_b, side_c, side_d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
        }
    }
    let aForm = 2, 
    bForm = 3, 
    cForm = 3, 
    dForm = 3, 
    d1Form = null, 
    d2Form = null, 
    hForm = null, 
    mForm = null, 
    SForm = null, 
    PForm = null, 
    alphaForm = null, 
    bettaForm = null, 
    angle_yForm = null, 
    angle_oForm = null, 
    angle_eForm = null, 
    angle_zForm = null;

if (updateFigure != null) {
    aForm = updateFigure.formValues[0];         // a
    bForm = updateFigure.formValues[1];         // b
    cForm = updateFigure.formValues[2];         // c
    dForm = updateFigure.formValues[3];         // d
    d1Form = updateFigure.formValues[4];        // d1
    d2Form = updateFigure.formValues[5];        // d2
    hForm = updateFigure.formValues[6];         // h
    mForm = updateFigure.formValues[7];         // m
    SForm = updateFigure.formValues[8];         // S
    PForm = updateFigure.formValues[9];         // P
    alphaForm = updateFigure.formValues[10];    // alpha
    bettaForm = updateFigure.formValues[11];    // betta
    angle_yForm = updateFigure.formValues[12];  // angle_y
    angle_oForm = updateFigure.formValues[13];  // angle_o
    angle_eForm = updateFigure.formValues[14];  // angle_e
    angle_zForm = updateFigure.formValues[15];  // angle_z
}

return (
    <div className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

            <img src={trapezoid} alt='parallelogram' />

            <p className='subtitle mt0'>Стороны трапеции</p>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="side_a" className='label_inner_text'>
                        a=
                        <input className='labela w70' type="text" id="side_a" name="side_a" defaultValue={aForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_b" className='label_inner_text'>
                        b=
                        <input className='labela w70' type="text" id="side_b" name="side_b" defaultValue={bForm} />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="side_c" className='label_inner_text'>
                        c=
                        <input className='labela w70' type="text" id="side_c" name="side_c" defaultValue={cForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_d" className='label_inner_text'>
                        d=
                        <input className='labela w70' type="text" id="side_d" name="side_d" defaultValue={dForm} />
                    </label>
                </div>
            </div>

            <p className='subtitle mt0'>Углы трапеции</p>

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

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="angle_y" className='label_inner_text bgc0 colfff borderfff'>
                        y=
                        <input className='w70 bgc0 colfff' type="text" id="angle_y" name="angle_y" defaultValue={angle_yForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_o" className='label_inner_text bgc0 colfff borderfff'>
                        o=
                        <input className='w70 bgc0 colfff' type="text" id="angle_o" name="angle_o" defaultValue={angle_oForm} />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className='form-group'>
                    <img className='input-size bgc0 colfff' src={rectangleAlfaBeta} alt='rectangleAlfaBeta' />
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_e" className='label_inner_text bgc0 colfff borderfff'>
                        e=
                        <input className='w160 bgc0 colfff' type="text" id="angle_e" name="angle_e" defaultValue={angle_eForm} />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className='form-group'>
                    <img className='input-size bgc0 colfff' src={trapezoidK} alt='rectangleAlfaBeta' />
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_z" className='label_inner_text bgc0 colfff borderfff'>
                        z=
                        <input className='w160 bgc0 colfff' type="text" id="angle_z" name="angle_z" defaultValue={angle_zForm} />
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="height1">h=</label>
                <input type="text" id="height1" name="height1" className='w220' defaultValue={hForm} />
            </div>
            <div className='form-group row'>
                <label htmlFor="m">m=</label>
                <input type="text" id="m" name="m" className='w220' defaultValue={mForm} />
            </div>

            <div className='form-group row'>
                <label htmlFor="s">S=</label>
                <input type="text" id="s" name="s" className='w220' defaultValue={SForm} />
            </div>
            <div className='form-group row'>
                <label htmlFor="perimeter">P=</label>
                <input type="text" id="perimeter" name="perimeter" className='w220' defaultValue={PForm} />
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="diagonal1" className='label_inner_text'>
                        d1=
                        <input className='labela w70' type="text" id="diagonal1" name="diagonal1" defaultValue={d1Form} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="diagonal2" className='label_inner_text'>
                        d2=
                        <input className='labela w70' type="text" id="diagonal2" name="diagonal2" defaultValue={d2Form} />
                    </label>
                </div>
            </div>

            <div className="row">
                {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                <button onClick={handleClose} className="sFormText">Закрыть</button>
            </div>
        </form>
    </div>
);




}