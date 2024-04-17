import rectImage from '..//formShapesImg/rectangle.png'

// Отображает форму прямоугольника
export default function RectangleForm({handleFormSubmit, selectedShape, handleClose}) {
    // Округление числа
    const fixedNum = (num) => {
        if (num.toFixed(4) === num){
            return num
        }
        else {
            return num.toFixed(4)
        }
    }
    
    // Подсчёт параметров при известных а и б
    const calculateParameters = (side_a, side_b, inputElement) => {
        inputElement = document.getElementById('perimeter')
        let P = fixedNum((side_a + side_b) * 2)
        inputElement.value = P

        inputElement = document.getElementById('s')
        let S = fixedNum(side_a * side_b)
        inputElement.value = S

        inputElement = document.getElementById('diameter')
        let d = fixedNum(Math.sqrt(side_a * side_a + side_b * side_b))
        inputElement.value = d

        inputElement = document.getElementById('alpha')
        let forAsin = fixedNum((2 * S) / (d * d))
        let alpha = fixedNum(Math.asin(forAsin) * 180 / Math.PI)
        inputElement.value = alpha

        inputElement = document.getElementById('betta')
        let betta = fixedNum((360 - alpha * 2) / 2)
        inputElement.value = betta

        inputElement = document.getElementById('angle_y')
        let angle_y = fixedNum((180 -alpha) / 2)
        inputElement.value = angle_y

        inputElement = document.getElementById('angle_o')
        let angle_o = fixedNum((180 - betta) / 2)
        inputElement.value = angle_o
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
                    calculateParameters(side_a, side_b, inputElement)
                }
                break
            case'side_b':
                side_a = Number(document.getElementById('side_a').value)
                side_b = Number(inputValue)
                if (side_a) {
                    calculateParameters(side_a, side_b, inputElement)
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

    return (
        <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <img src={rectImage} alt='rectangle' />
            <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
                <label htmlFor="side_b">Сторона b</label>
                <input type="text" id="side_b" name="side_b" onChange={handleInputChange}/>
            </div>
            
            <div className='form-group'>
                <label htmlFor="diameter">Диагональ</label>
                <input type="text" id="diameter" name="diameter" onChange={handleInputChange}/>
            </div>
            
            <div className='form-group'>
                <label htmlFor="s">Площадь</label>
                <input type="text" id="s" name="s" onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">Периметр</label>
                <input type="text" id="perimeter" name="perimeter" onChange={handleInputChange}/>
            </div>


            <div className='form-group'>
                <label htmlFor="alpha">Угол α</label>
                <input type="text" id="alpha" name="alpha" onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
                <label htmlFor="betta">Угол β</label>
                <input type="text" id="betta" name="betta" onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
                <label htmlFor="angle_y">Угол γ</label>
                <input type="text" id="angle_y" name="angle_y" onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
                <label htmlFor="angle_o">Угол δ</label>
                <input type="text" id="angle_o" name="angle_o" onChange={handleInputChange}/>
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