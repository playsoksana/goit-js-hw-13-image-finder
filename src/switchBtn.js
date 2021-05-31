import Refs from '../src/js/refs.js';
const refs = Refs();

function switchBtn(value) {
    if (value === true) {
        refs.loading.setAttribute('hidden', `${value}`);
        refs.download.removeAttribute('hidden');
        return;
    }
    refs.loading.removeAttribute('hidden');
    refs.download.setAttribute('hidden', `${value}`);
};

export { switchBtn };