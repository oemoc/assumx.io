const noteInput = document.getElementById('note-input');
const saveBtn = document.getElementById('save-btn');
const notesList = document.getElementById('notes-list');

// Загружаем массив заметок из localStorage или создаем пустой
let notes = JSON.parse(localStorage.getItem('myNotesList')) || [];

// Функция для вывода всех заметок на экран
function displayNotes() {
    notesList.innerHTML = ''; // Очищаем список перед перерисовкой
    
    notes.forEach((noteText, index) => {
        const li = document.createElement('li');
        li.className = 'note-item';
        
        // Создаем текст заметки
        const textSpan = document.createElement('span');
        textSpan.textContent = noteText;
        
        // Создаем кнопку удаления крестиком [x] для конкретной заметки
        const delBtn = document.createElement('button');
        delBtn.textContent = '×';
        delBtn.className = 'delete-single-btn';
        delBtn.onclick = () => deleteNote(index);
        
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        notesList.appendChild(li);
    });
}

// Функция сохранения всего массива в localStorage
function saveToStorage() {
    localStorage.setItem('myNotesList', JSON.stringify(notes));
    displayNotes();
}

// Функция полной очистки через команду /clear
function clearAllNotes() {
    notes = [];
    saveToStorage();
    noteInput.value = '';
    alert('Все заметки удалены!');
}

// Функция удаления одной заметки по её индексу
function deleteNote(index) {
    notes.splice(index, 1); // Удаляем 1 элемент
    saveToStorage();
}

// Обработчик клика на кнопку «Добавить»
saveBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    
    if (!text) return; // Если поле пустое, ничего не делаем

    // Проверяем команду очистки
    if (text.toLowerCase() === '/clear') {
        clearAllNotes();
        return;
    }

    // Иначе добавляем заметку в массив
    notes.push(text);
    saveToStorage();
    noteInput.value = ''; // Очищаем поле ввода
});

// Отображаем заметки при первой загрузке страницы
document.addEventListener('DOMContentLoaded', displayNotes);