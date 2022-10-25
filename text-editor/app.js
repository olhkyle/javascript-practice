// 유틸함수
const $ = (target) => {
    return document.querySelector(target);
}

const commandGroup = [{
    cmd: 'backColor',
    value: '#12b866',
    label: 'BG'
},{
    cmd: 'bold',
    label: 'Bold',
},{
    cmd: 'italic',
    label: 'Italic'
},{
    cmd: 'justifyCenter',
    label: 'Center'
},{
    cmd: 'justifyLeft',
    label: 'Left'
},{
    cmd: 'justifyRight',
    label: 'Right'
}, {
    cmd: 'underline',
    label: 'U'
}, {
    cmd: 'fontSize',
    value: '1-7',
    label: 'Size'
},{
    cmd: 'selectAll',
    label: 'SelectAll'
}]

const commandObj = {};

const $editorButtons = $('.editor-buttons');
const $editorEdit = $('.edit');
const $editorHtml = $('.html');
const $showContentButtons = $('.show-content-buttons');
const $showEditButton = $('.show-edit-button');
const $showHtmlButton = $('.show-html-button');


const changeContent = (commandKey) => {
    const command = commandObj[commandKey];
    const value = command.value ? prompt('Enter new Value', 'green') : '';
    document.execCommand(command.cmd, false, value);
}

const makeEditorButtons = () => {
    commandGroup.map((command) => {
        commandObj[command.cmd] = command;
        const element = document.createElement('button');
        element.innerText = command.label;
        element.addEventListener('click', (e) => {
            e.preventDefault();
            changeContent(command.cmd);
        })
        $editorButtons.appendChild(element);
    })
}

const changeMode = (e) => {
    if(!e.target.matches('.content')) return;
    if(e.target.matches('.show-edit-button')){
        $editorEdit.innerHTML = $editorHtml.innerText; 
        $editorEdit.classList.add('show');
        $editorHtml.classList.remove('show')
    } else {
        $editorHtml.innerText = $editorEdit.innerHTML; 
        $editorHtml.classList.add('show');
        $editorEdit.classList.remove('show')
    }
}

const init = () => {
    makeEditorButtons();
}

window.addEventListener('DOMContentLoaded', () => {
    init();
    $showContentButtons.addEventListener('click', changeMode);
})