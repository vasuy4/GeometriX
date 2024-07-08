import rectImage from '..//formShapesImg/rectangle.svg'
import { toRadians, fixedNum, checkCalculate } from '../formulas.js'

// Отображает форму прямоугольника
export default function RectangleForm({handleFormSubmit, selectedShape, handleClose}) {
    // Подсчёт параметров при известных а и б
    const calculateParametersWithSides = (side_a, side_b) => {
        let result = [fixedNum(side_a), fixedNum(side_b)]

        let d = fixedNum(Math.sqrt(side_a * side_a + side_b * side_b))
        result.push(d)

        let S = fixedNum(side_a * side_b)
        result.push(S)

        let P = fixedNum((side_a + side_b) * 2)
        result.push(P)
        
        let forAsin = fixedNum((2 * S) / (d * d))
        let alpha = fixedNum(Math.asin(forAsin) * 180 / Math.PI)
        result.push(alpha)

        let betta = fixedNum((360 - alpha * 2) / 2)
        result.push(betta)

        let angle_y = fixedNum((180 -alpha) / 2)
        result.push(angle_y)

        let angle_o = fixedNum((180 - betta) / 2)
        result.push(angle_o)
        return result
    }

    // Подсчёт параметров при известных стороне и площади.
    const calculateParametersWithSideSquare = (side, S, famous_side) => {
        let side_a
        let side_b
        // Если известна сторона а
        if (famous_side === 'a') {
            side_a = side
            side_b = S / side
        }
        // Если известна сторона б
        else if (famous_side === 'b') {
            side_a = S / side
            side_b = side
        }
        else {
            return null
        }
        let arrResult = []
        const arrCalc = calculateParametersWithSides(side_a, side_b)
        for (let i = 0; i < arrCalc.length; i++) {
            arrResult.push(arrCalc[i])
        }
        return arrResult
    }

    // Подсчёт при известных стороне и диаметра.
    const calculateParametersWithDiameterSide = (side, d, famous_side) => {
        let side_a
        let side_b
        if (famous_side === 'a') {
            side_a = side
            side_b = Math.sqrt(d * d - side_a * side_a)
        }
        else if (famous_side === 'b') {
            side_b = side
            side_a = Math.sqrt(d*d-side_b*side_b)
        }
        let arrResult = []
        const arrCalc = calculateParametersWithSides(side_a, side_b)
        for (let i = 0; i < arrCalc.length; i++) {
            arrResult.push(arrCalc[i])
        }
        return arrResult
    }
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, shape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let diameter = fixedNum(Number(document.getElementById('diameter').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let arrInput = [side_a, side_b, diameter, S, P, alpha, betta, angle_y, angle_o]
        let ca, cb, cd, cS, cP, calpha, cbetta, cangle_y, cangle_o;
        let arrCheck
        const idInputs = ['side_a','side_b', 'diameter', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o']
        if ((!side_a || side_a <= 0) && (!side_b || side_b <= 0) && (!diameter || diameter <= 0) && (!S || S <= 0) && (!P || P <= 0) && (!alpha || alpha <= 0) && (!betta || betta <= 0) && (!angle_y || angle_y <= 0) && (!angle_o || angle_o <= 0)){
            console.log('error under zero')
            return
        }

        // Проверка остальных переменных, если введены только а и б
        if (side_a && side_b){
            arrCheck = calculateParametersWithSides(side_a, side_b)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'sides ok', 'sides error')
        }
        // Если известна площадь и сторона
        else if (S && (side_a || side_b)) {
            // Если известна a
            if (side_a && ((side_a >= 0 && side_a < S) || (side_a <= 0 && side_a > S))) {
                arrCheck = calculateParametersWithSideSquare(side_a, S, 'a')
            }
            else if (side_b && ((side_b >= 0 && side_b < S) || (side_b <= 0 && side_b > S))) {
                arrCheck = calculateParametersWithSideSquare(side_b, S, 'b')
            }
            else {
                console.log('error side_a/b >= S')
                return
            }
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S sq ok', 'S sq error')
        }
        // Если известна диагональ и сторона
        else if (diameter && (side_a || side_b)) {
            if (side_a && side_a < diameter) {
                arrCheck = calculateParametersWithDiameterSide(side_a, diameter, 'a')
            }
            else if (side_b && side_b < diameter) {
                arrCheck = calculateParametersWithDiameterSide(side_b, diameter, 'b')
            }
            else {
                console.log('error side_a/b >= d')
                return
            }
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd side ok', 'd side error')
        }
        // Если известен периметр и диагональ
        else if (P && diameter) {
            side_a = fixedNum(P/4 + (Math.sqrt(8*diameter*diameter-P*P))/4)
            if (side_a && side_a < diameter){
                arrCheck = calculateParametersWithDiameterSide(side_a, diameter, 'a')
            }
            else {
                console.log('error side_a > d or d too small')
                return
            }
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd P ok', 'd P error')
        }
        // Если известен угол между диагоналями и диагональ
        else if (diameter && (alpha || betta)) {
            if ((alpha && (0 >= alpha || alpha >= 180)) || (betta && (0>=betta || betta >= 180))) {
                console.log('angles error [0, 180]')
                return
            }
            let angle
            if (alpha) angle = alpha
            else if (betta) angle = 180 - betta
            side_a = fixedNum(diameter * Math.cos(toRadians((180-angle)/ 2)))
            if (side_a && side_a < diameter){
                arrCheck = calculateParametersWithDiameterSide(side_a, diameter, 'a')
            }
            else {
                console.log('error side_a > d or d too small')
                return
            }
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha/betta diagonal ok', 'alpha/betta diagonal error')
        }

        // Если известен угол от диагонали и диагональ
        else if (diameter && (angle_y || angle_o)) {
            if (angle_y) side_a = fixedNum(diameter * Math.cos(toRadians(angle_y)))
            else if (angle_o) side_a = fixedNum(diameter * Math.sin(toRadians(angle_o)))
            if (side_a && side_a < diameter){
                arrCheck = calculateParametersWithDiameterSide(side_a, diameter, 'a')
            }
            else {
                console.log("error side_a > d")
            }
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'angle_y/angle_o diagonal ok', 'angle_y/angle_o diagonal error')
        }
        else {
            console.log('error')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <img src={rectImage} alt='rectangle' />
            <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_b">Сторона b</label>
                <input type="text" id="side_b" name="side_b" />
            </div>
            
            <div className='form-group'>
                <label htmlFor="diameter">Диагональ d</label>
                <input type="text" id="diameter" name="diameter" />
            </div>
            
            <div className='form-group'>
                <label htmlFor="s">Площадь S</label>
                <input type="text" id="s" name="s" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">Периметр P</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>


            <div className='form-group'>
                <label htmlFor="alpha">Угол α</label>
                <input type="text" id="alpha" name="alpha" />
            </div>

            <div className='form-group'>
                <label htmlFor="betta">Угол β</label>
                <input type="text" id="betta" name="betta" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_y">Угол γ</label>
                <input type="text" id="angle_y" name="angle_y" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_o">Угол δ</label>
                <input type="text" id="angle_o" name="angle_o" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}