import styles from "./Footer.module.css";
import logo from "../Header/LogoFlix.png";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer className={styles.footer}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="Logo AluraFlix"/>
                </section>
            </Link>
        </footer>
    );
}

export default Footer;