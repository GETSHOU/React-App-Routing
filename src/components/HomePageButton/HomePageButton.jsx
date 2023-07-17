import { Link } from 'react-router-dom';
import styles from './HomePageButton.module.css';

export const HomePageButton = () => {
	return (
		<button className={styles.button}>
			<Link to='/' className={styles.link}>На главную</Link>
		</button>
	)
}
