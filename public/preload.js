let {
  ipcRenderer,
  dialog, 
  remote
} = require('electron')

process.once("loaded", () => {
  window.renderer = {
    ipcRenderer,
    dialog, 
    remote
  } 
});