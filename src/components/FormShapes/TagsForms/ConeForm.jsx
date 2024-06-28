import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function ConeForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithRadiusL = (r, l) => {
        let d = r*2
        let h = Math.sqrt(l**2-r**2)
        let P = 2*Math.PI*r
        let So = Math.PI*r**2
        let Sbp = Math.PI*r*l
        let S = So+Sbp
        let V = 1/3*(So*h)
        let betta = toDegrees(Math.asin(h/l))
        let alpha = 180 - 2*betta
        return [r,d,l,h,V,So,Sbp,S,P,alpha,betta]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус основания
        let d = fixedNum(Number(document.getElementById('d').value)) // радиус основания
        let l = fixedNum(Number(document.getElementById('l').value)) // образующая
        let h = fixedNum(Number(document.getElementById('h').value)) // высота
        let V = fixedNum(Number(document.getElementById('V').value))
        let So = fixedNum(Number(document.getElementById('So').value)) // площадь основания
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value)) // площадь боковой поверхности
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let P = fixedNum(Number(document.getElementById('P').value)) // периметр основания
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол раствора
        let betta = fixedNum(Number(document.getElementById('betta').value)) // угол между образующей и основанием
        const arrInput = [r,d,l,h,V,So,Sbp,S,P,alpha,betta]
        const idInputs = ['r','d','l','h','V','So','Sbp','S','P','alpha','betta']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // радиус основания и образующую
        if (r && l){
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rl ok', 'rl bad')
        }
        // радиус и высоту
        else if (r && h){
            l = Math.sqrt(r**2+h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rh ok', 'rh bad')
        }
        // образующую и высоту
        else if (h && l) {
            r = Math.sqrt(l**2-h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'lh ok', 'lh bad')
        }
        // объём и высоту
        else if (V && h){
            So = (3*V)/h
            r = Math.sqrt(So/Math.PI)
            l = Math.sqrt(r**2+h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'Vh ok', 'Vh bad')
        }
        // угол раствора и образующую
        else if (alpha && l){
            r = Math.sin(toRadians(alpha/2))*l
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha l ok', 'alpha l bad')
        }
        // угол раствора и высоту
        else if (alpha && h){
            r = Math.sin(toRadians(alpha/2))*l
            l = Math.sqrt(r**2+h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha h ok', 'alpha h bad')
        }
        // угол раствора и радиус
        else if (alpha && r){
            h = r/Math.tan(toRadians(alpha/2))
            l = Math.sqrt(r**2+h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'alpha r ok', 'alpha r bad')
        }
        // Площадь основания и образующую
        else if (So && l){
            r = Math.sqrt(So/Math.PI)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So l ok', 'So l bad')
        }
        // Площадь основания и высоту
        else if (So && h){
            r = Math.sqrt(So/Math.PI)
            l = Math.sqrt(r**2+h**2)
            let arrCheck = calcWithRadiusL(r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So h ok', 'So h bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <div className='form-group'>
                <label htmlFor="r">r</label>
                <input type="text" id="r" name="r" />
            </div>

            <div className='form-group'>
                <label htmlFor="d">d</label>
                <input type="text" id="d" name="d" />
            </div>

            <div className='form-group'>
                <label htmlFor="l">l</label>
                <input type="text" id="l" name="l" />
            </div>

            <div className='form-group'>
                <label htmlFor="h">h</label>
                <input type="text" id="h" name="h" />
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

            <button type="submit">Построить</button>
        </form>
    )
}