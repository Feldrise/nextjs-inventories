import styles from '../styles/utils.module.scss';

export default function ItemCard({ name, description }: {
	name: string,
	description: string
}): JSX.Element {
	return (
		<div className={styles.itemCard}>
			<h3>{name}</h3>
			<p>{description}</p>
		</div>
	);
}