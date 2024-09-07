import { fixedNum, checkBelowZero, checBCalculate } from "../../FormShapes/formulas";

export default function OGELevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let AD = fixedNum(Number(document.getElementById('AD').value))
        let BC = fixedNum(Number(document.getElementById('BC').value))
        let S = fixedNum(Number(document.getElementById('S').value))

        const arrInput = [AD, BC, S]
        const idInputs = ['AD', 'BC', 'S']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (AD <= 0 || BC <= 0 || S <= 0) return

        let arrCheck = arrInput.slice()

        handleFormSubmit(event, nowLevel)
    }

    return (
        <form className="formLevelsForm" onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>Изменить дано:</p>
            <div className='form-group row'>
                <label htmlFor="AD">AD =</label>
                <input className='w220' type="text" id="AD" name="AD" required/>
            </div>
            <div className='form-group row'>
                <label htmlFor="BC">BC =</label>
                <input className='w220' type="text" id="BC" name="BC" required/>
            </div>
            <div className='form-group row'>
                <label htmlFor="S">S =</label>
                <input className='w220' type="text" id="S" name="S" required/>
            </div>
            <div className="row">
                <button type="submit" className= "sFormText">Заново</button>
                <button onClick={handleClose} className= "sFormText">Закрыть</button>
            </div>
        </form>
    )
}