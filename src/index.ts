import {v4 as uuidv4} from 'uuid'
const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector('#newTaskForm') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#newTask')
type taskType = {
  id:string ,
  title:string,
  completed:boolean,
  createdAt:Date
}
const tasks : taskType[] = loadTasks();
tasks.forEach(addListItem)
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const task : taskType= {
    id :uuidv4(),
    title:input.value,
    completed:false,
    createdAt:new Date()
  }
  tasks.push(task)

  addListItem(task)
  input.value =''
})

function addListItem(task : taskType) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox'
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    console.log(tasks)
  })

  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item);
  saveTasks();
}
function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}
function loadTasks():taskType[] 
 {
  const taskJSON = localStorage.getItem('TASKS')
  if (taskJSON == null) return [];
  const tasks :taskType[]   = JSON.parse(taskJSON)
  return tasks;
}
console.log(list)