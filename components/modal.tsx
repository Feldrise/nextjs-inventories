import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import modalStyles from '../styles/modal.module.scss';

export default function Modal({ show, onClose, children, title }: {
	show: boolean,
	onClose: () => void,
	children: React.ReactNode,
	title: string
}) {
	const [isBrowser, setIsBrower] = useState(false);

	useEffect(() => {
		setIsBrower(true)
	}, []);

	const modalContent = show ? (
		<div className={modalStyles.background}>
			<div className={modalStyles.container}>
				<a href="#" className={modalStyles.closeButton} onClick={onClose}>x</a>
				<h2>{title}</h2>
				<div>{children}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById("modal-root") as Element
		);
	}
	else {
		return null;
	}
}