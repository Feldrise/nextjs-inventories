import Link from 'next/link';

import styles from '../styles/utils.module.scss';

export default function InventoryCard({ id, name, description, onEdit }: {
	id: string,
	name: string,
	description: string,
	onEdit: () => void
}) {
	return (
		<div className={styles.inventoryCard}>
			<Link href={"/inventories/" + id}>
				<a className={styles.inventoryCardContent}>
					<div>
						<h3>{name}</h3>
						<p>{description}</p>
					</div>
				</a>
			</Link>
			<button className={styles.inventoryCardButton} onClick={onEdit}>edit</button>
		</div>
	);
};