import styles from './TodoListTools.module.css';

export const TodoListTools = ({fieldValue, handleAddTodo, fieldValueChanged}) => {
	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.addButton}`}
							onClick={() => handleAddTodo({text: fieldValue})}
							disabled={!fieldValueChanged}>
								<span className='gg-math-plus'></span>
			</button>
		</div>
	)
}
