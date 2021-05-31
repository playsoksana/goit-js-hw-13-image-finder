import {  defaultStack } from '@pnotify/core';
import './js/apiService';
import Refs from './js/refs.js';
import scrollEnd from './js/scroll.js'
import error from './error.js'
import './styles.css';
import ApiService from './js/apiService.js';
import maktupList from './js/templates/maktupList.hbs';
import { target, spinner } from './js/spinner.js';
import * as openImg from './js/openImg.js';
import { switchBtn } from './switchBtn.js';
const apiService = new ApiService;
const refs = Refs();


function makeMaktup(data) {
    refs.list.insertAdjacentHTML('beforeend', maktupList(data));
    defaultStack.close();
    refs.btn.removeAttribute('hidden');
    scrollEnd();
}

refs.form.addEventListener('submit', findingОnSubmit);

function findingОnSubmit(ev) {
    clearCardsOnDom();
    apiService.resetPage();
    ev.preventDefault();
    apiService.searchQuery = ev.target.elements.query.value;
    addItionalLoading();
   
    switchBtn(false);
};

refs.btn.addEventListener('click', addItionalLoading);
function addItionalLoading() {
        switchBtn(false);
      return apiService.requestOnUrl(apiService.searchQuery)
          .then(data => {
            if (data.hits.length === 0) {
                  return error();
              }
                 switchBtn(true);
              return makeMaktup(data)
          })
          .catch(error);
}

function clearCardsOnDom() {
    refs.list.innerHTML = '';
};

openImg();
spinner.spin(target);