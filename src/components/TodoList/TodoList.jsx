import styles from './TodoList.module.css';
import { Loader } from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
	isLoading,
	dataToDoList
}) => {
	return (
		<>
			<div className={styles.wrapper}>
				<ol className={styles.list}>
					{isLoading
						? <Loader />
						: <>
								{ dataToDoList.map((todo, i) => {
										return (
											<TodoItem
												key={todo.id}
												{...todo}
												taskPosition={i}
											/>
										)
									})
								}
							</>
					}
				</ol>
			</div>
		</>
	)
}
