import styles from './TodoItemTools.module.css';

export const TodoItemTools = ({
	id,
	isEdit,
	fieldValue,
	handleEdit,
	handleCancel,
	handleDelete,
	handleUpdate,
	fieldValueChanged
}) => {
	return (
		<div className={styles.tools}>
			{isEdit
				? null
				: <button className={`${styles.button} ${styles.editButton}`}
									onClick={() => handleEdit()}>
										<span className='gg-pen'></span>
					</button>
			}
			{isEdit
				? null
				: <button className={`${styles.button} ${styles.deleteButton}`}
									onClick={() => handleDelete(id)}>
										<span className='gg-trash'></span>
					</button>
			}
			{isEdit
				? <button className={`${styles.button} ${styles.saveButton}`}
									onClick={() => handleUpdate(id, fieldValue)}
									disabled={!fieldValueChanged}>
										<span className='gg-check'></span>
					</button>
				: null
			}
			{isEdit
				? <button className={`${styles.button} ${styles.cancelButton}`}
									onClick={() => handleCancel()}>
										<span className='gg-close'></span>
					</button>
				: null
			}
		</div>
	)
}
