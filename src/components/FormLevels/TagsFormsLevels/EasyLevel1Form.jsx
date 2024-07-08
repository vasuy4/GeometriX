import { fixedNum, checkBelowZero } from "../../FormShapes/formulas";

export default function EasyLevel1({handleFormSubmit, nowLevel, handleClose}) {

    const handleFormSubmitCheckParameters = (event, nowLevel) => {
        event.preventDefault();
        let a = fixedNum(Number(document.getElementById('a').value))
        let b = fixedNum(Number(document.getElementById('b').value))

        const arrInput = [a, b]
        const idInputs = ['a', 'b']
        const belowZero = checkBelowZero(arrInput, idInputs)

        if (belowZero) return

        let arrCheck = arrInput.slice()
        handleFormSubmit(event, nowLevel)
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, nowLevel)} action="">
            <p>{nowLevel}</p>
            <div>
                <label htmlFor="a">a</label>
                <input type="text" id="a" name="a"/>
            </div>
            <div>
                <label htmlFor="b">b</label>
                <input type="text" id="b" name="b"/>
            </div>

            <button type="submit">Заново</button>
            <button onClick={handleClose}>Закрыть</button>
        </form>
    )
}