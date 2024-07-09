const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = itemInput.value;
	// Vaidate Input
	if (newItem === '') {
		alert('Please add an item');
		return;
	}
	//Create new list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));
	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);
	// Add li to the DOM
	itemList.appendChild(li);
	// Check for items length
	checkUI();
	// Reset filter input
	itemInput.value = '';
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

function removeItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		const itemName = e.target.textContent;
		if (confirm('Would you like to remove this list item? \n(OK/Cancel)')) {
			e.target.parentElement.parentElement.remove();
		}
	}
	checkUI();
}

function clearItems() {
	itemList.innerHTML = '';
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

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('keyup', search);

checkUI();
