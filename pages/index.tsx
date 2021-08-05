import Head from 'next/head';
import Image from 'next/image';

import InventoryCard from '../components/inventory_card';

import styles from '../styles/utils.module.scss';

import React from 'react';
import { GetServerSideProps } from 'next';
import { getInventories } from '../services/inventories';

/**
 * Home: The landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home page
 */
export default function Home({
	inventories
}: {
	inventories: {
		id: string,
		name: string,
		description: string
	}[]
}): JSX.Element {
	return (
		<div className={styles.container}>
			<Head>
				<title>An inventories app</title>
				<meta name="description" content="A simple inventories for exercise" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Feldrise Inventories App
				</h1>

				{inventories.map(({ id, name, description }) => (
					InventoryCard({ id, name, description })
				))}

				<button className={styles.btn_floating} onClick={onAddInventoryClicked}>+</button>

				<div id="spinner" className={styles.loader}>
					<div className={styles.loading}></div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://feldrise.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/feldrise.svg" alt="Feldrise Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div >
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	const inventoriesRequest = await getInventories()

	if (!inventoriesRequest.ok) {
		return {
			redirect: {
				destination: '/authentication',
				permanent: false
			}
		}
	}

	const inventories = inventoriesRequest.data;

	return {
		props: {
			inventories
		}, // will be passed to the page component as props
	}
}

function onAddInventoryClicked() {
	document.getElementById('spinner')!.style.display = "block";
	alert("Hello World");
}