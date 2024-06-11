import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, calcPolygon } from '../formulas.js'


// Отображает форму трапеции
export default function PolygonalPyramidForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSideHeight = (n, a, H) => {
        let [r,R,So,Po,alpha] = calcPolygon(n,a)
        let b = Math.sqrt(R**2+H**2)
        let h = Math.sqrt(r**2+H**2)
        let V = 1/3*(So*H)
        let Sbp = 1/2*(Po*h)
        let S = Sbp+So
        let betta = toDegrees(Math.asin(H/h))
        let angle_y = toDegrees(Math.asin(H/b))
        let P = Po+b*n
        return [n,a,b,h,H,r,R,V,So,Sbp,S,P,alpha,betta,angle_y]
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
        if (a && H && n >= 3){
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'aH ok', 'aH bad')
        }
        // ребро и сторону основания
        else if (b && a && n >= 3){
            R = a / (2 * Math.sin(Math.PI / n))
            H = Math.sqrt(b**2-R**2)
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'ab ok', 'ab bad')
        }
        // апофему и сторону основания
        else if (h && a && n >= 3){
            b = Math.sqrt(h**2+(a/2.0)**2)
            R = a / (2 * Math.sin(Math.PI / n))
            H = Math.sqrt(b**2-R**2)
            let arrCheck = calcWithSideHeight(n, a, H)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'ah ok', 'ah bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <div className='form-group'>
                <label htmlFor="n">n</label>
                <input type="text" id="n" name="n" />
            </div>

            <div className='form-group'>
                <label htmlFor="a">a</label>
                <input type="text" id="a" name="a" />
            </div>

            <div className='form-group'>
                <label htmlFor="b">b</label>
                <input type="text" id="b" name="b" />
            </div>

            <div className='form-group'>
                <label htmlFor="h">h</label>
                <input type="text" id="h" name="h" />
            </div>

            <div className='form-group'>
                <label htmlFor="H">H</label>
                <input type="text" id="H" name="H" />
            </div>

            <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>

            <div className='form-group'>
                <label htmlFor="R">R</label>
                <input type="text" id="R" name="R" />
            </div>

            <div className='form-group'>
                <label htmlFor="V">V</label>
                <input type="text" id="V" name="V" />
            </div>

            <div className='form-group'>
                <label htmlFor="So">So</label>
                <input type="text" id="So" name="So" />
            </div>

            <div className='form-group'>
                <label htmlFor="Sbp">Sbp</label>
                <input type="text" id="Sbp" name="Sbp" />
            </div>

            <div className='form-group'>
                <label htmlFor="S">S</label>
                <input type="text" id="S" name="S" />
            </div>

            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>

            <div className='form-group'>
                <label htmlFor="alpha">alpha</label>
                <input type="text" id="alpha" name="alpha" />
            </div>

            <div className='form-group'>
                <label htmlFor="betta">betta</label>
                <input type="text" id="betta" name="betta" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_y">angle_y</label>
                <input type="text" id="angle_y" name="angle_y" />
            </div>

            <button type="submit">Построить</button>
        </form>
    )
}