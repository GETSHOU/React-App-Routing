import styles from './TodoList.module.css';
import { Loader } from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
	isLoading,
	dataToDoList,
	handleDelete,
	sendUpdatedTodo
}) => {
	return (
		<div className={styles.wrapper}>
			<ol className={styles.list}>
				{dataToDoList.length > 0
					? <>
							{isLoading
								? <Loader />
								: dataToDoList.map((todo) => {

									return (
										<TodoItem
											key={todo.id}
											handleDelete={handleDelete}
											sendUpdatedTodo={sendUpdatedTodo}
											{...todo}
										/>
									)
								})
							}
						</>
					: <>
							{isLoading
								? <Loader />
								: <h2 className={styles.message}>На данный момент нет текущих задач</h2>
							}
						</>
				}
			</ol>
		</div>
	)
}
