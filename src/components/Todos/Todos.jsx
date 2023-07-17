import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Todos.module.css';
import { TodoList } from '../TodoList/TodoList';
import { TodoListTools } from '../TodoListTools/TodoListTools';
import { TodoSearchTools } from '../TodoSearchTools/TodoSearchTools';

import { API_TODOS } from '../../api/api';

export const Todos = ({dataToDoList, setDataToDoList}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [fieldValue, setFieldValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [fieldValueChanged, setFieldValueChanged] = useState(false);

	const valueSearch = useDebounce(searchQuery);

	const handleChange = ({target}) => {
		if (target.value !== '') {
			setFieldValueChanged(true);
		} else {
			setFieldValueChanged(false);
		}

		setFieldValue(target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

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
	}, [setIsLoading]);

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
	}, [valueSearch, setDataToDoList]);

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
		<div className={styles.todos}>
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
			<div className='divider' />
			<TodoList
				isLoading={isLoading}
				dataToDoList={dataToDoList}
			/>
		</div>
	)
}
