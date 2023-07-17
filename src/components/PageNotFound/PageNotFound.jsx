import styles from './PageNotFound.module.css';

import { HomePageButton } from '../HomePageButton/HomePageButton';

export const PageNotFound = () => {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>404 - страница не найдена</h2>
			<div className={styles.buttonWrapper}>
				<HomePageButton />
			</div>
		</div>
	)
}
