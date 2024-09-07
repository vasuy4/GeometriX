import { fixedNum, checkBelowZero } from "../../FormShapes/formulas";

export default function EGELevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let S = fixedNum(Number(document.getElementById('S').value))

        const arrInput = [S]
        const idInputs = ['S']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (S <= 0) return

        let arrCheck = arrInput.slice()

        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="S">Sпп=</label>
                <input className='w220' type="text" id="S" name="S" required/>
            </div>
            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}