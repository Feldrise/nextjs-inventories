import Head from 'next/head';

import InventoryCard from '../components/inventory_card';

import styles from '../styles/utils.module.scss';

import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { createInventory, getInventories, updateInventory } from '../services/inventories';
import Modal from '../components/modal';
import InventoryForm from '../components/forms/inventory_form';
import { useRouter } from 'next/router';

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

	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({});
	const router = useRouter();

	const refreshData = () => {
		router.replace(router.asPath);
	}

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
					InventoryCard({
						id, name, description, onEdit: () => {
							setModalData({
								id: id,
								name: name,
								description: description
							});
							setShowModal(true);
						}
					})
				))}

				{/* <button className={styles.btn_floating} onClick={onAddInventoryClicked}>+</button> */}
				<button className={styles.btn_floating} onClick={() => {
					setModalData({
						id: null,
						name: null,
						description: null
					});
					setShowModal(true)
				}}>+</button>


				<div id="spinner" className={styles.loader}>
					<div className={styles.loading}></div>
				</div>
			</main>

			<Modal onClose={() => setShowModal(false)} show={showModal} title={modalData.id == null ? "Add new inventory" : "Edit this inventory"}>
				<InventoryForm
					id={modalData.id}
					name={modalData.name}
					description={modalData.description}
					onSubmit={
						async (event: React.FormEvent) => {
							setShowModal(false)
							event.preventDefault();
							const name = event.target.name.value;
							const description = event.target.description.value;

							var res = { ok: false };

							if (modalData.id == null) {
								res = await createInventory(name, description);
							}
							else {
								res = await updateInventory(modalData.id, name, description);
							}

							document.getElementById('spinner')!.style.display = "none";
							if (res.ok) {
								refreshData();
							}
						}
					}
				/>
			</Modal>
		</div>
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