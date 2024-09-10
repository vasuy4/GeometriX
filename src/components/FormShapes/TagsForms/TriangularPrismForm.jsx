import { fixedNum, perimetrTriangle, areaOfHeron, findSideTeorCos, toDegrees, toRadians, checkCalculate, checkBelowZero, findAngleTeorCos, findHeightSideArea } from '../formulas.js'
import triangularPrism from '../formShapesImg/triangularPrism.svg'

// Отображает форму трапеции
export default function TriangularPrismForm({ handleFormSubmit, selectedShape, handleClose }) {
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

        return array;

    }


    const calcWithSidesHeight = (a, b, c, H) => {
        let conor_a = toDegrees(findAngleTeorCos(a, b, c)) // углы треугольника
        let conor_b = toDegrees(findAngleTeorCos(b, a, c))
        let conor_c = toDegrees(findAngleTeorCos(c, b, a))

        let Sbase = areaOfHeron(a, b, c) // площадь основания 
        let hc = findHeightSideArea(c, Sbase) // высоты треугольника
        let hb = findHeightSideArea(b, Sbase)
        let ha = findHeightSideArea(a, Sbase)

        let Po = perimetrTriangle(a, b, c) //периметр основания
        let P = 2 * Po + H * 3 // периметр всей фигуры


        let Ssurface = (a + b + c) * H  // площадь боковой поверхности
        let Sfull = Ssurface + Sbase * 2  // площадь полной поверхности

        let V = Sbase * H

        return [a, b, c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, Sbase, Ssurface, Sfull, V]
    }

    const calcWithSideBetweenConorsPrism = (c_a, c_b, side_c, arrayconor, arraySide, H) => {
        let [a, b, c, conor_a, conor_b, conor_c, hc, hb, ha, Sbase, Pbase, r, R] = calcWithSideBetweenConors(c_a, c_b, side_c, arrayconor, arraySide)
        return calcWithSidesHeight(a, b, c, H)
    }

    const calcWithTwosidesAndCorner = (s_a, s_b, c_c, arrayconor, arraySide, H) => {
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

        return calcWithSidesHeight(array[0], array[1], array[2], H);

    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let side_c = fixedNum(Number(document.getElementById('side_c').value))
        let H = fixedNum(Number(document.getElementById('H').value))
        let conor_a = fixedNum(Number(document.getElementById('conor_a').value))
        let conor_b = fixedNum(Number(document.getElementById('conor_b').value))
        let conor_c = fixedNum(Number(document.getElementById('conor_c').value))

        let ha = fixedNum(Number(document.getElementById('height_l').value))
        let hb = fixedNum(Number(document.getElementById('height_m').value))
        let hc = fixedNum(Number(document.getElementById('height_h').value))
        let Sbase = fixedNum(Number(document.getElementById('sbase').value))
        let Ssurface = fixedNum(Number(document.getElementById('ssurface').value))
        let Sfull = fixedNum(Number(document.getElementById('sfull').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))

        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, Sbase, Ssurface, Sfull, V]
        const idInputs = ['side_a', 'side_b', 'side_c', 'H', 'conor_a', 'conor_b', 'conor_c', 'height_l', 'height_m', 'height_h', 'sbase', 'ssurface', 'sfull', 'perimeter', 'volume']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return


        // Подсчёт остальных параметров, опираясь на:
        // три стороны основания и высоту
        if (side_a && side_b && side_c && H) {
            let arrCheck = calcWithSidesHeight(side_a, side_b, side_c, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abc h ok', 'abc h bad')
            return
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

        if (counterConor >= 2 && counterSides >= 1 && H) { //два угла и сторону
            //сторона между углами
            let arrCheck = calcWithSideBetweenConorsPrism(arrInput[arrayconor[0] + 3], arrInput[arrayconor[1] + 3], arrInput[arraySide[0]], arrayconor, arraySide, H)//чтобы знать что уже заполнено
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'angles side H ok', 'angles side H bad')
            return;
        }

        if (counterConor == 1 && counterSides == 2 && H) {//две стороны и угол

            let arrCheck = calcWithTwosidesAndCorner(arrInput[arraySide[0]], arrInput[arraySide[1]], arrInput[arrayconor[0] + 3], arrayconor, arraySide)//чтобы знать что уже заполнено
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides angle ok', 'sides angle bad')

            return;
        }
    }


    return (
        <div className="form-container">
            <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
                <img className="triangularPrism" src={triangularPrism} alt='triangularPrism' />
                <p className='subtitle mt0'>Сторона треугольной призмы</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="side_a" className='label_inner_text'>
                            a=
                            <input className='w50' type="text" id="side_a" name="side_a" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="side_b" className='label_inner_text'>
                            b=
                            <input className='w50' type="text" id="side_b" name="side_b" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="side_c" className='label_inner_text'>
                            c=
                            <input className='w50' type="text" id="side_c" name="side_c" />
                        </label>
                    </div>
                </div>


                <p className='subtitle mt0'>Высота треугольной призмы</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="H" className='label_inner_text'>
                            h =
                            <input className='labela w230' type="text" id="H" name="H" />
                        </label>
                    </div>
                </div>

                <p className='subtitle mt0'>Углы основания треуг. призмы</p>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="conor_a" className='label_inner_text bgc0 colfff borderfff'>
                            a=
                            <input className='w70 bgc0 colfff' type="text" id="conor_a" name="conor_a" />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="conor_b" className='label_inner_text bgc0 colfff borderfff'>
                            b=
                            <input className='w70 bgc0 colfff' type="text" id="conor_b" name="conor_b" />
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className='form-group'>
                        <label htmlFor="conor_c" className='label_inner_text bgc0 colfff borderfff'>
                            c =
                            <input className='w230 bgc0 colfff' type="text" id="conor_c" name="conor_c" />
                        </label>
                    </div>
                </div>


                <div className='form-group row'>
                    <label htmlFor="height_l">ha=</label>
                    <input className='w220' type="text" id="height_l" name="height_l" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="height_m">hb=</label>
                    <input className='w220' type="text" id="height_m" name="height_m" />
                </div>
                <div className='form-group row'>
                    <label htmlFor="height_h">hc=</label>
                    <input className='w220' type="text" id="height_h" name="height_h" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="sbase">So=</label>
                    <input className='w220' type="text" id="sbase" name="sbase" />
                </div>
                <div className='form-group row'>
                    <label htmlFor="ssurface">Sбп=</label>
                    <input className='w220' type="text" id="ssurface" name="ssurface" />
                </div>




                <div className='form-group row'>
                    <label htmlFor="sfull">Sпп=</label>
                    <input className='w220' type="text" id="sfull" name="sfull" />
                </div>
                <div className='form-group row'>
                    <label htmlFor="perimeter">P=</label>
                    <input className='w220' type="text" id="perimeter" name="perimeter" />
                </div>

                <div className='form-group row'>
                    <label htmlFor="volume">V=</label>
                    <input className='w220' type="text" id="volume" name="volume" />
                </div>

                <div className="row">
                    <button type="submit" className="sFormText">Построить</button>
                    <button onClick={handleClose} className="sFormText">Закрыть</button>
                </div>
            </form>
        </div>
    )



}
