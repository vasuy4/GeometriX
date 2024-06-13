import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, calcPolygon } from '../formulas.js'


// Отображает форму трапеции
export default function TruncatedPyramidForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSideHeight = (n, a, b, d) => {
        let f = Math.sqrt(d**2-(b/2-a/2)**2)

        let [ra,Ra,Supper,Pa,angle_yy] = calcPolygon(n, a)
        let [rb,Rb,Slower,Pb,angle_y] = calcPolygon(n, b)
        let h = Math.sqrt(d**2-(Rb-Ra)**2)
        let P = n*(a+b+d)
        let Sbp = ((a+b)/4)*Math.sqrt(4*d**2-(b-a)**2)*n
        let S = Sbp+Slower+Supper
        let V = 1/3*h*(Slower+Supper+Math.sqrt(Slower*Supper))
        let betta = toDegrees(Math.acos((Math.abs(rb-ra))/f))
        let alpha = 180-betta
        let angle_z = toDegrees(Math.acos(Math.abs(Rb-Ra)/d))
        let angle_o = 180-angle_z
        return [n,a,b,h,d,f,h,P,Slower,Supper,Sbp,S,V,alpha,betta,angle_y,angle_o,angle_z]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let n = fixedNum(Number(document.getElementById('n').value))
        let a = fixedNum(Number(document.getElementById('a').value)) // сторона верхнего основания
        let b = fixedNum(Number(document.getElementById('b').value)) // сторона нижнего основания
        let d = fixedNum(Number(document.getElementById('d').value)) // ребро
        let f = fixedNum(Number(document.getElementById('f').value)) // апофема
        let h = fixedNum(Number(document.getElementById('h').value))
        let P = fixedNum(Number(document.getElementById('P').value))
        let Slower = fixedNum(Number(document.getElementById('Slower').value))
        let Supper = fixedNum(Number(document.getElementById('Supper').value))
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value))
        let S = fixedNum(Number(document.getElementById('S').value))
        let V = fixedNum(Number(document.getElementById('V').value))
        let alpha = fixedNum(Number(document.getElementById('alpha').value))
        let betta = fixedNum(Number(document.getElementById('betta').value))
        let angle_y = fixedNum(Number(document.getElementById('angle_y').value))
        let angle_o = fixedNum(Number(document.getElementById('angle_o').value))
        let angle_z = fixedNum(Number(document.getElementById('angle_z').value))

        const arrInput = [n,a,b,h,d,f,h,P,Slower,Supper,Sbp,S,V,alpha,betta,angle_y,angle_o,angle_z]
        const idInputs = ['n','a','b','h','d','f','h','P','Slower','Supper','Sbp','S','V','alpha','betta','angle_y','angle_o','angle_z']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // стороны оснований и ребро
        if (a && b && d && n >= 3){
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abd ok', 'abd bad')
        }
        // стороны оснований и высоту
        else if (a && b && h && n>=3){
            let Ra = a / (2 * Math.sin(Math.PI / n))
            let Rb = b / (2 * Math.sin(Math.PI / n))
            d = Math.sqrt(h**2+(Rb-Ra)**2)
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abh ok', 'abh bad')
        }
        // стороны оснований и апофему
        else if (a && b && f && n>=3){
            d = Math.sqrt(f**2+(b/2-a/2)**2)
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abf ok', 'abf bad')
        }
        // стороны оснований и площадь боковой поверхности
        else if (a && b && Sbp && n>=3){
            // d = Math.sqrt(-(a**2*n**2+2*a*b*n**2+b**2*n**2)*(-(a**4*n**2)/16+(a**2*b**2*n**2)/8)-(b**4*n**2)/16-Sbp**2)/((a**2*n**2)/2+a*b*n**2+(b**2*n**2)/n)
            d = Math.sqrt(a**2-2*a*b+b**2+(16*Sbp**2)/(n**2*(a+b)**2))/2
            let arrCheck = calcWithSideHeight(n, a, b, d)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'abS ok', 'abS bad')
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
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
            </div>

            <div className='form-group'>
                <label htmlFor="f">f</label>
                <input type="text" id="f" name="f" />
            </div>

            <div className='form-group'>
                <label htmlFor="h">h</label>
                <input type="text" id="h" name="h" />
            </div>

            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>

            <div className='form-group'>
                <label htmlFor="Slower">Slower</label>
                <input type="text" id="Slower" name="Slower" />
            </div>

            <div className='form-group'>
                <label htmlFor="Supper">Supper</label>
                <input type="text" id="Supper" name="Supper" />
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
                <label htmlFor="V">V</label>
                <input type="text" id="V" name="V" />
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

            <div className='form-group'>
                <label htmlFor="angle_o">angle_o</label>
                <input type="text" id="angle_o" name="angle_o" />
            </div>

            <div className='form-group'>
                <label htmlFor="angle_z">angle_z</label>
                <input type="text" id="angle_z" name="angle_z" />
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}