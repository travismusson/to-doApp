//Start of Const declaration, using data attributes within the index
const listsContainer = document.querySelector('[data_lists]');	
const newListForm = document.querySelector('[data_new_list_form]');
const newListInput = document.querySelector('[data_new_list_input]');
const deleteListButton = document.querySelector('[data_delete_list_button]');
const editListButton = document.querySelector('[data_edit_list_button]');
const listDisplayContainer = document.querySelector('[data_list_display_container]');
const listTitleElement = document.querySelector('[data_list_title]');
const listCurrentElement = document.querySelector('[data_list_current]');
const tasksContainer = document.querySelector('[data_tasks]');
const taskTemplate = document.getElementById('task_template');
const newTaskForm = document.querySelector('[data_new_task_form]');
const newTaskInput = document.querySelector('[data_new_task_input]');

//Start of JSON declaration
const LOCAL_STORAGE_LIST_KEY = 'task.lists';	//using local storage to store information locally, making use of namespacing
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';


//Start of Variable declaration
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];	//get the local storage from the list key and if it doesnt exost pass thru the empty array
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);


//Start of addEventListener Declaring
listsContainer.addEventListener('click' , e =>{		//Creates an onclick listener thru program to detect the current active li
	if(e.target.tagName.toLowerCase() === 'li') {
		selectedListId = e.target.dataset.listId;
		saveandrender();
	}
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
        }
})



newListForm.addEventListener('submit', e => {
	e.preventDefault();	//prevents form from refreshing page
	const listName = newListInput.value;		//check list name from input element
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
		alert("Please enter the new name for the list!");
		editList();		//unfortunatley user has to press enter for the edit to function correctly
		}
		else{
			alert("Please Select a List to edit!");
		}
	})
	


newTaskForm.addEventListener('submit', e => {
	e.preventDefault();	//prevents form from refreshing page
	const taskName  = newTaskInput.value;		//check list name from input element
	if (taskName == null || taskName === ''){
		alert("List Cannot be empty!");				//if taskName is being passed as null OR a blank string then return to input
	}
	else{
		const task = createTask(taskName);
		newTaskInput.value = null;	//restores the placeholder text with default values
		const selectedList = lists.find(list => list.id === selectedListId);	//ensures selected list gets task
		selectedList.tasks.push(task);
		saveandrender();
	}
})	
	
	
	
	
	



//Start of Function Declaring
function editList(){								
			e.preventDefault()
			const listName  = newListInput.value;
				if (selectedListId == null || selectedListId === ''){
					alert("Please select a list!");								//if listname is being passed as null OR a blank string then return to input
				}
				else{
					if(listName == null || listName=== ''){
						alert("Please enter a valid list name!");
					}
					else{
						selectedListId.innerHTML = listName;
						newListInput.value = null;	//restores the placeholder text with default values
						lists.push(list);
						saveandrender();
					}
				}
}


function createList(name){
	 return { id: Date.now().toString(), name: name, tasks: [{}] }
}
function createTask(name){
	 return { id: Date.now().toString(), name: name, complete: false [{}] }
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
    renderLists();
	const selectedList = lists.find(list => list.id === selectedListId)
	
	if	(selectedListId == null){
		listDisplayContainer.style.display = 'none';  //hides task bar if no list is selected
	}
	else{
		listDisplayContainer.style.display = ''; //shows the task bar when selected.
		listCurrentElement.innerText = selectedList.name;
		taskCount(selectedList);
		clearElement(tasksContainer);
		renderTasks(selectedList);
	}
}

function renderTasks(selectedList){
	selectedList.tasks.forEach(task => {
		const taskElement = document.importNode(taskTemplate.content, true);
		const checkbox = taskElement.querySelector('input');
		checkbox.id = task.id;
		checkbox.checked = task.complete;
		const label = taskElement.querySelector('label');
		label.htmlFor = task.id;
		label.append(task.name);
        tasksContainer.appendChild(taskElement);
})
}

function taskCount(selectedList){
	const incompleteTasks = selectedList.tasks.filter(task => !task.complete).length;		//using filter to get incompleted tasks
	
}



function renderLists(){	//renders only lists
		lists.forEach(list => {		//for each list within our lists create..
		const listElement = document.createElement('li');	//creates an li
		listElement.dataset.listId = list.id;	//sets current list id
		listElement.classList.add("list_name");	//creates the class for the lists.
		listElement.innerText = list.name;	//creates name of list
		if(list.id === selectedListId){			//if list ID is = selected ID then	
		listElement.classList.add('activeList');	//checks if current list is active list
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