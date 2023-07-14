import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styles from './Todo.module.css';
import { Loader } from '../Loader/Loader';
import { TodoItemTools } from '../TodoItemTools/TodoItemTools';

import { API_TODOS } from '../../api/api';

export const Todo = ({
	dataToDoList, setDataToDoList
}) => {
	const {id} = useParams();
	const [isEdit, setEdit] = useState(false);
	const [dataToDo, setDataToDo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fieldValue, setFieldValue] = useState('');
	const [fieldValueChanged, setFieldValueChanged] = useState(false);

	const textareaRef = useRef(null);

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			await fetch(`${API_TODOS}/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка запроса!`);
					}

					return response.json()
				})
				.then((data) => {
					setDataToDo(data);
				})
				.catch((error) => {
					throw new Error(error);
				})
				.finally(() => setIsLoading(false));
		};

		fetchData();
	}, [id, setIsLoading]);

	useEffect(() => {
    setFieldValue(dataToDo.text);
  }, [dataToDo.text]);

	const handleChange = ({target}) => {
		if (fieldValue !== target.value && target.value !== '') {
			setFieldValue(target.value);
			setFieldValueChanged(true);
		} else {
			setFieldValue(target.value);
			setFieldValueChanged(false);
		}
	};

	const sendUpdatedTodo = async (id, fieldValue) => {
		const response = await fetch(`${API_TODOS}/${id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({text: fieldValue})
		});

		const updatedTodo = await response.json();

		setDataToDo(updatedTodo);
	};

	const handleEdit = () => {
		// textareaRef.current.focus();
		setEdit(true);
	};

	const handleUpdate = async (id, fieldValue) => {
		if (fieldValue !== dataToDo.text) {
			await sendUpdatedTodo(id, fieldValue);
			setEdit(false);

			console.log('Данные отправлены!');
		} else {
			setEdit(false);
			setFieldValueChanged(false);
			return;
		}

		await sendUpdatedTodo(id, fieldValue);
		setEdit(false);
	};

	const handleCancel = () => {
		setFieldValue(dataToDo.text);
		setFieldValueChanged(false);
		setEdit(false);
	};

	const deleteTodo = async (id) => {
		await fetch(`${API_TODOS}/${id}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
		});

		setDataToDo(id);
		setDataToDoList(dataToDoList.filter((todo) => todo.id !== id));
	};

	return (
		<>
			{!dataToDo.length > 0
				? <>
						{isLoading
							? <Loader />
							: <>
									<div className={styles.todoWrapper}>
										<div className={styles.todo}>
												<div className={styles.toolsWrapper}>
													<TodoItemTools
														id={id}
														isEdit={isEdit}
														fieldValue={fieldValue}
														handleEdit={handleEdit}
														handleDelete={deleteTodo}
														handleCancel={handleCancel}
														handleUpdate={handleUpdate}
														fieldValueChanged={fieldValueChanged}
													/>
												</div>
												{ !isEdit
													? <p className={styles.text}>{dataToDo.text}</p>
													: <textarea
															ref={textareaRef}
															className={styles.textField}
															value={fieldValue}
															onChange={handleChange}
														/>
												}
										</div>
									</div>
								</>
						}
					</>
				: <>
						{isLoading
							? <Loader />
							: <h2 className={styles.message}>Задачи нет</h2>
						}
					</>
			}
		</>
	)
}
