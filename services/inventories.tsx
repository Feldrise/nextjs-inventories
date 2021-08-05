const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjYxMGE2MWM1NzUwOTJiNjA0NzMyMWI4ZCIsIm5iZiI6MTYyODA3MDQxMywiZXhwIjoxNjI5Nzk4NDEzLCJpYXQiOjE2MjgwNzA0MTN9.goJdVd_TnyD7G4rljv2GzdtEX-p49qtp1KTArmuXB_U';

export async function getInventoryItems(inventoryId: string) {
	const itemsRequest = await fetch(
		"https://inventories.exercises.feldrise.com/api/inventories/" + inventoryId + "/items", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer ' + userToken,
			'Content-Type': 'application/json'
		}),
	});

	if (itemsRequest.ok) {
		const data = await itemsRequest.json();

		return {
			ok: true,
			data: data
		}
	}

	return {
		ok: false,
		data: null
	}
}

export async function getInventory(inventoryId: string) {
	const inventoryRequest = await fetch(
		"https://inventories.exercises.feldrise.com/api/inventories/" + inventoryId, {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer ' + userToken,
			'Content-Type': 'application/json'
		}),
	});

	if (inventoryRequest.ok) {
		const data = await inventoryRequest.json();

		return {
			ok: true,
			data: data
		}
	}

	return {
		ok: false,
		data: null
	}
}

export async function getInventories() {
	const inventoriesRequest = await fetch(
		"https://inventories.exercises.feldrise.com/api/inventories", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer ' + userToken,
			'Content-Type': 'application/json'
		}),
	});

	if (inventoriesRequest.ok) {
		const data = await inventoriesRequest.json();

		return {
			ok: true,
			data: data
		};
	}

	return {
		ok: false,
		data: null
	};
};

export async function createInventory(name: string, description: string) {
	const inventoryData = {
		name: name,
		description: description
	};

	const res = await fetch(
		"https://inventories.exercises.feldrise.com/api/inventories", {
		method: 'post',
		headers: new Headers({
			'Authorization': 'Bearer ' + userToken,
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(inventoryData)
	});

	if (res.status < 300) {
		return {
			ok: true
		}
	}

	return {
		ok: false
	}
}


export async function updateInventory(id: string, name: string, description: string) {
	const inventoryData = {
		id: id,
		name: name,
		description: description
	};

	const res = await fetch(
		"https://inventories.exercises.feldrise.com/api/inventories/" + id, {
		method: 'put',
		headers: new Headers({
			'Authorization': 'Bearer ' + userToken,
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(inventoryData)
	});

	if (res.status < 300) {
		return {
			ok: true
		}
	}

	return {
		ok: false
	}
}