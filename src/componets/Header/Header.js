import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./LogoFlix.png";
import HeaderLinks from "componets/HeaderLinks/HeaderLinks";

function Header(){
    return(
        <header className={styles.header}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="Logo AluraFlix"/>
                </section>
            </Link>
            <nav>
                <HeaderLinks url="/">
                    <button>Home</button>
                </HeaderLinks>
                <HeaderLinks url="/NuevoVideo">
                    <button>Nuevo Video</button>
                </HeaderLinks>
            </nav>
        </header>
    );
}

export default Header;