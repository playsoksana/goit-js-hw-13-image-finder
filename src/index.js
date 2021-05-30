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
//const basicLightbox = require('basiclightbox');
//import * as basicLightbox from 'basicLightbox';
const basicLightbox = require('basiclightbox');


// ==S
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
};

refs.btn.addEventListener('click', addItionalLoading);
function addItionalLoading() {
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
};

// refs.list.addEventListener('click', openModal);
// function openModal(ev) {
//     console.log(ev.target.getAttribute('data'));
//     const linkImg = ev.target.getAttribute('data');


//     const instance = basicLightbox.create(`
//     <div class="modal">
//         <img class='img' src=${linkImg} alt="image">
//     </div>
// `);
//     instance.show();

//    }

 
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



// ====================


// document.querySelector('button.image').onclick = () => {

// 	basicLightbox.create(`
// 		<img width="1400" height="900" src="https://placehold.it/1400x900">
// 	`).show()

// }

// document.querySelector('button.iframe').onclick = () => {

// 	basicLightbox.create(`
// 		<iframe width="560" height="315" src="https://www.youtube.com/embed/Scxs7L0vhZ4" frameborder="0" allowfullscreen></iframe>
// 	`).show()

// }

// document.querySelector('button.video').onclick = () => {

// 	basicLightbox.create(`
// 		<video controls data-id="2">
// 			<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4">
// 		</video>
// 	`).show()

// }

// document.querySelector('button.html').onclick = () => {

// 	basicLightbox.create(`
// 		<h1>HTML</h1>
// 		<p>HTML inside a lightbox.</p>
// 	`).show()

// }

// document.querySelector('button.callbacks').onclick = (e) => {

// 	const html = `
// 		<h1>Callbacks</h1>
// 		<p>Take a look at the console of your browser.<br>This lightbox will close automaticly to demonstrate the close-callback.</p>
// 	`

// 	const instance = basicLightbox.create(html, {
// 		onShow: (instance) => console.log('onShow', instance),
// 		onClose: (instance) => console.log('onClose', instance)
// 	})

// 	instance.show((instance) => console.log('finished show()', instance))

// 	setTimeout(() => {
// 		instance.close((instance) => console.log('finished close()', instance))
// 	}, 3000)

// }

// document.querySelector('button.blocked').onclick = () => {

// 	const html = `
// 		<h1>Blocked</h1>
// 		<p>It's not possible to close this lightbox,<br>because the onClose function returns false.</p>
// 	`

// 	basicLightbox.create(html, {
// 		onClose: () => false
// 	}).show()

// }


// document.querySelector('button.notClosable').onclick = () => {

// 	const html = `
// 		<h1>Not closable</h1>
// 		<p>It's not possible to close this lightbox with a click.</p>
// 	`

// 	basicLightbox.create(html, {
// 		closable: false
// 	}).show()

// }

// document.querySelector('button.modify').onclick = () => {

// 	const instance = basicLightbox.create(`
// 		<h1>Modify HTML</h1>
// 		<p>You can modify the HTML of the lightbox using JS.</p>
// 	`)

// 	instance.element().insertAdjacentHTML('afterbegin', '<p>Before placeholder</p>')
// 	instance.element().insertAdjacentHTML('beforeend', '<p>After placeholder</p>')

// 	instance.show()

// }

// document.querySelector('button.classNames').onclick = () => {

// 	const html = `
// 		<h1>Custom classNames</h1>
// 		<p>You can add custom classNames to the lightbox element.</p>
// 	`

// 	basicLightbox.create(html, {
// 		className: 'classNames one two three'
// 	}).show()

// }

// const stack = () => {

// 	const html = `<button>Open another lightbox</button>`
// 	const instance = basicLightbox.create(html)

// 	instance.element().querySelector('button').onclick = stack
// 	instance.show()

// }

// document.querySelector('button.stack').onclick = stack

