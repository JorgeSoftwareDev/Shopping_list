const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDom(item));
	checkUI();
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}

// creates the i tag from FontAwesome
function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

function addItemToDom(item) {
	//Create new list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));
	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);
	// Add li to the DOM
	itemList.appendChild(li);
	// Check for items length
}

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// pushing to array
	itemsFromStorage.push(item);

	//Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onAddItemSubmit(e) {
	e.preventDefault();
	const str = itemInput.value;
	let newItem = str.charAt(0).toUpperCase() + str.slice(1);
	// Vaidate Input
	if (newItem === '') {
		alert('Please add an item');
		return;
	}
	// Create item into DOM Elements
	addItemToDom(newItem);
	addItemToStorage(newItem);
	checkUI();
	// Reset filter input
	itemInput.value = '';
}

function getItemsFromStorage() {
	let itemsFromStorage;

	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
}
function onClickItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	}
}

function removeItem(item) {
	if (confirm('Would you like to remove this list item? \n(OK/Cancel)')) {
		item.remove();

		// Remove item from Storage
		removeItemFromStorage(item.textContent);
	}
	checkUI();
}

function removeItemFromStorage(item) {
	let itemsFromStorage = getItemsFromStorage();

	itemsFromStorage = itemsFromStorage.filter((i) => i != item);

	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
	itemList.innerHTML = '';
	localStorage.removeItem('items');
	checkUI();
}

function checkUI() {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		filter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		filter.style.display = 'block';
	}
}

function search(e) {
	const items = itemList.querySelectorAll('li');
	console.log(items);
	const text = e.target.value.toLowerCase();
	console.log(text);

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();
		console.log(itemName);
		if (item.textContent.toLowerCase().includes(text)) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function start() {
	// Event Listeners
	document.addEventListener('DOMContentLoaded', displayItems);
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);
	clearBtn.addEventListener('click', clearItems);
	filter.addEventListener('keyup', search);

	// Initial check of elements
	checkUI();
}

start();
