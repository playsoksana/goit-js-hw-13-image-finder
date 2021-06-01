import {Spinner} from 'spin.js';

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

 var target = document.getElementById('spin');
 var spinner = new Spinner(opts).spin(target);


export { Spinner, opts, target,  spinner};