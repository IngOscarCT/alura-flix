import { Link } from "react-router-dom";
import styles from "./HeaderLinks.module.css";

function HeaderLinks({url,children}){
    return(
        <Link to={url} className={styles.link}>
            {children}
        </Link>
    );
}

export default HeaderLinks