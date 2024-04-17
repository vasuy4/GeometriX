import squareImage from '..//formShapesImg/square.png';


// Отображает форму квадрата
export default function SquareForm({handleFormSubmit, selectedShape, handleClose}){
    // Округление числа
    const fixedNum = (num) => {
        if (num.toFixed(4) === num){
            return num
        }
        else {
            return num.toFixed(4)
        }
    }
    
    // Обработчик изменения зависимых переменных
    const handleInputChange = (event) => {
        const inputName = event.target.name
        let inputValue = event.target.value;
        let inputElement;
        let a;
        if (inputValue && inputValue <= 0){
            event.target.value = 1
            inputValue = 1
        }
        switch (inputName) {
            case 'side_a':
                inputElement = document.getElementById('diameter');
                inputElement.value = fixedNum(inputValue * Math.sqrt(2));

                inputElement = document.getElementById('s');
                inputElement.value = fixedNum(inputValue * inputValue);
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = fixedNum(inputValue * 4);

                inputElement = document.getElementById('r');
                inputElement.value = fixedNum(inputValue / 2);
                break
            case 'diameter':
                a = inputValue / Math.sqrt(2);
                inputElement = document.getElementById('side_a');
                inputElement.value = fixedNum(a);

                inputElement = document.getElementById('s');
                inputElement.value = fixedNum(a * a);
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = fixedNum(a * 4);

                inputElement = document.getElementById('r');
                inputElement.value = fixedNum(a / 2);
                break
            case 's':
                a = Math.sqrt(inputValue)
                inputElement = document.getElementById('side_a');
                inputElement.value = fixedNum(a);

                inputElement = document.getElementById('diameter');
                inputElement.value = fixedNum(a * Math.sqrt(2));
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = fixedNum(a * 4);

                inputElement = document.getElementById('r');
                inputElement.value = fixedNum(a / 2);
                break
            case 'perimeter':
                a = inputValue / 4
                inputElement = document.getElementById('side_a');
                inputElement.value = fixedNum(a);

                inputElement = document.getElementById('diameter');
                inputElement.value = fixedNum(a * Math.sqrt(2));
                
                inputElement = document.getElementById('s');
                inputElement.value = fixedNum(a * a);

                inputElement = document.getElementById('r');
                inputElement.value = fixedNum(a / 2);
                break
            case 'r':
                a = inputValue * 2
                inputElement = document.getElementById('side_a');
                inputElement.value = fixedNum(a);

                inputElement = document.getElementById('diameter');
                inputElement.value = fixedNum(a * Math.sqrt(2));
                
                inputElement = document.getElementById('s');
                inputElement.value = fixedNum(a * a);

                inputElement = document.getElementById('perimeter');
                inputElement.value = fixedNum(a * 4);
                break
            default:
                console.log('undefinded input');
    }}

    return (
        <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <img src={squareImage} alt="square" />

            <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" onChange={handleInputChange}/>
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
                <label htmlFor="r">Радиус вписанной окружности</label>
                <input type="text" id="r" name="r" onChange={handleInputChange}/>
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