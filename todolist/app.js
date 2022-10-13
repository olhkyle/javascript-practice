
const get = (target) => {return document.querySelector(target)};
const create = (target) => {return document.createElement(target)};

const API_URL =  'http://localhost:3000/todos';
const $todos = get('.todo-list-wrapper');
const $form = get('.todo-nav');
const $input = get('.todo-nav input');


const createTodoElement = (todo) => {
    let { content, completed, id } = todo;
    const $todo = create('div');
    const isCompleted = completed ? 'checked' : '';
    $todo.classList.add('item');
    $todo.classList.add('todo');
    $todo.dataset.id = id;
    $todo.innerHTML = `
        <div class="input-group">
            <input type="checkbox" class="todo-checkbox" ${isCompleted}>
            <label>${content}</label>
            <input type="text" class="todo-input" value="${content}">
        </div>
        <div class="btn-group">
            <button type="button" class="priorities-btn">
                <i class="fa-solid fa-star"></i>
            </button>
            <button type="button" class="fix-btn">
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-duotone fa-pencil" style="display: none"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `
    return $todo;
}

const renderAllTodos = (todos) => {
    $todos.innerHTML = '';
    todos.forEach(todo => {
        const todoEl = createTodoElement(todo);
        $todos.appendChild(todoEl);
    })
}

// fetchAPI를 활용해서 db.json으로부터 데이터를 todos라는 데이터를 받아온다.
const getTodos = () => {    
    fetch(API_URL)
    .then(response => response.json())
    .then(todos => renderAllTodos(todos))
    .catch(error => console.error(error.message));
}


const addTodo = (e) => {
    e.preventDefault();
    if(!$input.value) return;
    const todo = {
        content: $input.value,
        completed: false,
    }
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(todo),
    })
    .then(response => response.json()) // axios에서는 response.json() 처리가 자동으로 되기 때문에 이 과정은 생략가능
    .then(() => {
        $input.value = '';
        $input.focus();
    })
    .catch(error => console.error(error.message));
}


const toggleTodo = (e) => {
    e.preventDefault();
    if(!e.target.matches('.todo-checkbox')) return;
    const $item = e.target.closest('.item'); // 캡쳐링을 이용해서 target의 부모까지 갔다가 내려오면서 가장 가까이 있는 item을 찾아냄
    const id = $item.dataset.id;
    const completed = e.target.checked; // boolean 값 반환

    fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({completed})
    })
    .then(response => response.json())
    .then(getTodos())
    .catch(error => console.error(error.message));
}


const changeEditMode = (e) => {
    const $item = e.target.closest('.item');
    const $label = $item.querySelector('label');
    const $inputEl = $item.querySelector('.todo-input');
    const $fixBtn = get('.fix-btn');
    const newValue = $inputEl.value;
    const doEdit = () => {
        $fixBtn.querySelector('i:first-child').style.display = 'none';
        $fixBtn.querySelector('i:last-child').style.display = 'block';
        $fixBtn.style.backgroundColor = 'black'
        $fixBtn.querySelector('i:last-child').style.color = '#fff'


        $label.style.display = 'none';
        $inputEl.style.display = 'block';
        $inputEl.classList.add('isFocused');
        $item.style.border = '1px solid #000'
        $inputEl.focus(); // 자동으로 input에 focus가 가도록 설정, 하지만 텍스트의 제일 앞에 커서가 위치하게 됨
        $inputEl.value = ''; 
        $inputEl.value = newValue; // 기존에 input에 있던 값을 새로운 변수에 미리 할당해놓고 다시 넣기
    }
    if(e.target.matches('.fix-btn') || e.target.matches('.fix-btn i')){
        doEdit();
    }
    if(e.target.matches('label')){
        doEdit();
    }
    
}

const editTodo = (e) => {
    if(e.target.className === 'fa-duotone fa-pencil' || e.keyCode === 13){
        const $item = e.target.closest('.item');
        const $inputEl = $item.querySelector('.todo-input');
        const id = $item.dataset.id;
        const content = $inputEl.value;
        fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({content}),
        })
        .then(response => response.json())
        .then(getTodos)
        .catch(error => console.error(error.message));
    }
}

const deleteTodo = (e) => {
    if(e.target.className === 'delete-btn'){{
        const $item = e.target.closest('.item');
        const id = $item.dataset.id;
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(getTodos)
        .error(error => console.error(error.message));
    }}
}

const showTodosCount = (count) => {
    const $count = get('span.count');
    const spanEl = create('span');

    spanEl.innerHTML = `${count}`;
    $count.appendChild(spanEl);
}

const currentTodosLength = () => {
    let count;
    fetch(`${API_URL}`)
    .then(response => response.json())
    .then(todos => {
        count = todos.length
        showTodosCount(count);
    })
    .catch(error => console.error(error.message));
    
}

const makePriorityTodo = (e) => {
    const $target = e.target;
    if(e.target.className === 'priorities-btn' || e.target.matches('.priorities-btn i')){
        const $todo = $target.closest('.todo');
        console.log($todo);
        $target.classList.add('selected');
        $target.style.color = '#fff';
        $target.style.backgroundColor = '#2cbc63'
        if($target.classList.contains('selected')){
            $todo.style.border = '1px solid #2cbc63';
        }
    }
}

const init = () => {
    window.addEventListener('DOMContentLoaded', () => {
        getTodos();
    })
    currentTodosLength();
    $form.addEventListener('submit', addTodo);
    $todos.addEventListener('click', toggleTodo);
    $todos.addEventListener('click', changeEditMode);
    $todos.addEventListener('click', editTodo);
    $todos.addEventListener('keydown', editTodo);
    $todos.addEventListener('click', deleteTodo);
    $todos.addEventListener('click', makePriorityTodo);
}


init();

