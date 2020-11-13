const listsContainer = document.querySelector('[data_lists]');	//creates list container using the attribute data_lists
const newListForm = document.querySelector('[data_new_list_form]');
const newListInput = document.querySelector('[data_new_list_input]');

let lists = [];	//creates an object in order to identify the active lists


newListForm.addEventListener('submit', e => {
	e.preventDefault();	//prevents form from refreshing page
	const listName  = newListInput.value;		//check list name from input element
	if (listName == null || listName === '') return		//if listname is being passed as null OR a blank string then return to input
	const list = createList(listName);
	newListInput.value = null;
	lists.push(list);
	render();
})

function createList(name){
	 return { id: Date.now().toString(), name: name, tasks: [] }
}


function render() {			//creates lists for use
	clearElement(listsContainer);
	lists.forEach(list => {		//for each list within our lists create..
		const listElement = document.createElement('li');	//creates an li
		listElement.dataset.listId = list.id;
		listElement.classList.add("list_name");	//creates the class for the lists.
		listElement.innerText = list.name;	//creates name of list
		listsContainer.appendChild(listElement);	//appends to list container.
	})
}

function clearElement(element){		//clears elemetns within the list
	while (element.firstChild){
		element.removeChild(element.firstChild);
	}
}


render();