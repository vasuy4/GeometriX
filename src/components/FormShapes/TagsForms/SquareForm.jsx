import squareImage from '..//formShapesImg/square.png';


export default function SquareForm({handleFormSubmit, selectedShape, handleClose}){
    const handleInputChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value;
        let inputElement;
        let a;
        switch (inputName) {
            // формы для 3d фигур
            case 'side_a':
                inputElement = document.getElementById('diameter');
                inputElement.value = inputValue * 2;

                inputElement = document.getElementById('s');
                inputElement.value = inputValue * inputValue;
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = inputValue * 4;

                inputElement = document.getElementById('r');
                inputElement.value = inputValue / 2;
                break
            case 'diameter':
                a = inputValue / 2;
                inputElement = document.getElementById('side_a');
                inputElement.value = a;

                inputElement = document.getElementById('s');
                inputElement.value = a * a;
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = a * 4;

                inputElement = document.getElementById('r');
                inputElement.value = a / 2;
                break
            case 's':
                a = Math.sqrt(inputValue)
                inputElement = document.getElementById('side_a');
                inputElement.value = a;

                inputElement = document.getElementById('diameter');
                inputElement.value = a * 2;
                
                inputElement = document.getElementById('perimeter');
                inputElement.value = a * 4;

                inputElement = document.getElementById('r');
                inputElement.value = a / 2;
                break
            case 'perimeter':
                a = inputValue / 4
                inputElement = document.getElementById('side_a');
                inputElement.value = a;

                inputElement = document.getElementById('diameter');
                inputElement.value = a * 2;
                
                inputElement = document.getElementById('s');
                inputElement.value = a * a;

                inputElement = document.getElementById('r');
                inputElement.value = a / 2;
                break
            case 'r':
                a = inputValue * 2
                inputElement = document.getElementById('side_a');
                inputElement.value = a;

                inputElement = document.getElementById('diameter');
                inputElement.value = a * 2;
                
                inputElement = document.getElementById('s');
                inputElement.value = a * a;

                inputElement = document.getElementById('perimeter');
                inputElement.value = a * 4;
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
                <label htmlFor="diameter">Диаметр</label>
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