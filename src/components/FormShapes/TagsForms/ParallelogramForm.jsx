import parallelogramImage from '..//formShapesImg/parallelogram.png'
import { fixedNum, toDegrees, toRadians, checkCalculate } from '../formulas.js'


// Отображает форму параллелограма
export default function ParallelogramForm({handleFormSubmit, selectedShape, handleClose}) {
    // Подсчитывает параметры, если изветны стороны и высота
    const calcParamsWithSidesHeight = (a, b, h1=0, h2=0) => {
        if (h1) h2 = (a * h1) / b
        else if (h2) h1 = (b * h2) / a

        let P = 2 * (a + b)

        let S = a * h1

        let alpha = Math.asin(h2/a)
        let betta = toRadians(180 - toDegrees(alpha))

        let diagonal1 = Math.sqrt(a**2+b**2-2*a*b*Math.cos(betta))
        let diagonal2 = Math.sqrt(a**2+b**2-2*a*b*Math.cos(alpha))

        let angle_y = Math.asin((2*S)/(diagonal1*diagonal2))
        let angle_o = toRadians(180 - toDegrees(angle_y))

        return [a, b, diagonal1, diagonal2, h1, h2, S, P, toDegrees(alpha), toDegrees(betta), toDegrees(angle_y), toDegrees(angle_o)]
    }
    
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let side_a = fixedNum(Number(document.getElementById('side_a').value))
        let side_b = fixedNum(Number(document.getElementById('side_b').value))
        let diagonal1 = fixedNum(Number(document.getElementById('diagonal1').value))
        let diagonal2 = fixedNum(Number(document.getElementById('diagonal2').value))
        let h1 = fixedNum(Number(document.getElementById('height1').value))
        let h2 = fixedNum(Number(document.getElementById('height2').value))
        let S = fixedNum(Number(document.getElementById('s').value))
        let P = fixedNum(Number(document.getElementById('perimeter').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let arrInput = [side_a, side_b, diagonal1, diagonal2, h1, h2, S, P, alpha, betta, angle_y, angle_o]
        const idInputs = ['side_a', 'side_b', 'diagonal1', 'diagonal2', 'height1', 'height2','s', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o']
        // Проверка на то, что какое то число введено меньше/равно нулю
        if ((!side_a || side_a <= 0) && (!side_b || side_b <= 0) && (!diagonal1 || diagonal1 <= 0) && (!S || S <= 0) && (!P || P <= 0) && 
        (!alpha || alpha <= 0) && (!betta || betta <= 0) && (!angle_y || angle_y <= 0) && (!angle_o || angle_o <= 0) && (!h1 || h1 <= 0) && (!h2 || h2 <= 0)){
            console.log('error under zero')
            return
        }

        // Подсчёт остальных параметров, опираясь на:
        // Стороны и высоту
        if (side_a && side_b && (h1||h2)){
            // Проверка на соотношение высоты и стороны
            if (h1){
                if (h1 > side_b){
                    console.log('error h1 > side_b')
                    return
                }
            }
            if (h2){
                if (h2 > side_a){
                    console.log('error h2 > side_a')
                    return
                }
            }
            let arrCheck = calcParamsWithSidesHeight(side_a, side_b, h1, h2)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a b h1/h2 ok', 'a b h1/h2 bad')
        }
        // Стороны и угол между ними
        else if (side_a && side_b && (alpha || betta)){
            if (alpha > 179 || betta > 179) {
                console.log('alpha/betta large value')
                return
            }
            if (betta) alpha = 180 - betta
            h2 = side_a * Math.sin(toRadians(alpha))
            let arrCheck = calcParamsWithSidesHeight(side_a, side_b, h1, h2)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a b alpha/betta ok', 'a b alpha/betta bad')
        }
        // Диагонали и угол между ними
        else if (diagonal1 && diagonal2 && (angle_o || angle_y)){
            if (angle_o > 179|| angle_y > 179) {
                console.log('angle_o/angle_y invalid value')
                return
            }
            if (angle_o) angle_y = 180 - angle_o
            else if (angle_y) angle_o = 180 - angle_o

            side_a = Math.sqrt(diagonal1**2+diagonal2**2-2*diagonal1*diagonal2*Math.cos(toRadians(angle_y)))/2
            side_b = Math.sqrt(diagonal1**2+diagonal2**2+2*diagonal1*diagonal2*Math.cos(toRadians(angle_y)))/2
            S = 1/2 * (diagonal1*diagonal2*Math.sin(toRadians(angle_y)))
            h1 = S / side_a
            h2 = S / side_b
            console.log(side_a, side_b, h1, h2)
            let arrCheck = calcParamsWithSidesHeight(side_a, side_b, h1, h2)
            // я хз почему это так, но почему то диагонали в расчёте меняются значениями. Поэтому свапаем их ещё раз
            diagonal1 = arrCheck[3]
            diagonal2 = arrCheck[2]
            arrCheck[2] = diagonal1
            arrCheck[3] = diagonal2
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd1 d2 o/y ok', 'd1 d2 o/y bad')
        }
        // Диагонали и сторону
        else if (diagonal1 && diagonal2 && (side_a || side_b)){
            if (side_a) side_b = Math.sqrt(2*diagonal1**2 + 2 * diagonal2**2 - 4*side_a**2)/2
            else if (side_b) side_a = Math.sqrt(2*diagonal1**2 + 2 * diagonal2**2 - 4*side_b**2)/2
            
            alpha = toDegrees(Math.acos((side_a**2+side_b**2-diagonal1**2)/(2*side_a*side_b)))
            S = side_a*side_b*Math.sin(toRadians(alpha))
            h1 = S/side_a
            
            let arrCheck = calcParamsWithSidesHeight(side_a, side_b, h1, h2)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'd1 d2 sides ok', 'd1 d2 sides bad')
        }
        // Высоты и угол между сторонами
        else if (h1 && h2 && (alpha || betta)){
            if (alpha > 179 || betta > 179) {
                console.log('alpha/betta invalid value')
                return
            }
            if (alpha) betta = 180 - alpha
            if (betta) alpha = 180 - betta
            side_a = h2 / Math.sin(toRadians(alpha))
            side_b = h1 / Math.sin(toRadians(alpha))

            let arrCheck = calcParamsWithSidesHeight(side_a, side_b, h1, h2)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'heights alpha/betta ok', 'heights alpha/betta bad')
        }
        // Основание и высоту, проведённую к ней
        else if (side_b && h2) {
            // Если введедны эти условия, можно найти только площадь ¯\_(ツ)_/¯
            S = side_b * h2
            // Добавить обработчик вывода информации
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
        <img src={parallelogramImage} alt='parallelogram' />
        <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="side_b">Сторона b</label>
                <input type="text" id="side_b" name="side_b" />
            </div>
            
            <div className='form-group'>
                <label htmlFor="diagonal1">Диагональ d1</label>
                <input type="text" id="diagonal1" name="diagonal1" />
            </div>

            <div className='form-group'>
                <label htmlFor="diagonal2">Диагональ d2</label>
                <input type="text" id="diagonal2" name="diagonal2" />
            </div>

            <div className='form-group'>
                <label htmlFor="height1">Высота h1</label>
                <input type="text" id="height1" name="height1" />
            </div>

            <div className='form-group'>
                <label htmlFor="height2">Высота h2</label>
                <input type="text" id="height2" name="height2" />
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