import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export const TodoItem = ({id, text, taskPosition}) => {
	return (
		<li className={styles.item}>
			<div className={styles.taskPosition}>{taskPosition + 1}</div>
			<div className={styles.linkWrapper}>
				<Link to={`todo/${id}`} className={`${styles.link} textTruncate`}>{text}</Link>
			</div>
		</li>
	)
}
