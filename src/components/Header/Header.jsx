import {useState} from 'react'
import logo from './LogoWhite.png'
import './Header.css'

// Просто хедер, в котором находится лого, название и время.
export default function Header() {
    const [nowTime, setNowTime] = useState(new Date())

    setInterval(() => setNowTime(new Date()), 1000)

    return(
        <header>
            <img src={logo} alt="Logo"/>
            <h3>GeometriX</h3>
            <time>Time now: {nowTime.toLocaleTimeString()}</time>
        </header>
    )
}