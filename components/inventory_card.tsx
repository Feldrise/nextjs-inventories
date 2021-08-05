import Link from 'next/link';

import styles from '../styles/utils.module.scss';

export default function InventoryCard({ id, name, description }: {
	id: string,
	name: string,
	description: string
}) {
	return (
		<Link href={"/inventories/" + id}>
			<a className={styles.inventoryCard}>
				<div>
					<h3>{name}</h3>
					<p>{description}</p>
				</div>
			</a>
		</Link>
	);
};