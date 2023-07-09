import styles from './TodoSearchTools.module.css';

export const TodoSearchTools = ({handleClearField}) => {
	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.clearButton}`}
							onClick={() => handleClearField()}>
								<span className='gg-backspace'></span>
			</button>
		</div>
	)
}
