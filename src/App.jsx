import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import styles from './App.module.css';

import { Todo } from './components/Todo/Todo';
import { Todos } from './components/Todos/Todos';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => {
	const [dataToDoList, setDataToDoList] = useState([]);

	const deleteTodo = async (id) => {
		setDataToDoList(dataToDoList.filter((todo) => todo.id !== id));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.mainContent}>
				<h1 className={styles.logo}>My to-do list</h1>
				<div className='divider' />
				<Routes>
					<Route path='/' element={
						<Todos
							dataToDoList={dataToDoList}
							setDataToDoList={setDataToDoList}
						/>
					}/>
					<Route path='/todo/:id' element={ <Todo deleteTodo={deleteTodo} /> } />
					<Route path='/404' element={ <PageNotFound /> } />
					<Route path='*' element={ <Navigate to='/404' replace={true} /> } />
				</Routes>
			</div>
		</div>
	);
};
