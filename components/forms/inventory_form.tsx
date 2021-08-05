import { FormEventHandler } from "react";

import styles from '../../styles/utils.module.scss';

export default function InventoryForm({ id, name, description, onSubmit }: {
	id: string,
	name: string,
	description: string,
	onSubmit: FormEventHandler<HTMLFormElement>
}): JSX.Element {
	return (
		<form onSubmit={onSubmit}>
			<div className={styles.form_group}>
				<label>Name</label>
				<input className={styles.form_control} id="name" defaultValue={name} />
			</div>
			<div className={styles.form_group}>
				<label>Description</label>
				<input className={styles.form_control} id="description" defaultValue={description} />
			</div>
			<div className={styles.form_group}>
				<button className={styles.btn_primary} type="submit">Submit</button>
			</div>
		</form>
	);
}