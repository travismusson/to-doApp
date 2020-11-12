const listsContainer = document.querySelector('[dataLists]');

let lists = [{
	id: 1,
	name: 'name'
}, {
	id: 2,
	name: 'todo'
}


]

function render() {			//creates lists for use
	
	clearElement(listsContainer);
	
	lists.forEach(lists => {		//for each list within our lists create..
		const listElement = document.createElement('li');	//creates an li
		listElement.classList.add("list_name");	//creates the class for the lists.
		listElement.innerText = list;	//creates name of list
		listsContainer.appendChild(listElement);	//appends to list container.
	})
}

function clearElement(element){		//clears elemetns within the list
	while (element.firstChild){
		element.removeChild(element.firstChild);
	}
}


render();