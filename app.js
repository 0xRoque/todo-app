let tasks = []

const task = document.querySelector('#task')
const btnAdd = document.querySelector('#btn-add')
const taskList = document.querySelector('#taskList')

btnAdd.addEventListener('click',function(){
    const taskName = task.value
    displayTaks(taskName)
    task.value='' 
})

function rendTaks(taskName){
    let li = document.createElement('li')
    let btnDelete = document.createElement('button')
    li.addEventListener('click',function(){
        if(li.style.textDecoration === 'line-through'){
            li.style.textDecoration = 'none'
        }else{
            li.style.textDecoration = 'line-through'
        }
    })
    btnDelete.addEventListener('click', function(){
       tasks = tasks.filter((element) => element !== taskName)
       localStorage.setItem('tasks',JSON.stringify(tasks))
        li.remove()
    })
    li.textContent = taskName
    taskList.prepend(li)
    btnDelete.textContent ='x'
    li.appendChild(btnDelete)

}

function displayTaks(taskName){
tasks.push(taskName)
localStorage.setItem('tasks', JSON.stringify(tasks))
rendTaks(taskName)
}

function loadTaks(){
    localStorage.getItem('taks')
    tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach((elemente)=>rendTaks(elemente))
}
loadTaks()
