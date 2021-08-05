import ErrorPage from "next/error";
import Head from 'next/head';

import { GetServerSideProps } from "next";
import { getInventory, getInventoryItems } from "../../services/inventories";

import styles from '../../styles/utils.module.scss';
import ItemCard from "../../components/item_card";

export default function InventoryPage({
	name,
	description,
	itemsData
}: {
	name: string,
	description: string,
	itemsData: {
		id: string,
		name: string,
		description: string,
		quantity: number
	}[]
}): JSX.Element {
	if (itemsData == null) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Inventory: {name}</title>
				<meta name="description" content="A simple inventories for exercise" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main className={styles.main}>
				<h1 className={styles.title}>{name}</h1>
				<p>{description}</p>
				<div className={styles.grid}>
					{itemsData.map(({ id, name, description, quantity }) => (
						ItemCard({ name, description })
					))}
				</div>
			</main>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const inventoryRequest = await getInventory(context.params!.id as string);

	if (!inventoryRequest.ok) {
		return {
			notFound: true
		}
	}

	const itemsRequest = await getInventoryItems(context.params!.id as string);

	if (!itemsRequest.ok) {
		return {
			redirect: {
				destination: '/authentication',
				permanent: false
			}
		}
	}
	return {
		props: {
			name: inventoryRequest.data.name ?? "Unknown",
			description: inventoryRequest.data.description ?? "Unknown",
			itemsData: itemsRequest.data
		}, // will be passed to the page component as props
	}
}