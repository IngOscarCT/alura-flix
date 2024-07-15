import styles from "./BackEnd.module.css";
import Cards from "componets/Cards/Cards";

function BackEnd({ videos }) {

    return (
        <div className={styles.category}>
            <h2 className={styles.tituloCategoria}>BackEnd</h2>
            <div>
                <Cards videos={videos} category="backend" />
            </div>
            
        </div>
    );
}

export default BackEnd