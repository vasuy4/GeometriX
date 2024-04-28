import { useState } from 'react';
import logo from './LogoBlue.png';
import './Header.css';

export default function Header() {
    const [nowTime, setNowTime] = useState(new Date());
    const [showOptions, setShowOptions] = useState(false);

    setInterval(() => setNowTime(new Date()), 1000);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <header>
            <a href="http://localhost:3000/" className="logolink">
                <img src={logo} alt="Logo" />
            </a>
            <a href="http://localhost:3000/">
                <h3>GeometriX</h3>
            </a>
            <button id="optionsButton" onClick={toggleOptions}>Опции</button>
            <div id="optionsPanel" className={showOptions ? '' : 'hidden'}>
                <ul>
                    <li>
                        <button>Камера по умолчанию</button>
                    </li>
                    <li>
                        <button>Вкл./Выкл. систему координат</button>
                    </li>
                </ul>
            </div>
            <time>Time now: {nowTime.toLocaleTimeString()}</time>
        </header>
    );
}
