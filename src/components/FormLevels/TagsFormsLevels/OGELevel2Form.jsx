import { fixedNum, checkBelowZero, checBCalculate } from "../../FormShapes/formulas";

export default function OGELevel2({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let BE = fixedNum(Number(document.getElementById('BE').value))

        const arrInput = [BE]
        const idInputs = ['BE']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (BE <= 0) return

        let arrCheck = arrInput.slice()

        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="BE">BE =</label>
                <input className='w220' type="text" id="BE" name="BE" required/>
            </div>
            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}