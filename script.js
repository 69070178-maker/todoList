/* To-do List – เชื่อมต่อกับ index.html */
// อ้างอิง element จาก index.html ผ่าน ID
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// คีย์สำหรับเก็บข้อมูลใน localStorage
const STORAGE_KEY = 'todos';

// โหลดรายการจาก localStorage (ถ้าไม่มีให้เป็น array ว่าง)
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// บันทึกข้อมูลลง localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// วาดรายการทั้งหมดบนหน้าเว็บ
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    // ข้อความรายการ
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    li.appendChild(textSpan);

    // ปุ่มลบ
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'ลบ';
    deleteBtn.addEventListener('click', () => {
      deleteTodo(index);
    });
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// เพิ่มรายการใหม่
function addTodo() {
  const text = todoInput.value.trim();

  // ถ้าเป็นช่องว่างจะไม่ทำงาน
  if (text === '') return;

  todos.push({ text });
  saveTodos();
  renderTodos();

  // ล้างข้อความและโฟกัสกลับที่ช่องพิมพ์
  todoInput.value = '';
  todoInput.focus();
}

// ลบรายการตามตำแหน่ง
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// เหตุการณ์กดปุ่มเพิ่ม
addBtn.addEventListener('click', addTodo);

// เหตุการณ์กด Enter ในช่องพิมพ์
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// เมื่อโหลดหน้าเว็บ: วาดรายการจาก localStorage อัตโนมัติ
renderTodos();
