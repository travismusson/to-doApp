//Start of Const declaration, using data attributes within the index
const listsContainer = document.querySelector('[data_lists]');	
const newListForm = document.querySelector('[data_new_list_form]');
const newListInput = document.querySelector('[data_new_list_input]');
const deleteListButton = document.querySelector('[data_delete_list_button]');
const editListButton = document.querySelector('[data_edit_list_button]');

//Start of JSON declaration
const LOCAL_STORAGE_LIST_KEY = 'task.lists'	//using local storage to store information locally, making use of namespacing
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'


//Start of Variable declaration
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];	//get the local storage from the list key and if it doesnt exost pass thru the empty array
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)


//Start of addEventListener Declaring
listsContainer.addEventListener('click' , e =>{		//Creates an onclick listener thru program to detect the current active li
	if(e.target.tagName.toLowerCase() === 'li') {
		selectedListId = e.target.dataset.listId;
		saveandrender();
	}
})

newListForm.addEventListener('submit', e => {
	e.preventDefault();	//prevents form from refreshing page
	const listName  = newListInput.value;		//check list name from input element
	if (listName == null || listName === ''){
		alert("List Cannot be empty!");		//if listname is being passed as null OR a blank string then return to input
	}
	else{
		const list = createList(listName);
		newListInput.value = null;	//restores the placeholder text with default values
		lists.push(list);	//creates the lists added.
		saveandrender();
	}
})

deleteListButton.addEventListener('click', e =>{
	lists = lists.filter(list => list.id !== selectedListId); //give all lists that are not selected
	selectedListId = null;
	saveandrender();
})

	editListButton.addEventListener('click', e =>{					
		if(lists = lists.filter(list => list.id !== selectedListId)){ 
		editList();
		}
		else{
			alert("Please Select a List to edit!");
		}
	})
	





//Start of Function Declaring
function editList(){								
			e.preventDefault()
			const listName  = newListInput.value;
				if (listName == null || listName === ''){
					alert("List Cannot be empty!");								//if listname is being passed as null OR a blank string then return to input
				}
				else{
					selectedListId.innerHTML = listName;
					
					
					
					
					
					newListInput.value = null;	//restores the placeholder text with default values
					lists.push(list);	//creates the lists added.					//Temporary testing with push and editing list
					saveandrender();
				}
}


function createList(name){
	 return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveandrender(){
	save();
	render();
}


function save() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));	//saves current active lists
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);		//saves current active list
}





function render() {			//creates lists for use
	clearElement(listsContainer);
	lists.forEach(list => {		//for each list within our lists create..
		const listElement = document.createElement('li');	//creates an li
		listElement.dataset.listId = list.id;	//sets current list id
		listElement.classList.add("list_name");	//creates the class for the lists.
		listElement.innerText = list.name;	//creates name of list
		if(list.id === selectedListId){			//if list ID is = selected ID then	
		listElement.classList.add('activeList')	//checks if current list is active list
		}			
		listsContainer.appendChild(listElement);	//appends to list container.
	})
}

function clearElement(element){		//clears elemetns within the list
	while (element.firstChild){
		element.removeChild(element.firstChild);
	}
}


render();