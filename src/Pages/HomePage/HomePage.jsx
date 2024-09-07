import './HomePage.css';
import { Link } from "react-router-dom";
import logo from "../../components/Header/LogoBlue.png";

function Home() {
    return (
        <div className="Home">
            <header className='headerHome'>
                <div className='logoHome'>
                    <Link href="/" className="logolink">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Link to="/">
                        <h3>Геометрикс</h3>
                    </Link>
                </div>

                <div className='containerNav row'>
                    <nav className='navHome'>
                        <a href="#">О проекте</a>
                        <a href="#">Руководство</a>
                        <a href="#">Отзывы</a>
                    </nav>
                </div>
            </header>
            

            <div className='programms'>
                <h3>Геометрический 3D-калькулятор</h3>
                <p>Графическая форма представления геометрических фигур с использованием трёхмерной графики</p>
            </div>


            <h1>Добро пожаловать на наш сайт!</h1>
            <p>Нажмите на кнопку <Link to="/workbench/calculator">НАЧАТЬ   </Link>, чтобы начать работу.</p>
            
            <Link to="/workbench/calculcator">НАЧАТЬ!</Link>
            <Link to="/ChoosingDifficulty">Интерактивный учебник</Link>
        </div>
    );
}


export default Home;