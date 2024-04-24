// Перевод радиан в градусы (по умолчанию JS считает в радианах, т.к. это система СИ)
export function toDegrees (angle) {
    return angle * (180 / Math.PI)
}

// Перевод из радиан в градусы
export function toRadians (angle) {
    return angle * (Math.PI / 180)
}

// Округление числа до 3 знаков после запятой
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