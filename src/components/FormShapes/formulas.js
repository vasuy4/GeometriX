export function toDegrees (angle) {
    return angle * (180 / Math.PI)
}

export function toRadians (angle) {
    return angle * (Math.PI / 180)
}

export function fixedNum (num) {
    if (num.toFixed(3) === num){
        return Number(num)
    }
    else if (!num) {
        return 0
    }
    else {
        return Number(num.toFixed(3))
    }
}