import { useState, useRef } from 'react';
import styles from './TodoItem.module.css';
import { TodoItemTools } from '../TodoItemTools/TodoItemTools';

export const TodoItem = ({id, text, handleDelete, sendUpdatedTodo}) => {
	const [isEdit, setEdit] = useState(false);
	const [fieldValue, setFieldValue] = useState(text);
	const [fieldValueChanged, setFieldValueChanged] = useState(false);

	const inputRef = useRef(null);

	const handleChange = ({target}) => {
		if (text !== target.value && target.value !== '') {
			setFieldValue(target.value);
			setFieldValueChanged(true);
		} else {
			setFieldValue(target.value);
			setFieldValueChanged(false);
		}
	};

	const handleEdit = () => {
		inputRef.current.focus();
		setEdit(true);
	};

	const handleUpdate = async (id, updatedTodo) => {
		if (updatedTodo !== text) {
			await sendUpdatedTodo(id, updatedTodo);
			setEdit(false);
			console.log('Данные отправлены!');
		} else {
			setEdit(false);
			setFieldValueChanged(false);
			return;
		}
		await sendUpdatedTodo(id, updatedTodo);
			setEdit(false);
	};

	const handleCancel = () => {
		inputRef.current.focus();
		setFieldValue(text);
		setEdit(false);
		setFieldValueChanged(false);
	};

	return (
		<li className={!isEdit ? styles.item : `${styles.item} ${styles.itemIsEdit}`}>
			<input type="text"
				ref={inputRef}
				value={!isEdit ? text : fieldValue}
				readOnly={!isEdit}
				className={!isEdit ? styles.field : `${styles.field} ${styles.fieldIsEdit}`}
				onChange={handleChange}
			/>
			<TodoItemTools
				id={id}
				isEdit={isEdit}
				fieldValue={fieldValue}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				handleCancel={handleCancel}
				handleUpdate={handleUpdate}
				fieldValueChanged={fieldValueChanged}
			/>
		</li>
	)
}
