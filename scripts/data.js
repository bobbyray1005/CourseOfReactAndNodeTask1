import * as ICONS from './svgs.js';

export let icons = ICONS

export let categories = {
    "Idea" : icons.IDEA_ICON,
    "Quote": icons.QUOTE_ICON,
    "Task": icons.TASK_ICON,
    "Random Thought": icons.THOUGHT_ICON
}

export let notes = [
    {
        id: "ZDZ_XnG0Ut",
        name: "Shopping list",
        created: new Date(),
        category: "Task",
        content: "Tomatoes, bread",
        dates: "",
        archived: false
    },
    {
        id: "WOkLYrlHDT",
        name: "The theory of evolution",
        created: new Date(),
        category: "Random Thought",
        content: "The evolution is ..........",
        dates: "",
        archived: false
    },
    {
        id: "ZMk3ZwiRHz",
        name: "New Feature",
        created: new Date(),
        category: "Idea",
        content: "Implement some feature in this app",
        dates: "",
        archived: false
    },
    {
        id: "sizDU41a7_",
        name: "Dentist",
        created: new Date(),
        category: "Task",
        content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
        dates: "3/5/2021, 5/5/2021",
        archived: false
    },
    {
        id: "fpOx4iIX0U",
        name: "William Gaddis",
        created: new Date(),
        category: "Quote",
        content: "Power doesn't come with bla bla bla",
        dates: "",
        archived: true
    },
    {
        id: "LI_RUnkMNo",
        name: "Book",
        created: new Date(),
        category: "Task",
        content: "The Lean Statrup",
        dates: "",
        archived: true
    },
    // {
    //     name: "",
    //     created: "",
    //     category: "",
    //     content: "",
    //     dates: "",
    //     archived: true
    // },
    // {
    //     name: "",
    //     created: "",
    //     category: "",
    //     content: "",
    //     dates: "",
    //     archived: false
    // },
    // {
    //     name: "",
    //     created: "",
    //     category: "",
    //     content: "",
    //     dates: "",
    //     archived: false
    // },
]
