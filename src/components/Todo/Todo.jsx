import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styles from './Todo.module.css';
import { Loader } from '../Loader/Loader';
import { TodoItemTools } from '../TodoItemTools/TodoItemTools';
import { HomePageButton } from '../HomePageButton/HomePageButton';

import { API_TODOS } from '../../api/api';
// json-server --watch ./src/data/todoList.json --delay 500 --port 3004

export const Todo = ({deleteTodo}) => {
	const {id} = useParams();

	const [isEdit, setEdit] = useState(false);
	const [dataToDo, setDataToDo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fieldValue, setFieldValue] = useState('');
	const [fieldState, setFieldState] = useState(false);

	const textareaRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			await fetch(`${API_TODOS}/${id}`)
				.then((response) => {
					if (response.status === 404) {
						navigate('/404', { replace: true });
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
	}, [id, navigate]);

	useEffect(() => {
    setFieldValue(dataToDo.text);
  }, [dataToDo.text]);

	useEffect(() => {
		if (isEdit) {
			textareaRef.current?.focus();
			textareaRef.current.selectionStart = textareaRef.current.value.length; // - выделяет все содержимое поля
			textareaRef.current.selectionEnd = textareaRef.current.value.length; // - ставит курсор в конец строки
		}
	}, [isEdit]);


	const handleChange = ({target}) => {
		if (dataToDo.text !== target.value && target.value !== '') {
			setFieldState(true);
		} else {
			setFieldState(false);
		}

		setFieldValue(target.value);
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
		setEdit(true);
	};

	const handleUpdate = async (id, fieldValue) => {
		if (fieldValue !== dataToDo.text) {
			await sendUpdatedTodo(id, fieldValue);
		} else {
			return;
		}

		setEdit(false);
		setFieldState(false);

		await sendUpdatedTodo(id, fieldValue);

	};

	const handleCancel = () => {
		textareaRef.current.focus();

		setFieldValue(dataToDo.text);
		setFieldState(false);
		setEdit(false);
	};

	const handleDelete = async (id) => {
		await fetch(`${API_TODOS}/${id}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
		}).finally(() => navigate('/'));

		deleteTodo(id);
		setDataToDo(id);
	};

	return (
		<>
			{isLoading
				? <Loader />
				: <>
						<HomePageButton />
						<div className={styles.todo}>
							<div className={styles.toolsWrapper}>
								<TodoItemTools
									id={id}
									isEdit={isEdit}
									fieldState={fieldState}
									fieldValue={fieldValue}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
									handleCancel={handleCancel}
									handleUpdate={handleUpdate}
								/>
							</div>
							{ !isEdit
								? <div className={styles.textWrapper}>
										<p role='textbox' className={styles.text}>{dataToDo.text}</p>
									</div>
								: <textarea
										ref={textareaRef}
										className={styles.textField}
										value={fieldValue}
										onChange={handleChange}
									/>
							}
						</div>
					</>
			}
		</>
	)
}
