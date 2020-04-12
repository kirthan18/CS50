const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

currentItemCount = 0;
uncheckedItemCount = 0;

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const todoText = document.getElementById('todo-text')

function newTodo() {
	if (todoText.value == null || todoText.value == "") {
		alert("Enter a valid todo");
	} else {
		currentItemCount++;
		uncheckedItemCount++;
		listItem = document.createElement('li');
		listItem.className = classNames.TODO_ITEM;
		listItem.setAttribute("id", "todo-item");

		var checkbox = document.createElement('input'); 
		checkbox.className = classNames.TODO_CHECKBOX
		checkbox.setAttribute("type", "checkbox"); 
		checkbox.setAttribute("id", "todo-item-checkbox");
		checkbox.addEventListener("click", function() {
			if (checkbox.checked) {
				uncheckedItemCount--;
			} else {
				uncheckedItemCount++;
			}
			uncheckedCountSpan.textContent = uncheckedItemCount;
		});

	  	var listItemLabel = document.createTextNode(todoText.value);

	  	var button = document.createElement("BUTTON");
	  	button.className = classNames.TODO_DELETE;
	  	button.innerHTML = "Delete TODO"
	  	button.addEventListener("click", function(event) {
	  		listItem = event.target.parentNode;
	  		childNodes = listItem.childNodes;
	  		for (i = 0; i < childNodes.length; i++) {
				if (childNodes[i].type === 'checkbox') {
	  				if (!childNodes[i].checked) {
  						uncheckedItemCount--;
	  				}
  				}
			}
	  		listItem.remove();
	  		currentItemCount--;
	  		
	  		itemCountSpan.textContent = currentItemCount;
	  		uncheckedCountSpan.textContent = uncheckedItemCount
	  	});

		listItem.appendChild(checkbox);
		listItem.appendChild(listItemLabel);
		listItem.appendChild(button);

		list.appendChild(listItem)
	  	
	  	itemCountSpan.textContent = currentItemCount;
	  	uncheckedCountSpan.textContent = uncheckedItemCount
	  	todoText.value=""
  }
}