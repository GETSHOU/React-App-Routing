import styles from './TodoItemTools.module.css';

export const TodoItemTools = ({
	id,
	isEdit,
	fieldState,
	fieldValue,
	handleEdit,
	handleCancel,
	handleDelete,
	handleUpdate,
}) => {
	return (
		<div className={styles.tools}>
			{!isEdit
				? <>
						<button className={`${styles.button} ${styles.editButton}`}
										onClick={() => handleEdit()}>
											<span className='gg-pen'></span>
						</button>
						<button className={`${styles.button} ${styles.deleteButton}`}
										onClick={() => handleDelete(id)}>
											<span className='gg-trash'></span>
						</button>
					</>
				: <>
						<button className={`${styles.button} ${styles.saveButton}`}
										onClick={() => handleUpdate(id, fieldValue.trim())}
										disabled={!fieldState}>
											<span className='gg-check'></span>
						</button>
						<button className={`${styles.button} ${styles.cancelButton}`}
										onClick={() => handleCancel()}>
											<span className='gg-close'></span>
						</button>
					</>
			}
		</div>
	)
}
