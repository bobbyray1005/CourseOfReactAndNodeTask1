import { notes, categories, icons } from './data.js';
import { makeRandomID, getDatesFromText } from "./functions.js";


let statisticsTable = document.getElementById('stats-table'),
    notesTable = document.getElementById('active-archive-table');

let activeNoteTableShown = true;


function loadIconsIntoHeader(){
    Array.from(document.getElementsByClassName('header-icon')).forEach(col => {
        if (col.classList.contains('archive'))
            col.innerHTML = icons.ARCHIVE_ICON;
        if (col.classList.contains('delete'))
            col.innerHTML = icons.DELETE_ICON;
        // Array.from(col.getElementsByTagName('path')).forEach( path => path.classList.add('header-icon'));
    });
}

function buildForm(note){
    let form = document.createElement('form');

    form.innerHTML = `
        <input type="text" name="name" value="${typeof note.name === "string"? note.name : ''}" placeholder="Name">
        <select name="categories">
        ` + Object.keys(categories).map(c => `<option value="${c}" ${note.category === c? 'selected' : ''}>${c}</option>`) + `
        </select>
        <input type="text" name="content" value="${note.content? note.content : ''}" placeholder="Content">
        <input type="submit" value="Submit"> 
    `;

    form.onsubmit = (event)=>{
        event.preventDefault();
        let newNote = {
            id: (note)? note.id : makeRandomID(10),
            name: event.target.name.value,
            created: (note)? note.created : new Date(),
            category: event.target.categories.value,
            content: event.target.content.value,
            dates: getDatesFromText(event.target.content.value),
            archived: (note)? note.archived : false
        }

        if (typeof note.name === "string")
            updateNote(newNote);
        else
            createNote(newNote);

        document.getElementsByClassName('wrapper-div')[0].remove();
    };


    let wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper-div';
    wrapperDiv.append(form);

    document.body.append(wrapperDiv);
}

//Note function
function createNote(note){
    notes.push(note);
    refreshTables();
}
function updateNote(note){
    notes.splice(notes.findIndex(n => n.id === note.id),1, note);
    refreshTables();
}
function deleteNote(noteID){
    notes.splice(notes.indexOf(notes.find(note => note.id === noteID)),1);
    document.getElementById(noteID).remove();
    clearInnerHTML(statisticsTable);
    buildStatisticTable();
}
function changeArchiveState(note){
    notes[notes.findIndex(n => n.id === note.id)].archived = !notes[notes.findIndex(n => n.id === note.id)].archived;
    refreshTables()
}

function refreshTables(){
    clearAllTables();
    buildNotesTable();
    buildStatisticTable();
}
function clearAllTables(){
    clearInnerHTML(notesTable);
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
            <td className="category-icon stats-icon">${ categories[category] }</td>
            <td className="category2">${ category }</td>
            <td className="active">${ active }</td>
            <td className="archived">${ total-active }</td>
        </tr>
    `;
}

function buildNotesTable(){
    notes.forEach(note => {
        if (!note.archived === activeNoteTableShown)
            notesTable.append( buildNotesTr(note) );
    })

}

function buildNotesTr(note){
    let tr = document.createElement('tr');
    tr.id = note.id;
    tr.innerHTML = `
            <td className="category-icon">${ categories[note.category] }</td>
            <td className="name">${ note.name }</td>
            <td className="created">${ note.created.toLocaleDateString() }</td>
            <td className="category1">${ note.category }</td>
            <td className="content">${ note.content }</td>
            <td className="dates">${ note.dates }</td>
    `;
    let tdEdit = document.createElement('td'),
        tdArchive = document.createElement('td'),
        tdDelete = document.createElement('td');

    tdEdit.className = "row-icon edit";
    tdEdit.addEventListener("click", ()=>{ buildForm(note) });
    tdEdit.innerHTML = icons.EDIT_ICON;

    tdArchive.className = "row-icon archive";
    tdArchive.addEventListener("click", ()=>{ changeArchiveState(note) });
    tdArchive.innerHTML = (activeNoteTableShown)? icons.UNARCHIVE_ICON : icons.ARCHIVE_ICON;

    tdDelete.className = "row-icon delete";
    tdDelete.addEventListener("click", ()=>{ deleteNote(note.id) });
    tdDelete.innerHTML = icons.DELETE_ICON;

    tr.append(tdEdit, tdArchive, tdDelete);
    return tr;
}

export {
    refreshTables,
    loadIconsIntoHeader,
    notes
}

function switchTables() {
    activeNoteTableShown = !activeNoteTableShown;
    clearInnerHTML(notesTable);
    buildNotesTable();
    document.getElementsByClassName('header-icon archive')[0].innerHTML = (activeNoteTableShown)? icons.ARCHIVE_ICON : icons.UNARCHIVE_ICON;
}

document.getElementById("table-switcher").addEventListener("click", switchTables);
document.getElementById("create-note-button").addEventListener("click", buildForm);
// document.getElementById("build-stats").addEventListener("click", refreshTables);
