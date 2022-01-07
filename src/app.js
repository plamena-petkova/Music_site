import {render, page} from './lib.js';
import { homePage } from './views/home.js';
import { getUserData } from './util.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import * as api from './util.js';
import { searchPage } from './views/search.js';

window.api = api;


const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

updateUserNavigate();

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage);


page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNavigate = updateUserNavigate;
    next();
}

export function updateUserNavigate() {
    const userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}


function onLogout() {
    logout();
    page.redirect('/')
}