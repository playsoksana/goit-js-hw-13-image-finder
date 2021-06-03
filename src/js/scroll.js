import {refs} from './refs.js'

export default function scrollEnd() {
        refs.btn.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}