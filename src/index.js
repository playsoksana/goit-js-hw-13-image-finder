import {refs} from './js/refs.js';
import './js/apiService';
import error from './error.js'
import ApiService from './js/apiService.js';
import './js/openImg.js';
import { target, spinner } from './js/spinner.js';
import { switchBtn } from './js/switchBtn.js';

import './styles.css';
import '../node_modules/spin.js/spin.css'

import maktupList from './js/templates/maktupList.hbs';


refs.form.addEventListener('submit', findingОnSubmit);
refs.button.addEventListener('click', activButton);

let observerElement;
const observer = new IntersectionObserver(elements => {
  elements.forEach(element => {
    if (element.intersectionRatio > 0) {   
        addItionalLoading().then(el=>{           
           observer.unobserve(observerElement);
           observerElement = document.querySelector('.list > li:last-child');
           observer.observe(observerElement);         
        });
    }
  });
});


function activButton (ev) {
    const currentButton = ev.currentTarget;
    addItionalLoading().then(el=>{
        observerElement = document.querySelector('.list > li:last-child');
        observer.observe(observerElement);
        hiddenButton();
        currentButton.removeEventListener; 
   });   
}

const apiService = new ApiService;
function findingОnSubmit(ev) {
    ev.preventDefault();
    clearCardsOnDom();
    apiService.resetPage();
    const text = ev.target.elements.query.value.trim();

    if (text.length === 0) {
        hiddenButton();
        clearInput();
        return error();
    }

    apiService.searchQuery = ev.target.elements.query.value.trim();
    addItionalLoading();
    clearInput();    
};


async function addItionalLoading() {
 try {
    switchBtn(false);
    const response = await apiService.requestOnUrl(apiService.searchQuery);
    return conditionCheck(response)}
    catch {
     return error
 }
}


function conditionCheck (data) {
        if (data.hits.length < 1) {
            observer.observe(observerElement);
            hiddenButton();
            console.log('vse');
           // return message();
        }
        if(data.hits.length < 12 || data.total === 12) {
            observer.observe(observerElement);
            hiddenButton();
            return makeMaktup(data);
        }
        else {
            switchBtn(true);
            appendButton();
            return makeMaktup(data)
        }
    }

    import { defaultStack } from '@pnotify/core';
    function makeMaktup(data) {
    refs.list.insertAdjacentHTML('beforeend', maktupList(data));
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