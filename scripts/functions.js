function loadDataIntoTables(){

}

function loadIconsIntoHeader(archiveIcon, deleteIcon){
    Array.from(document.getElementsByClassName('header-icon')).forEach(col => {
        if (col.classList.contains('archive'))
            col.innerHTML = archiveIcon;
        if (col.classList.contains('delete'))
            col.innerHTML = deleteIcon;
        // Array.from(col.getElementsByTagName('path')).forEach( path => path.classList.add('header-icon'));
    });
}

export {
    loadDataIntoTables,
    loadIconsIntoHeader
}
