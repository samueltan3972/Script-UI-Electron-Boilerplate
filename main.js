const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
let { PythonShell } = require('python-shell')

const PRODUCTION = true

console.log(app.getAppPath())

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('ui.html')

    // for Debug
    // win.webContents.openDevTools()
}



app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

function run_python_script(files){
    let options = {
        // pythonOptions: ['-f'],
        args: ['-f', files]
    };
    
    if(PRODUCTION) script_path = path.join(app.getAppPath(), "..",  "python_scripts/crop_synthetic_lp.py")
    else script_path = path.join(app.getAppPath(), "python_scripts/crop_synthetic_lp.py")
    
    PythonShell.run(script_path, options).then(function (results) {
        console.log('results', results);
    });
}

ipc.on('open_file_dialog', function (event, args) {
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(function (files) {
        if(!files.canceled) { 
            run_python_script(files.filePaths)
            event.sender.send('selected_directory', "Done")
        }
    })
})

ipc.on('open_folder_dialog', function (event, args) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (files) {
        if(!files.canceled) { 
            run_python_script(files.filePaths)
            event.sender.send('selected_directory', "Done")
        }
    })
})

// ipc.handle('open-file-dialog', async (event, arg) => {
//     return new Promise(function(resolve, reject) {
//       // do stuff
//       if (true) {
//           resolve("this worked!");
//       } else {
//           reject("this didn't work!");
//       }
//     });  
//   });