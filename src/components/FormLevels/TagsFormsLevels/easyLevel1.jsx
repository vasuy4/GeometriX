import { fixedNum, checkCalculate, checkBelowZero } from "../../FormShapes/formulas";

export default function easyLevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('a').value))
        let b = fixedNum(Number(document.getElementById('b').value))

        const arrInput = [a, b]
        const idInputs = ['a', 'b']
        const belowZero = checkBelowZero(arrInput, idInputs)
        if (belowZero) return

        let arrCheck = arrInput.slice()
        
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>{nowLevel}</p>
            <div>
                <label htmlFor="a">a</label>
                <input type="number" id="a" name="a"/>
            </div>
            <div>
                <label htmlFor="b">b</label>
                <input type="number" id="b" name="b"/>
            </div>
        </form>
    )
}