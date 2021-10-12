import { notes, categories, icons } from './data.js';
// import { makeID } from "./functions";

let statisticsTable = document.getElementById('stats-table'),
    notesTable = document.getElementById('active-archive-table');


function loadIconsIntoHeader(){
    Array.from(document.getElementsByClassName('header-icon')).forEach(col => {
        if (col.classList.contains('archive'))
            col.innerHTML = icons.ARCHIVE_ICON;
        if (col.classList.contains('delete'))
            col.innerHTML = icons.DELETE_ICON;
        // Array.from(col.getElementsByTagName('path')).forEach( path => path.classList.add('header-icon'));
    });
}

function buildForm(name, created, category, content){
    let form = document.createElement('form');

    form.innerHTML = `
        <input type="text" name="name" value="${typeof name === "string"? name : ''}" placeholder="Name">
        <input type="date" name="date" value="${created}">
        <select name="categories">
        ` + categories.map(c => `<option value="${c}">${c}</option>`) + `
        </select>
        <input type="text" name="content" value="${content? content : ''}" placeholder="Content">
        <button type="submit" >Submit</button> 
    `;

    document.body.append(form);
}

//Note function
function createNote(note){
    notes.push(note);
    refreshTables();
}
function updateNote(note){
    notes.push(note);
    refreshTables();
}
function deleteNote(noteID){
    notes = notes.filter(note => note.id !== noteID);
    document.getElementById(noteID).remove();
}


function refreshTables(){
    clearAllTables();
    buildStatisticTable();
    // buildNotesTable();
}
function clearAllTables(){
    // clearInnerHTML(notesTable);
    clearInnerHTML(statisticsTable);
}
function clearInnerHTML(parent){
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}
function buildStatisticTable(){
    let Ideas, Quotes, Tasks, Thoughts, IdeasActive, QuotesActive, TasksActive, ThoughtsActive;
    Ideas = Quotes = Tasks = Thoughts = IdeasActive = QuotesActive = TasksActive = ThoughtsActive = 0;

    notes.forEach(note => {
        if (note.category === 'Idea'){
            Ideas++;
            if (!note.archived)
                IdeasActive++;
        }
        if (note.category === 'Quote') {
            Quotes++;
            if (!note.archived)
                QuotesActive++;
        }
        if (note.category === 'Task') {
            Tasks++;
            if (!note.archived)
                TasksActive++;
        }
        if (note.category === 'Random Thought') {
            Thoughts++;
            if (!note.archived)
                ThoughtsActive++;
        }
    });

    statisticsTable.innerHTML += (Ideas)? buildStatTr('Idea', IdeasActive, Ideas) : ``;
    statisticsTable.innerHTML += (Quotes)? buildStatTr('Quote', QuotesActive, Quotes) : ``;
    statisticsTable.innerHTML += (Tasks)? buildStatTr('Task', TasksActive, Tasks) : ``;
    statisticsTable.innerHTML += (Thoughts)? buildStatTr('Random Thought', ThoughtsActive, Thoughts) : ``;
}
function buildStatTr(category, active, total){
    return `
        <tr>
            <td className="category-icon">${ categories[category] }</td>
            <td className="category2">${ category }</td>
            <td className="active">${ active }</td>
            <td className="archived">${ total-active }</td>
        </tr>
    `;
}

function buildNotesTable(){

}

export {
    refreshTables,
    loadIconsIntoHeader,
    notes
}


document.getElementById("create-note-button").addEventListener("click", buildForm);
document.getElementById("build-stats").addEventListener("click", refreshTables);
