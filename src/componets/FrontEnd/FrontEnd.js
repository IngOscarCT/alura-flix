import styles from "./FrontEnd.module.css";
import Cards from "componets/Cards/Cards";

function FrontEnd({ videos }) {

    return (
        <div id="frontend" className={styles.category}>
            <h2 className={styles.tituloCategoria}>Front End</h2>
            <div>
                <Cards videos={videos} category="frontend" />
            </div>
        </div>
    );
}

export default FrontEnd