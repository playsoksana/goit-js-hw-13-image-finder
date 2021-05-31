import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, defaultStack } from '@pnotify/core';
defaults.styling = 'material';
import error from './error.js'
// ==
import './styles.css';
import './js/apiService';
import Refs from './js/refs.js';
import maktupList from './js/templates/maktupList.hbs'
import ApiService from './js/apiService.js';
import scrollEnd from './js/scroll.js'
// == 
const basicLightbox = require('basiclightbox');
// import * as basicLightbox from 'basicLightbox'; 
// ==
import {Spinner} from 'spin.js';

// ==
const refs = Refs();
const apiService = new ApiService;
// ==

function makeMaktup(data) {
    refs.list.insertAdjacentHTML('beforeend', maktupList(data));
    defaultStack.close();
    refs.btn.removeAttribute('hidden', 'false');
    scrollEnd();
}

refs.form.addEventListener('submit', findingОnSubmit);

function findingОnSubmit(ev) {
    clearCardsOnDom();
    apiService.resetPage();
    ev.preventDefault();
    apiService.searchQuery = ev.target.elements.query.value;
    addItionalLoading();
   
    enableLoadingEffect(false);
};

refs.btn.addEventListener('click', addItionalLoading);
function addItionalLoading() {
        enableLoadingEffect(false);
      return apiService.requestOnUrl(apiService.searchQuery)
          .then(data => {
            if (data.hits.length === 0) {
                  return error();
              }
                 enableLoadingEffect(true);
              return makeMaktup(data)
          })
          .catch(error);
}

function clearCardsOnDom() {
    refs.list.innerHTML = '';
};
// ==============

refs.list.onclick = (ev) => {
    if (!ev.target.getAttribute('data')) {
        return;
    }
    const linkImg = ev.target.getAttribute('data');
    const instance = basicLightbox.create(`
     <div class="modal" >
        <img class='img' src=${linkImg} alt="image" allowfullscreen>
     </div>
 `);
    instance.show();
    document.querySelector('.modal').onclick = (ev) => {
     instance.close();
}
};

// ==============


var opts = {
  lines: 13, // The number of lines to draw
  length: 2, // The length of each line
  width: 3, // The line thickness
  radius: 5, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '9px', // Top position relative to parent
  left: '7%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

var target = document.getElementById('spinner');
var spinner = new Spinner(opts).spin(target);
spinner.spin(target);

function enableLoadingEffect(value) {
    if (value === true) {
        refs.loading.setAttribute('hidden', `${value}`);
        refs.download.removeAttribute('hidden');
        return;
    }
    refs.loading.removeAttribute('hidden');
    refs.download.setAttribute('hidden', `${value}`);
};
