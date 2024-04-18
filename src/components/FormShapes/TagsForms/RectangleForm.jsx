import rectImage from '..//formShapesImg/rectangle.png'

// Отображает форму прямоугольника
export default function RectangleForm({handleFormSubmit, selectedShape, handleClose}) {
    // Округление числа
    const fixedNum = (num) => {
        if (num.toFixed(4) === num){
            return Number(num)
        }
        else if (!num) {
            return 0
        }
        else {
            return Number(num.toFixed(4))
        }
    }
    
    // Подсчёт параметров при известных а и б
    const calculateParameters = (side_a, side_b) => {
        let inputElement;
        let result = []

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

    // Обработчик изменения зависимых переменных
    const handleInputChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value;
        let inputElement;
        let side_b
        let side_a
        let d
        switch (inputName) {
            case 'side_a':
                side_b = Number(document.getElementById('side_b').value)
                side_a = Number(inputValue)
                if (side_b) {
                    calculateParameters(side_a, side_b)
                }
                break
            case'side_b':
                side_a = Number(document.getElementById('side_a').value)
                side_b = Number(inputValue)
                if (side_a) {
                    calculateParameters(side_a, side_b)
                }
                break
            case 'diameter':
                side_a = Number(document.getElementById('side_a').value)
                side_b = Number(document.getElementById('side_b').value)
                d = Number(inputValue)
                if ((side_a && side_b) || (!side_a && side_b)) {
                    inputElement = document.getElementById('side_a')
                    side_a = Math.sqrt(d * d - side_b * side_b)
                    inputElement.value = side_a
                }
                else if (side_a && !side_b) {
                    inputElement = document.getElementById('side_b')
                    side_b = Math.sqrt(d * d - side_a * side_a)
                    inputElement.value = side_b
                }
            default:
                return null
        }
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
        let ca, cb, cd, cS, cP, calpha, cbetta, cangle_y, cangle_o;
        let arrCheck

        // Проверка остальных переменных, если введены только а и б
        if (side_a && side_b){
            arrCheck = calculateParameters(side_a, side_b)
            cd = arrCheck[0]
            cS = arrCheck[1]
            cP = arrCheck[2]
            calpha = arrCheck[3]
            cbetta = arrCheck[4]
            cangle_y = arrCheck[5]
            cangle_o = arrCheck[6]
            if ((!diameter || cd === diameter) && (!S || cS === S) && (!P || cP === P) && (!alpha || calpha === alpha) && (!betta || cbetta === betta) && (!angle_y || cangle_y === angle_y) && (!angle_o || cangle_o === angle_o)) {
                console.log('ok')
                handleFormSubmit(event, shape)
            }
        }
        // Если известна площадь и сторона
        else if (S && (side_a || side_b)) {
            return
        }
        // Если известна диагональ и сторона
        else if (diameter && (side_a || side_b)) {
            return
        }
        // Если известен периметр и диагональ
        else if (P && diameter) {
            
        }
        // Если известен угол между диагоналями
        else if (diameter && (alpha || betta)) {

        }
        // Если известен угол от диагонали
        else if (diameter && (angle_y || angle_o)) {
            
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
                <label htmlFor="diameter">Диагональ</label>
                <input type="text" id="diameter" name="diameter" />
            </div>
            
            <div className='form-group'>
                <label htmlFor="s">Площадь</label>
                <input type="text" id="s" name="s" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">Периметр</label>
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


            <div className='form-group'>
                <label htmlFor="points">Точка размещения</label>
                <select name="points" id="points" defaultValue="O">
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="x">x</label>
                <input type="text" id="x" name="x" defaultValue="0"/>
            </div>
            <div className='form-group'>
                <label htmlFor="y">y</label>
                <input type="text" id="y" name="y" defaultValue="0"/>
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}