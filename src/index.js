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

async function addItionalLoading() {
 try {
    switchBtn(false);
    const response = await apiService.requestOnUrl(apiService.searchQuery);
 
return conditionCheck(response);
 } catch {
     return error
 }
}


function conditionCheck (data) {
        if (data.hits.length < 1) {
            hiddenButton();
            clearInput();
            return error();
        }
        if(data.hits.length < 12) {
          hiddenButton();
          return makeMaktup(data);
        }
        else {
            switchBtn(true);
            appendButton();
            return makeMaktup(data)
        }
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



// ================
//  function loadingByScroll () {
//     const options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5
// }
// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             console.log('00000000');
//             const lazyCard = entry.target;
//             addItionalLoading();
//             hiddenButton();


//             observer.unobserve(lazyCard)
//         }
//        })
// }, options)


//     observer.observe(refs.btn);


// }

