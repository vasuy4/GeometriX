import { fixedNum, toDegrees, checkCalculate, checkBelowZero, calcPolygon } from '../formulas.js'
import truncatedPyramid from '../formShapesImg/truncatedPyramid.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'

// Отображает форму трапеции
export default function TruncatedPyramidForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

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
        const idInputs = ['n', 'a', 'b', 'd', 'f', 'h', 'P', 'Slower', 'Supper', 'Sbp', 'S', 'V', 'alpha', 'betta', 'angle_y', 'angle_o', 'angle_z']
            
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

    let nForm = 6, aForm = 3, bForm = 5, dForm = null, fForm = null, hForm = 1, PForm = null;
let SlowerForm = null, SupperForm = null, SbpForm = null, SForm = null, VForm = null, alphaForm = null;
let bettaForm = null, angleYForm = null, angleOForm = null, angleZForm = null;

if (updateFigure != null) {
    nForm = updateFigure.formValues[0];    // Присваиваем значение для переменной 'n'
    aForm = updateFigure.formValues[1];    // Присваиваем значение для переменной 'a'
    bForm = updateFigure.formValues[2];    // Присваиваем значение для переменной 'b'
    dForm = updateFigure.formValues[3];    // Присваиваем значение для переменной 'd'
    fForm = updateFigure.formValues[4];    // Присваиваем значение для переменной 'f'
    hForm = updateFigure.formValues[5];    // Присваиваем значение для переменной 'h'
    PForm = updateFigure.formValues[6];    // Присваиваем значение для переменной 'P'
    SlowerForm = updateFigure.formValues[7]; // Присваиваем значение для переменной 'Slower'
    SupperForm = updateFigure.formValues[8]; // Присваиваем значение для переменной 'Supper'
    SbpForm = updateFigure.formValues[9];   // Присваиваем значение для переменной 'Sbp'
    SForm = updateFigure.formValues[10];    // Присваиваем значение для переменной 'S'
    VForm = updateFigure.formValues[11];    // Присваиваем значение для переменной 'V'
    alphaForm = updateFigure.formValues[12]; // Присваиваем значение для переменной 'alpha'
    bettaForm = updateFigure.formValues[13]; // Присваиваем значение для переменной 'betta'
    angleYForm = updateFigure.formValues[14]; // Присваиваем значение для переменной 'angle_y'
    angleOForm = updateFigure.formValues[15]; // Присваиваем значение для переменной 'angle_o'
    angleZForm = updateFigure.formValues[16]; // Присваиваем значение для переменной 'angle_z'
}


return (
    <div className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

            <img className="truncatedPyramid" src={truncatedPyramid} alt='truncatedPyramid' />
            <p className='subtitle2 mt0'>Сторона основания ус. пирамиды</p>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="a" className='label_inner_text'>
                        a=
                        <input
                            className='labela w70'
                            type="text"
                            id="a"
                            name="a"
                            defaultValue={aForm} // Предположим, что aForm содержит значение для поля 'a'
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="b" className='label_inner_text'>
                        b=
                        <input
                            className='labela w70'
                            type="text"
                            id="b"
                            name="b"
                            defaultValue={bForm} // Предположим, что bForm содержит значение для поля 'b'
                        />
                    </label>
                </div>
            </div>

            <p className='subtitle2 mt0'>Ребро ус. призмы</p>
            <div className='form-group row'>
                <label htmlFor="d" className='label_inner_text'>
                    d =
                    <input
                        className='w230'
                        type="text"
                        id="d"
                        name="d"
                        defaultValue={dForm} // Предположим, что dForm содержит значение для поля 'd'
                    />
                </label>
            </div>

            <p className='subtitle2 mt0'>Углы усеченной призмы</p>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="alpha" className='label_inner_text bgc0 colfff borderfff'>
                        a=
                        <input
                            className='w70 bgc0 colfff'
                            type="text"
                            id="alpha"
                            name="alpha"
                            defaultValue={alphaForm} // Предположим, что alphaForm содержит значение для поля 'alpha'
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="betta" className='label_inner_text bgc0 colfff borderfff'>
                        b=
                        <input
                            className='w70 bgc0 colfff'
                            type="text"
                            id="betta"
                            name="betta"
                            defaultValue={bettaForm} // Предположим, что bettaForm содержит значение для поля 'betta'
                        />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="angle_y" className='label_inner_text bgc0 colfff borderfff'>
                        c=
                        <input
                            className='w70 bgc0 colfff'
                            type="text"
                            id="angle_y"
                            name="angle_y"
                            defaultValue={angleYForm} // Предположим, что angleYForm содержит значение для поля 'angle_y'
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="angle_o" className='label_inner_text bgc0 colfff borderfff'>
                        d=
                        <input
                            className='w70 bgc0 colfff'
                            type="text"
                            id="angle_o"
                            name="angle_o"
                            defaultValue={angleOForm} // Предположим, что angleOForm содержит значение для поля 'angle_o'
                        />
                    </label>
                </div>
            </div>

            <div className="row center">
                <div className='form-group'>
                    <label htmlFor="angle_z" className='label_inner_text bgc0 colfff borderfff'>
                        k=
                        <input
                            className='w70 bgc0 colfff'
                            type="text"
                            id="angle_z"
                            name="angle_z"
                            defaultValue={angleZForm} // Предположим, что angleZForm содержит значение для поля 'angle_z'
                        />
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="h">h=</label>
                <input
                    className='w220'
                    type="text"
                    id="h"
                    name="h"
                    defaultValue={hForm} // Предположим, что hForm содержит значение для поля 'h'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="f">f=</label>
                <input
                    className='w220'
                    type="text"
                    id="f"
                    name="f"
                    defaultValue={fForm} // Предположим, что fForm содержит значение для поля 'f'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="V">V=</label>
                <input
                    className='w220'
                    type="text"
                    id="V"
                    name="V"
                    defaultValue={VForm} // Предположим, что VForm содержит значение для поля 'V'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="P">P=</label>
                <input
                    className='w220'
                    type="text"
                    id="P"
                    name="P"
                    defaultValue={PForm} // Предположим, что PForm содержит значение для поля 'P'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="Slower">Sнп=</label>
                <input
                    className='w220'
                    type="text"
                    id="Slower"
                    name="Slower"
                    defaultValue={SlowerForm} // Предположим, что SlowerForm содержит значение для поля 'Slower'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="Supper">Sвп=</label>
                <input
                    className='w220'
                    type="text"
                    id="Supper"
                    name="Supper"
                    defaultValue={SupperForm} // Предположим, что SupperForm содержит значение для поля 'Supper'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="Sbp">Sбп=</label>
                <input
                    className='w220'
                    type="text"
                    id="Sbp"
                    name="Sbp"
                    defaultValue={SbpForm} // Предположим, что SbpForm содержит значение для поля 'Sbp'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="S">Sпп=</label>
                <input
                    className='w220'
                    type="text"
                    id="S"
                    name="S"
                    defaultValue={SForm} // Предположим, что SForm содержит значение для поля 'S'
                />
            </div>

            <div className='form-group row'>
                <label htmlFor="n">n=</label>
                <input
                    className='w220'
                    type="text"
                    id="n"
                    name="n"
                    defaultValue={nForm} // Предположим, что nForm содержит значение для поля 'n'
                />
            </div>

            <div className="row">
                {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                <button onClick={handleClose} className="sFormText">Закрыть</button>
            </div>
        </form>
    </div>
);


}