// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

// add file dialog
const file_submit_btn = document.getElementById('file-submit-btn')
const folder_submit_btn = document.getElementById('folder-submit-btn')

file_submit_btn.addEventListener('click', function (event) {
  window.api.send('open_file_dialog')
})

folder_submit_btn.addEventListener('click', function (event) {
    window.api.send('open_folder_dialog')
})

window.api.receive('selected_directory', (details) => {
    alert(details)
})