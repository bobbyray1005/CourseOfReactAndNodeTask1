// import { archiveIcon, unarchiveIcon, editIcon, deleteIcon, ideaIcon, quoteIcon, taskIcon, thoughtIcon } from './svgs';
import * as icons from './scripts/svgs.js';
import { loadDataIntoTables, loadIconsIntoHeader } from './scripts/functions.js';


loadIconsIntoHeader( icons.archiveIcon, icons.deleteIcon );

loadDataIntoTables();
