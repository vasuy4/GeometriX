import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function TruncatedConeForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithRadiusL = (R, r, l) => {
        let h = Math.sqrt(l**2-(R-r)**2)
        let V = Math.PI*h/3*(R**2+r*R+r**2)
        let Slower = Math.PI*R**2
        let Supper = Math.PI*r**2
        let Sbp = Math.PI*l*(R+r)
        let S = Slower+Supper+Sbp
        let betta = toDegrees(Math.acos((R-r)/l))
        let alpha = 180-betta

        return [r,R,l,h,V,Slower,Supper,Sbp,S,alpha,betta]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let r = fixedNum(Number(document.getElementById('r').value)) // радиус нижнего основания
        let R = fixedNum(Number(document.getElementById('R').value)) 
        let l = fixedNum(Number(document.getElementById('l').value)) // образующая
        let h = fixedNum(Number(document.getElementById('h').value)) // высота
        let V = fixedNum(Number(document.getElementById('V').value))
        let Slower = fixedNum(Number(document.getElementById('Slower').value)) // площадь нижнего основания
        let Supper = fixedNum(Number(document.getElementById('Supper').value)) // площадь верхнего основания
        let Sbp = fixedNum(Number(document.getElementById('Sbp').value)) // площадь боковой поверхности
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let alpha = fixedNum(Number(document.getElementById('alpha').value)) // угол раствора
        let betta = fixedNum(Number(document.getElementById('betta').value)) // угол между образующей и основанием
        const arrInput = [r,R,l,h,V,Slower,Supper,Sbp,S,alpha,betta]
        const idInputs = ['r','R','l','h','V','Slower','Supper','Sbp','S','alpha','betta']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // радиусы оснований и образующую
        if (R && r && l){
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rl ok', 'rl bad')
        }
        // радиусы и высоту
        else if (R && r && h){
            let l = Math.sqrt(h**2+(R-r)**2)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'rh ok', 'rh bad')
        }
        // площади оснований и образующую
        else if (Slower && Supper && l){
            let R = Math.sqrt(Slower/Math.PI)
            let r = Math.sqrt(Supper/Math.PI)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'SSl ok', 'SSl bad')
        }
        // площади оснований и высоту
        else if (Slower && Supper && h){
            let R = Math.sqrt(Slower/Math.PI)
            let r = Math.sqrt(Supper/Math.PI)
            let l = Math.sqrt(h**2+(R-r)**2)
            let arrCheck = calcWithRadiusL(R, r, l)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'SSh ok', 'SSh bad')
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
                <label htmlFor="R">R</label>
                <input type="text" id="R" name="R" />
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