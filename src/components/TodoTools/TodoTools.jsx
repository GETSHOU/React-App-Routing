// НИГДЕ НЕ ПОДКЛЮЧЕН! ЗАГОТОВКА
import styles from './TodoTools.module.css';

// const STYLES_BUTTON = styles.button;
// const STYLES_ADD_BUTTON = `${STYLES_BUTTON} ${styles.addButton}`;
// const STYLES_EDIT_BUTTON = `${STYLES_BUTTON} ${styles.editButton}`;
// const STYLES_DELETE_BUTTON = `${STYLES_BUTTON} ${styles.deleteButton}`;
// const STYLES_SEARCH_BUTTON = `${STYLES_BUTTON} ${styles.searchButton}`;

export const TodoTools = () => {
	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.searchButton}`}>
				SRCH
			</button>
			<button className={`${styles.button} ${styles.addButton}`}>
				ADD
			</button>
		</div>
	)
}
