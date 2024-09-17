import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, areaOfHeron, perimetrTriangle, findAngleTeorCos, findHeightSideArea, findSideTeorCos } from '../formulas.js'

import triangleImage from '../formShapesImg/triangle.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Отображает форму трапеции
export default function TrapezoidForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSides = (a, b, c) => {


        let conor_a = toDegrees(findAngleTeorCos(a, b, c))
        let conor_b = toDegrees(findAngleTeorCos(b, a, c))
        let conor_c = toDegrees(findAngleTeorCos(c, b, a))
        let P = perimetrTriangle(a, b, c)//периметр
        let S = areaOfHeron(a, b, c)
        let height_h = findHeightSideArea(c, S)
        let height_m = findHeightSideArea(b, S)
        let height_l = findHeightSideArea(a, S)

        let inscribed_R = S * 2 / P
        let described_R = a * b * c / (4 * S)
        // console.log(S)]

        return [a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R];
    }
    const calcWithSideBetweenConors = (c_a, c_b, side_c, arrayconor, arraySide) => {

        let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//это массив который нам надо заполнить


        let conor_a;
        let conor_b;
        let conor_c;


        if (arrayconor[0] == 0) {//тут мы посчитали все углы в правильном порядке(слава богу углов только 3)
            conor_a = c_a
            if (arrayconor[1] == 1) {
                conor_b = c_b
                conor_c = 180 - conor_a - conor_b;
            } else {
                conor_c = c_b
                conor_b = 180 - conor_a - conor_c;
            }
        } else {
            conor_b = c_a
            conor_c = c_b
            conor_a = 180 - conor_c - conor_b;
        }





        array[3] = conor_a;
        array[4] = conor_b;
        array[5] = conor_c;

        let k//коэффициант сторона на синус по теореме синусов

        array[arraySide[0]] = side_c;//

        k = side_c / Math.sin(toRadians(array[arraySide[0] + 3]))

        for (let i = 0; i < 3; i++) {
            if (!array[i]) {
                array[i] = k * Math.sin(toRadians(array[i + 3]))
            }
        }


        let P = perimetrTriangle(array[0], array[1], array[2])//периметр

        let S = areaOfHeron(array[0], array[1], array[2])
        let height_h = findHeightSideArea(array[2], S)
        let height_m = findHeightSideArea(array[1], S)
        let height_l = findHeightSideArea(array[0], S)

        let inscribed_R = S * 2 / P
        let described_R = array[0] * array[1] * array[2] / (4 * S)

        array[6] = height_h;
        array[7] = height_m;
        array[8] = height_l;
        array[9] = S;
        array[10] = P;
        array[11] = inscribed_R;
        array[12] = described_R;

        //console.log(array)
        return array;

    }
    // const calcWithSideagainstConors = (a, b, c, arrayconor, arraySide ) => {вроде не нужен

    // }

    const calcWithTwosidesAndCorner = (s_a, s_b, c_c, arrayconor, arraySide) => {
        let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//это массив который нам надо заполнить
        if (arraySide[0] == 0) {
            array[0] = s_a;
            if (arraySide[1] == 1) {
                array[1] = s_b;
            }
            else {
                array[2] = s_b;
            }
        } else {
            array[1] = s_a;
            array[2] = s_b;
        }
        //два варианта если угол между стооронами и против
        if (arrayconor[0] != arraySide[0] && arrayconor[0] != arraySide[1]) {//между


            for (let i = 0; i < 3; i++) {
                if (array[i] == 0) {
                    array[i] = findSideTeorCos(s_a, s_b, c_c);
                }
            }
            array[3] = toDegrees(findAngleTeorCos(array[0], array[1], array[2]))
            array[4] = toDegrees(findAngleTeorCos(array[1], array[0], array[2]))
            array[5] = toDegrees(findAngleTeorCos(array[2], array[1], array[0]))
        } else {//против

            let k
            let conor_b
            if (arrayconor[0] == 0) {

                array[3] = c_c;
                k = array[0] / Math.sin(toRadians(c_c))
                //заполняем 3ю сторону
                if (!array[1]) {

                    array[5] = toDegrees(Math.asin((array[2] / k)))
                    array[4] = 180 - array[3] - array[5]
                    array[1] = findSideTeorCos(array[0], array[2], array[4])
                    // array[4] = Math.asin(array[1] / k)
                    // array[5] = 180 - array[3] - array[4]
                    // array[1] = findSideTeorCos(array[0], array[2], array[4])
                } else {//2
                    array[4] = toDegrees(Math.asin(s_b / k))
                    array[5] = 180 - array[3] - array[4]
                    array[2] = findSideTeorCos(array[0], array[1], array[5])
                }


            } else if (arrayconor[0] == 1) {

                array[4] = c_c;
                k = array[1] / Math.sin(toRadians(c_c))

                if (!array[0]) {
                    array[5] = toDegrees(Math.asin(s_b / k))
                    array[3] = 180 - array[5] - array[4]
                    array[0] = findSideTeorCos(array[1], array[2], array[3])
                } else {//2
                    array[3] = toDegrees(Math.asin(s_b / k))
                    array[5] = 180 - array[3] - array[4]
                    array[2] = findSideTeorCos(array[0], array[1], array[5])
                }

            }
            else {//2
                array[5] = c_c;
                k = array[2] / Math.sin(toRadians(c_c))
                if (!array[0]) {

                    array[4] = toDegrees(Math.asin(s_b / k))
                    array[3] = 180 - array[5] - array[4]
                    array[0] = findSideTeorCos(array[1], array[2], array[3])
                } else {//1

                    array[4] = toDegrees(Math.asin(s_b / k))
                    array[3] = 180 - array[5] - array[4]
                    array[1] = findSideTeorCos(array[0], array[2], array[4])
                }
            }

        }

        let P = perimetrTriangle(array[0], array[1], array[2])//периметр

        let S = areaOfHeron(array[0], array[1], array[2])
        let height_h = findHeightSideArea(array[2], S)
        let height_m = findHeightSideArea(array[1], S)
        let height_l = findHeightSideArea(array[0], S)

        let inscribed_R = S * 2 / P
        let described_R = array[0] * array[1] * array[2] / (4 * S)

        array[6] = height_h;
        array[7] = height_m;
        array[8] = height_l;
        array[9] = S;
        array[10] = P;
        array[11] = inscribed_R;
        array[12] = described_R;


        return array;

    }

    // const calcWithHeightAndSide = (array,i) => {
    //     array[9] = array[i]*array[1+6]/2;



    //     return array
    // }


    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        //сначала код сюда
        event.preventDefault();

        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let conor_a = fixedNum(Number(document.getElementById('conor_a').value))
        let conor_b = fixedNum(Number(document.getElementById('conor_b').value))
        let conor_c = fixedNum(Number(document.getElementById('conor_c').value))
        let height_h = fixedNum(Number(document.getElementById('height_h').value)) // hc
        let height_m = fixedNum(Number(document.getElementById('height_m').value)) // hb
        let height_l = fixedNum(Number(document.getElementById('height_l').value)) // ha
        let Square = fixedNum(Number(document.getElementById('Square').value))
        let Perimeter = fixedNum(Number(document.getElementById('Perimeter').value))
        let inscribed_R = fixedNum(Number(document.getElementById('inscribed_R').value))
        let described_R = fixedNum(Number(document.getElementById('described_R').value))
        const arrInput = [side_a, side_b, side_c, conor_a, conor_b, conor_c, height_h, height_m, height_l, Square, Perimeter, inscribed_R, described_R]
        const idInputs = ['side_a', 'side_b', 'side_c', 'conor_a', 'conor_b', 'conor_c', 'height_h', 'height_m', 'height_l', 'Square', 'Perimeter', 'inscribed_R', 'described_R']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return



        // Подсчёт остальных параметров, опираясь на:
        // 3 стороны
        if (side_a && side_b && side_c) {
            let arrCheck = calcWithSides(side_a, side_b, side_c)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
            return;
        }


        let counterSides = 0;
        let arraySide = [];
        for (let i = 0; i < 3; i++) {//проверка на колво сторон
            if (arrInput[i] != 0) {
                counterSides++;
                arraySide.push(i);
            }
        }
        let counterConor = 0;
        let arrayconor = [];
        for (let i = 3; i < 6; i++) {//проверка на колво углов
            if (arrInput[i] != 0) {
                counterConor++;
                arrayconor.push(i - 3);
            }
        }

        if (counterConor >= 2 && counterSides >= 1) { //два угла и сторону
            //сторона между углами
            let arrCheck = calcWithSideBetweenConors(arrInput[arrayconor[0] + 3], arrInput[arrayconor[1] + 3], arrInput[arraySide[0]], arrayconor, arraySide)//чтобы знать что уже заполнено
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')
            //сторона напротив угла
            //DONE:
            //вроде не требуется и так работает 
            return;
        }
        else if (counterConor == 1 && counterSides == 2) {//две стороны и угол

            let arrCheck = calcWithTwosidesAndCorner(arrInput[arraySide[0]], arrInput[arraySide[1]], arrInput[arrayconor[0] + 3], arrayconor, arraySide)//чтобы знать что уже заполнено
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')

            return;
        }else{
            toast.error('Ошибка ввода данных');
        }

        //основание и высота
        // if ((side_a && height_h) || (side_b && height_m) || (side_c && height_l)) {

        //     let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        //     let i;
        //     for (i = 0; i < 3; i++) {
        //         if (arrInput[i] && arrInput[i + 6]) {

        //             array[i] = arrInput[i];
        //             array[i + 6] = arrInput[i + 6];
        //             break
        //         }

        //     }
        //     let arrCheck = calcWithHeightAndSide(array,i)
        //     checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides bad')

        // }


    }

    let aForm = 3, 
    bForm = 4, 
    cForm = 5, 
    conor_aForm = null, 
    conor_bForm = null, 
    conor_cForm = null, 
    height_hForm = null, 
    height_mForm = null, 
    height_lForm = null, 
    SForm = null, 
    PForm = null, 
    inscribed_RForm = null, 
    described_RForm = null;

if (updateFigure != null) {
    aForm = updateFigure.formValues[0];            // a
    bForm = updateFigure.formValues[1];            // b
    cForm = updateFigure.formValues[2];            // c
    conor_aForm = updateFigure.formValues[3];      // conor_a
    conor_bForm = updateFigure.formValues[4];      // conor_b
    conor_cForm = updateFigure.formValues[5];      // conor_c
    height_hForm = updateFigure.formValues[6];     // height_h
    height_mForm = updateFigure.formValues[7];     // height_m
    height_lForm = updateFigure.formValues[8];     // height_l
    SForm = updateFigure.formValues[9];            // S
    PForm = updateFigure.formValues[10];           // P
    inscribed_RForm = updateFigure.formValues[11]; // inscribed_R
    described_RForm = updateFigure.formValues[12]; // described_R
}

return (
    <div className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

            <img className="triangleImage" src={triangleImage} alt='triangle' />

            {/* <button onClick={handleClose}>Close</button> */}

            <p className='subtitle mt0'>Стороны треугольника</p>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="side_a" className='label_inner_text'>
                        a=
                        <input className='w50' type="text" id="side_a" name="side_a" defaultValue={aForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_b" className='label_inner_text'>
                        b=
                        <input className='w50' type="text" id="side_b" name="side_b" defaultValue={bForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="side_c" className='label_inner_text'>
                        c=
                        <input className='w50' type="text" id="side_c" name="side_c" defaultValue={cForm} />
                    </label>
                </div>
            </div>

            <p className='subtitle mt0'>Углы треугольника</p>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="conor_a" className='label_inner_text bgc0 colfff borderfff'>
                        α=
                        <input className='w50 bgc0 colfff' type="text" id="conor_a" name="conor_a" defaultValue={conor_aForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="conor_b" className='label_inner_text bgc0 colfff borderfff'>
                        β=
                        <input className='w50 bgc0 colfff' type="text" id="conor_b" name="conor_b" defaultValue={conor_bForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="conor_c" className='label_inner_text bgc0 colfff borderfff'>
                        γ=
                        <input className='w50 bgc0 colfff' type="text" id="conor_c" name="conor_c" defaultValue={conor_cForm} />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className="vert_flex">
                    <div className='form-group'>
                        <label htmlFor="Square">S=
                            <input type="text" id="Square" name="Square" className='w70' defaultValue={SForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Perimeter">P=
                            <input type="text" id="Perimeter" name="Perimeter" className='w70' defaultValue={PForm} />
                        </label>
                    </div>
                </div>

                <div className="vert_flex">
                    <div className='form-group'>
                        <label htmlFor="height_l">ha=
                            <input type="text" id="height_l" name="height_l" className='w70' defaultValue={height_lForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="height_m">hb=
                            <input type="text" id="height_m" name="height_m" className='w70' defaultValue={height_mForm} />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="height_h">hc=
                            <input type="text" id="height_h" name="height_h" className='w70' defaultValue={height_hForm} />
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='form-group'>
                    <label htmlFor="inscribed_R" className='label_inner_text'>
                        r=
                        <input className='w70' type="text" id="inscribed_R" name="inscribed_R" defaultValue={inscribed_RForm} />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="described_R" className='label_inner_text'>
                        R=
                        <input className='w70' type="text" id="described_R" name="described_R" defaultValue={described_RForm} />
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