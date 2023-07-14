import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export const TodoItem = ({id, text}) => {
	return (
		<li className={styles.item}>
			<div className={styles.linkWrapper}>
				<Link to={`todo/${id}`} className={styles.link}>{text}</Link>
			</div>
		</li>
	)
}
