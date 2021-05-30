export default function scrollEnd() {
        const btn = document.getElementById('btn-load');
btn.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}