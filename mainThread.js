import { archiveIcon, unarchiveIcon, editIcon, deleteIcon, ideaIcon, quoteIcon, taskIcon, thoughtIcon } from './scripts/svgs.js';
// import *  from './scripts/svgs.js';
import { loadDataIntoTables,
    loadIconsIntoHeader,
    switchTables,
    refreshTables,
    openForm,
    loadLocalData} from './scripts/functions.js';
import { buildForm } from './scripts/HTMLBuilder.js';

loadIconsIntoHeader( archiveIcon, deleteIcon );

loadDataIntoTables();
