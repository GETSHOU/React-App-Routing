import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './App.module.css';
import { Todos } from './components/Todos/Todos';
import { Todo } from './components/Todo/Todo';

export const App = () => {
	const [dataToDoList, setDataToDoList] = useState([]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.mainContent}>
				<Link to='/' className={styles.linkLogo}>My to-do list</Link>
				<div className='divider' />
				<Routes>
					<Route path='/' element={
						<Todos
							dataToDoList={dataToDoList}
							setDataToDoList={setDataToDoList}
						/>}
					/>
					<Route path='/todo/:id' element={
						<>
							<button className={styles.buttonBack}>
								<Link to='/' className={styles.link}>На главную</Link>
							</button>
							<Todo
								dataToDoList={dataToDoList}
								setDataToDoList={setDataToDoList}
							/>
						</>
					}/>
				</Routes>
			</div>
		</div>
	);
};
