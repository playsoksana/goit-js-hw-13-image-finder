import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
defaults.styling = 'material';
defaults.icons = 'material';
import 'material-design-icons/iconfont/material-icons.css';











import './styles.css';
import './js/apiService';

import maktupList from './js/templates/maktupList.hbs'
import ApiService from './js/apiService';
const apiService = new ApiService;
const refs = {
    body: document.querySelector("body"),
    form: document.querySelector("#search-form"),
    btn: document.querySelector('.btn-load'),
    list: document.querySelector('.list'),
    body:document.querySelector('body')
      
}

function makeMaktup(data) {    
   refs.list.insertAdjacentHTML('beforeend', maktupList(data));
}

refs.form.addEventListener('submit', findingОnSubmit);

function findingОnSubmit(ev) {
    clearCardsOnDom();
    ev.preventDefault();
    apiService.resetPage();
   
    apiService.searchQuery = ev.target.elements.query.value;
    addItionalLoading();
};

refs.btn.addEventListener('click', addItionalLoading);
function addItionalLoading() {
     refs.btn.scrollIntoView(false);
   return apiService.requestOnUrl(apiService.searchQuery)
       .then(data => makeMaktup(data));
}

function clearCardsOnDom() {
    refs.list.innerHTML = '';
}
