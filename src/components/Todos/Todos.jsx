import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Todos.module.css';
import { TodoList } from '../TodoList/TodoList';
import { TodoListTools } from '../TodoListTools/TodoListTools';
import { TodoSearchTools } from '../TodoSearchTools/TodoSearchTools';

import { API_TODOS } from '../../api/api';
// json-server --watch ./src/data/todoList.json --delay 500 --port 3004

export const Todos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [fieldValue, setFieldValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [dataToDoList, setDataToDoList] = useState([]);
	const [fieldValueChanged, setFieldValueChanged] = useState(false);

	const valueSearch = useDebounce(searchQuery);

	const handleChange = ({target}) => {
		if (fieldValue !== target.value && target.value !== '') {
			setFieldValue(target.value);
			setFieldValueChanged(true);
		} else {
			setFieldValue(target.value);
			setFieldValueChanged(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			await fetch(API_TODOS)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка запроса!`);
					}

					return response.json()
				})
				.then((data) => setDataToDoList(data))
				.catch((error) => {
					throw new Error(error);
				})
				.finally(() => setIsLoading(false));
		}

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${API_TODOS}?q=${valueSearch}`)
				.then((response) => response.json())
				.then((data) => {
					setDataToDoList(data);
				})
				.catch((error) => {
					throw new Error(error);
				})
		}

		fetchData();
	}, [valueSearch]);

	const addTodo = async (payload) => {
		const response = await fetch(API_TODOS, {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(payload)
		})

		const todo = await response.json();

		setDataToDoList((prevState) => [...prevState, todo]);
		setFieldValue('');
		setFieldValueChanged(false);
	};

	const deleteTodo = async (id) => {
		await fetch(`${API_TODOS}/${id}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
		});

		setDataToDoList(dataToDoList.filter((todo) => todo.id !== id));
	};

	const sendUpdatedTodo = async (id, payload) => {
		const todoPosition = dataToDoList.findIndex((todo) => todo.id === id);
		const currentTodo = dataToDoList.find((todo) => todo.id === id);

		if (todoPosition !== -1) {
			const response = await fetch(`${API_TODOS}/${id}`, {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({...currentTodo, text: payload})
			});

			const updatedTodo = await response.json();
			const copyDataToDoList = dataToDoList.slice();

			copyDataToDoList[todoPosition] = updatedTodo;

			setDataToDoList(copyDataToDoList);
		}
	};

	const sortingTodos = (sortByField) => {
		// Нет проверки sortByField
		const fetchData = async () => {
			await fetch(`${API_TODOS}?_sort=${sortByField}&_order=asc`)
				.then((response) => response.json())
				.then((data) => {
					setDataToDoList(data);
				})
				.catch((error) => {
					throw new Error(error);
				})
		}

		fetchData();
	};

	const handleSort = (sortByField) => sortingTodos(sortByField);
	const handleAddTodo = (payload) => addTodo(payload);
	const handleClearField = () => setSearchQuery('');
	const handleSearchQuery = ({target}) => setSearchQuery(target.value);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>My Todo-s</h1>
			<div className={styles.toolsWrapper}>
				<div className={styles.row}>
					<input type="text"
								className={`${styles.field} ${styles.fieldSearch}`}
								placeholder='Search...'
								value={searchQuery}
								onChange={handleSearchQuery}/>
					<TodoSearchTools
						handleClearField={handleClearField}
					/>
				</div>
				<div className={styles.row}>
					<input type="text"
								className={styles.field}
								value={fieldValue}
								onChange={handleChange}/>
					<TodoListTools
						fieldValue={fieldValue}
						handleAddTodo={handleAddTodo}
						fieldValueChanged={fieldValueChanged}
					/>
				</div>
			</div>
			<button className={styles.sortButton} onClick={() => handleSort('text')}>Sort by a-z</button>
			<div className={styles.divider}></div>
			<TodoList
				isLoading={isLoading}
				dataToDoList={dataToDoList}
				handleDelete={deleteTodo}
				sendUpdatedTodo={sendUpdatedTodo}
			/>
		</div>
	)
}
