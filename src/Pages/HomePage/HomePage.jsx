import './HomePage.css';
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="Home">
            <h1>Добро пожаловать на наш сайт!</h1>
            <p>Нажмите на кнопку <Link to="/workbench">НАЧАТЬ   </Link>, чтобы начать работу.</p>
            
            <Link to="/workbench">НАЧАТЬ!</Link>
        </div>
    );
}


export default Home;