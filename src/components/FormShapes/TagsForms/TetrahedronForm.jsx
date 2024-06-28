import { fixedNum, toDegrees, toRadians, checkCalculate, checkBelowZero, cot } from '../formulas.js'


// Отображает форму трапеции
export default function TetrahedronForm({handleFormSubmit, selectedShape, handleClose}) {
    const calcWithSide = (a) => {
        let h2 = Math.sqrt(a**2-(a/2)**2)
        let h1 = Math.sqrt(2/3)*a
        let V = (a**3*Math.sqrt(2))/12
        let So = 1/2*a*h2
        let S = So*4
        let P = a*6
        return [a,h1,h2,V,So,S,P]
    }

    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('a').value)) // ребро
        let h1 = fixedNum(Number(document.getElementById('h1').value)) // высота тетраэдра
        let h2 = fixedNum(Number(document.getElementById('h2').value)) // высота грани тетраэдра
        let V = fixedNum(Number(document.getElementById('V').value))
        let So = fixedNum(Number(document.getElementById('So').value)) // площадь грани
        let S = fixedNum(Number(document.getElementById('S').value)) // площадь всей фигуры
        let P = fixedNum(Number(document.getElementById('P').value)) // периметр тетраэдра
        const arrInput = [a,h1,h2,V,So,S,P]
        const idInputs = ['a','h1','h2','V','So','S','P']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return
        
        // Подсчёт остальных параметров, опираясь на:
        // ребро
        if (a){
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a ok', 'a bad')
        }
        // высота тетраэдра
        else if (h1){
            a = h1/Math.sqrt(2/3)
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'h1 ok', 'h1 bad')
        }
        // высота грани тетраэдра
        else if (h2){
            a = (2*Math.sqrt(3)*Math.sqrt(h2**2))/3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'h2 ok', 'h2 bad')
        }
        // Объём
        else if(V){
            a = ((12*V)/Math.sqrt(2))**(1/3)
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'V ok', 'V bad')
        }
        // Площадь грани
        else if (So){
            a = (2*3**(3/4)*(So**2)**(1/4))/3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So ok', 'So bad')
        }
        // Площадь тетраэдра
        else if (S){
            So=S/4
            a = (2*3**(3/4)*(So**2)**(1/4))/3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S ok', 'S bad')
        }
        // Периметр тетраэдра
        else if (P){
            a = P/6
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'P ok', 'P bad')
        }
        else {
            console.log('error input')
        }
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <div className='form-group'>
                <label htmlFor="a">a</label>
                <input type="text" id="a" name="a" />
            </div>

            <div className='form-group'>
                <label htmlFor="h1">h1</label>
                <input type="text" id="h1" name="h1" />
            </div>

            <div className='form-group'>
                <label htmlFor="h2">h2</label>
                <input type="text" id="h2" name="h2" />
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
                <label htmlFor="S">S</label>
                <input type="text" id="S" name="S" />
            </div>

            <div className='form-group'>
                <label htmlFor="P">P</label>
                <input type="text" id="P" name="P" />
            </div>

            <button type="submit">Построить</button>
        </form>
    )
}