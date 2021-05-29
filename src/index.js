import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, defaultModules, defaultStack } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';
import error from './error.js'
// ==
import './styles.css';
import './js/apiService';
// ==
import Refs from './js/refs.js';
const refs = Refs();
// ==
import maktupList from './js/templates/maktupList.hbs'
import ApiService from './js/apiService';
// ==
const apiService = new ApiService;
// ==

function makeMaktup(data) {
    refs.list.insertAdjacentHTML('beforeend', maktupList(data));
    defaultStack.close();
}

refs.form.addEventListener('submit', findingОnSubmit);

function findingОnSubmit(ev) {
    clearCardsOnDom();
   
    apiService.resetPage();
    ev.preventDefault();
    apiService.searchQuery = ev.target.elements.query.value;
    addItionalLoading();
};

refs.btn.addEventListener('click', addItionalLoading);
function addItionalLoading() {
    // refs.btn.scrollIntoView(false);
  
    const element = document.getElementById('btn-load');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
  
      return apiService.requestOnUrl(apiService.searchQuery)
          .then(data => {
            if (data.hits.length === 0) {
                  return error();
              }
              return makeMaktup(data)
          })
          .catch(error);
}

function clearCardsOnDom() {
    refs.list.innerHTML = '';
}