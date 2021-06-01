const basicLightbox = require('basiclightbox');
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css"

import { refs } from "./refs.js";

export default refs.list.onclick = (ev) => {
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