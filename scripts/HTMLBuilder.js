import { categories } from "./data.js";

document.getElementById("create-note-button").addEventListener("click", buildForm);

function buildForm(name, created, category, content){
    let form = document.createElement('form');

    form.innerHTML = `
        <input type="text" name="name" value="${typeof name === "string"? name : ""}" placeholder="Name">
        <input type="date" name="date" value="${created}">
        <select name="categories">
        ` + categories.map(c => `<option value="${c}">${c}</option>`) + `
        </select>
        <input type="text" name="content" value="${content? content : ""}" placeholder="Content">
        <button type="submit">Submit</button> 
    `;

    document.body.append(form);
}

function buildTable(){

}
function refreshTable(){

}
export { buildForm, buildTable }
