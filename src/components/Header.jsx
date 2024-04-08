import {useState} from 'react'

export default function Header() {
    const [nowTime, setNowTime] = useState(new Date())

    setInterval(() => setNowTime(new Date()), 1000)

    return(
        <header>
            <img src="#" alt="Logo" />
            <h3>GeometriX</h3>
            <time>Time now: {nowTime.toLocaleTimeString()}</time>
        </header>
    )
}