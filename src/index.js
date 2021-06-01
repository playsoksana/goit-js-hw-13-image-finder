import './styles.css';
import '../node_modules/spin.js/spin.css'
import {refs} from './js/refs.js';
import { defaultStack } from '@pnotify/core';
import './js/apiService';
import scrollEnd from './js/scroll.js'
import error from './error.js'
import ApiService from './js/apiService.js';
import './js/openImg.js';
import { target, spinner } from './js/spinner.js';
import { switchBtn } from './js/switchBtn.js';
import maktupList from './js/templates/maktupList.hbs';


refs.form.addEventListener('submit', findingОnSubmit);
refs.btn.addEventListener('click', addItionalLoading);



const apiService = new ApiService;
function findingОnSubmit(ev) {
    clearCardsOnDom();
    apiService.resetPage();
    ev.preventDefault();
    const text = ev.target.elements.query.value.trim();
    if (text.length === 0) {
        hiddenButton();
        clearInput();
        return error();
    }
    apiService.searchQuery = ev.target.elements.query.value.trim();
    addItionalLoading();
    clearInput();
    switchBtn(false);
};

function addItionalLoading() {

        switchBtn(false);
      return apiService.requestOnUrl(apiService.searchQuery)
          .then(data => {
              if (data.hits.length < 1) {
                  hiddenButton();
                  clearInput();
                  return error();
              }
              else {
                  switchBtn(true);
                  appendButton();
                  return makeMaktup(data)
              }
          }).catch(error);
}

function makeMaktup(data) {
    refs.list.insertAdjacentHTML('beforeend', maktupList(data));
     scrollEnd();
    defaultStack.close();
   
}

function clearCardsOnDom() {
    refs.list.innerHTML = '';
};

function hiddenButton() {
    refs.btn.setAttribute('hidden', "true");
}

function appendButton() {
    refs.btn.removeAttribute('hidden');
}

function clearInput() {
    refs.input.value = '';
}

spinner.spin(target);

