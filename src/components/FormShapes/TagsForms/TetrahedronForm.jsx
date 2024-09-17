import { fixedNum, checkCalculate, checkBelowZero } from '../formulas.js'
import tetrahedron from '../formShapesImg/tetrahedron.svg'
import { dictTranslate } from '../../../Pages/WorkbenchPage/data.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Отображает форму трапеции
export default function TetrahedronForm({ handleFormSubmit, selectedShape, handleClose, updateFigure, handleOptionsClick }) {
    const translateShape = dictTranslate[selectedShape];

    const calcWithSide = (a) => {
        let h2 = Math.sqrt(a ** 2 - (a / 2) ** 2)
        let h1 = Math.sqrt(2 / 3) * a
        let V = (a ** 3 * Math.sqrt(2)) / 12
        let So = 1 / 2 * a * h2
        let S = So * 4
        let P = a * 6
        return [a, h1, h2, V, So, S, P]
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
        const arrInput = [a, h1, h2, V, So, S, P]
        const idInputs = ['a', 'h1', 'h2', 'V', 'So', 'S', 'P']
        // Проверка на то, что какое то число введено менише/равно нулю
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        // Подсчёт остальных параметров, опираясь на:
        // ребро
        if (a) {
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'a ok', 'a bad')
        }
        // высота тетраэдра
        else if (h1) {
            a = h1 / Math.sqrt(2 / 3)
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'h1 ok', 'h1 bad')
        }
        // высота грани тетраэдра
        else if (h2) {
            a = (2 * Math.sqrt(3) * Math.sqrt(h2 ** 2)) / 3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'h2 ok', 'h2 bad')
        }
        // Объём
        else if (V) {
            a = ((12 * V) / Math.sqrt(2)) ** (1 / 3)
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'V ok', 'V bad')
        }
        // Площадь грани
        else if (So) {
            a = (2 * 3 ** (3 / 4) * (So ** 2) ** (1 / 4)) / 3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'So ok', 'So bad')
        }
        // Площадь тетраэдра
        else if (S) {
            So = S / 4
            a = (2 * 3 ** (3 / 4) * (So ** 2) ** (1 / 4)) / 3
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'S ok', 'S bad')
        }
        // Периметр тетраэдра
        else if (P) {
            a = P / 6
            let arrCheck = calcWithSide(a)
            checkCalculate(handleFormSubmit, event, selectedShape, arrInput, arrCheck, idInputs, 'P ok', 'P bad')
        }
        else {
            toast.error('Ошибка ввода данных');
            console.log('error input')
        }
    }


    let aForm = 3, h1Form = null, h2Form = null, VForm = null, SoForm = null, SForm = null, PForm = null;

if (updateFigure != null) {
    aForm = updateFigure.formValues[0];    // Присваиваем значение для переменной 'a'
    h1Form = updateFigure.formValues[1];   // Присваиваем значение для переменной 'h1'
    h2Form = updateFigure.formValues[2];   // Присваиваем значение для переменной 'h2'
    VForm = updateFigure.formValues[3];    // Присваиваем значение для переменной 'V'
    SoForm = updateFigure.formValues[4];   // Присваиваем значение для переменной 'So'
    SForm = updateFigure.formValues[5];    // Присваиваем значение для переменной 'S'
    PForm = updateFigure.formValues[6];    // Присваиваем значение для переменной 'P'
}



return (
    <div className="form-container">
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
            <p>{translateShape[0].toUpperCase() + translateShape.slice(1, translateShape.length)}</p>

            <img src={tetrahedron} alt='tetrahedron' />
            <p className='subtitle mt0'> Ребро</p>
            <div className="row">
                <div className='form-group'>
                    <label htmlFor="a" className='label_inner_text'>
                        a =
                        <input className='labela w230' type="text" id="a" name="a" defaultValue={aForm} />
                    </label>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor="h1">ha=</label>
                <input type="text" id="h1" name="h1" className='w220' defaultValue={h1Form} />
            </div>
            <div className='form-group row'>
                <label htmlFor="h2">hb=</label>
                <input type="text" id="h2" name="h2" className='w220' defaultValue={h2Form} />
            </div>

            <div className='form-group row'>
                <label htmlFor="V">V=</label>
                <input type="text" id="V" name="V" className='w220' defaultValue={VForm} />
            </div>
            <div className='form-group row'>
                <label htmlFor="So">So=</label>
                <input type="text" id="So" name="So" className='w220' defaultValue={SoForm} />
            </div>

            <div className='form-group row'>
                <label htmlFor="S">Sпп=</label>
                <input type="text" id="S" name="S" className='w220' defaultValue={SForm} />
            </div>
            <div className='form-group row'>
                <label htmlFor="P">P=</label>
                <input type="text" id="P" name="P" className='w220' defaultValue={PForm} />
            </div>

            <div className="row">
                {!updateFigure && <button type="submit" className="sFormText">Построить</button>}
                <button onClick={handleClose} className="sFormText">Закрыть</button>
            </div>
        </form>
    </div>
);


}