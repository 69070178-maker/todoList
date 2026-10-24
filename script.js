const todoInput = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const todoList = document.getElementById('todo-list')


let todos = JSON.parse(localStorage.getItem('myTodos')) || []

function saveToLocalStorage() {
    localStorage.setItem('myTodos', JSON.stringify(todos))
}


function renderTodos() {
    todoList.innerHTML = ''

    todos.forEach((todoText, index) => {
        const li = document.createElement('li')
        li.textContent = todoText + ' '


        const deleteBtn = document.createElement('button')
        deleteBtn.type = 'button'
        deleteBtn.textContent = 'ลบ'

        deleteBtn.addEventListener('click', function () {
            removeTodo(index)
        })

        li.appendChild(deleteBtn)
        todoList.appendChild(li)
    })
}


function addTodo() {
    const text = todoInput.value.trim()

    if (text === '') return

    todos.push(text)
    saveToLocalStorage()
    renderTodos()

    todoInput.value = ''
    todoInput.focus()
}

// 4. ฟังก์ชันลบรายการตาม Index
function removeTodo(index) {
    todos.splice(index, 1)
    saveToLocalStorage()
    renderTodos()
}

addBtn.addEventListener('click', addTodo)

todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo()
    }
})

renderTodos()
