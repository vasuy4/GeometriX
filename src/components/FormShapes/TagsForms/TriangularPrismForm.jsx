import { fixedNum, perimetrTriangle, areaOfHeron, findSideTeorCos, toDegrees, toRadians, checkCalculate, checkBelowZero, findAngleTeorCos, findHeightSideArea } from '../formulas.js'


// Отображает форму трапеции
export default function TriangularPrismForm({handleFormSubmit, selectedShape, handleClose}) {
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
        let P = 2*Po + H*3 // периметр всей фигуры
        

        let Ssurface = (a+b+c)*H  // площадь боковой поверхности
        let Sfull = Ssurface + Sbase*2  // площадь полной поверхности

        let V = Sbase * H

        return [a,b,c,conor_a,conor_b,conor_c,H,ha,hb,hc,P,Sbase,Ssurface,Sfull,V]
    }

    const calcWithSideBetweenConorsPrism = (c_a, c_b, side_c, arrayconor, arraySide, H) => { 
        let [a,b,c,conor_a,conor_b,conor_c,hc,hb,ha,Sbase,Pbase,r,R] = calcWithSideBetweenConors(c_a, c_b, side_c, arrayconor, arraySide)
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
        let conor_a = fixedNum(Number(document.getElementById('conor_a').value))
        let conor_b = fixedNum(Number(document.getElementById('conor_b').value))
        let conor_c = fixedNum(Number(document.getElementById('conor_c').value))
        let H = fixedNum(Number(document.getElementById('H').value))
        let ha = fixedNum(Number(document.getElementById('height_l').value))
        let hb = fixedNum(Number(document.getElementById('height_m').value))
        let hc = fixedNum(Number(document.getElementById('height_h').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let Sbase = fixedNum(Number(document.getElementById('sbase').value))
        let Ssurface = fixedNum(Number(document.getElementById('ssurface').value))
        let Sfull = fixedNum(Number(document.getElementById('sfull').value))
        let V = fixedNum(Number(document.getElementById('volume').value))
        const arrInput = [side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, Sbase, Ssurface, Sfull, V]
        const idInputs = ['side_a', 'side_b', 'side_c', 'conor_a', 'conor_b', 'conor_c', 'H', 'height_l', 'height_m', 'height_h', 'perimeter', 'sbase', 'ssurface', 'sfull', 'volume']
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
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
        <div className='form-group'>
                <label htmlFor="side_a">a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_b">b</label>
                <input type="text" id="side_b" name="side_b" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_c">c</label>
                <input type="text" id="side_c" name="side_c" />
            </div>
            <div className='form-group'>
                <label htmlFor="conor_a">угол а</label>
                <input type="text" id="conor_a" name="conor_a" />
            </div>
            <div className='form-group'>
                <label htmlFor="conor_b">угол б</label>
                <input type="text" id="conor_b" name="conor_b" />
            </div>
            <div className='form-group'>
                <label htmlFor="conor_c">угол с</label>
                <input type="text" id="conor_c" name="conor_c" />
            </div>

            <div className='form-group'>
                <label htmlFor="H">H</label>
                <input type="text" id="H" name="H" />
            </div>

            <div className='form-group'>
                <label htmlFor="height_l">ha</label>
                <input type="text" id="height_l" name="height_l" />
            </div>
            <div className='form-group'>
                <label htmlFor="height_m">hb</label>
                <input type="text" id="height_m" name="height_m" />
            </div>
            <div className='form-group'>
                <label htmlFor="height_h">hc</label>
                <input type="text" id="height_h" name="height_h" />
            </div>
            <div className='form-group'>
                <label htmlFor="perimeter">P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>

            <div className='form-group'>
                <label htmlFor="sbase">Sо</label>
                <input type="text" id="sbase" name="sbase" />
            </div>

            <div className='form-group'>
                <label htmlFor="ssurface">Sбп</label>
                <input type="text" id="ssurface" name="ssurface" />
            </div>

            <div className='form-group'>
                <label htmlFor="sfull">Sпп</label>
                <input type="text" id="sfull" name="sfull" />
            </div>

            <div className='form-group'>
                <label htmlFor="volume">V</label>
                <input type="text" id="volume" name="volume" />
            </div>

            <button type="submit">Построить</button>
        </form>
    )
}
