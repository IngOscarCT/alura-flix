import styles from "./DPersonal.module.css";
import Cards from "componets/Cards/Cards";

function DPersonal({ videos }) {

    return (
        <div className={styles.category}>
            <h2 className={styles.tituloCategoria}>Innovación y Gestión</h2>
            <div>
                <Cards videos={videos} category="DPersonal"  />
            </div>
        </div>
    );
}

export default DPersonal