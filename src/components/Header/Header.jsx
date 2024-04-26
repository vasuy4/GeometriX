import {useState} from 'react'
import logo from './LogoBlue.png'
import './Header.css'

// Просто хедер, в котором находится лого, название и время.
export default function Header() {
    const [nowTime, setNowTime] = useState(new Date())

    setInterval(() => setNowTime(new Date()), 1000)

    return(
        <header>
            <a href="http://localhost:3000/" className='logolink'><img src={logo} alt="Logo"/></a>
            <a href="http://localhost:3000/"><h3>GeometriX</h3></a>
            <time>Time now: {nowTime.toLocaleTimeString()}</time>
        </header>
    )
}