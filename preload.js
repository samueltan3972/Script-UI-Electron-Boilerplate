const { contextBridge } = require('electron/renderer')

// contextBridge.exposeInMainWorld('versions', {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron
// })

const ipc = require('electron').ipcRenderer

// contextBridge.exposeInMainWorld(
//     "api", {
//         open_file_dialog: () => ipc.send('open-file-dialog')
//     }
// );

// White-listed channels.
const whitelist = {
    'render': {
        // From render to main.
        'send': [
            'open_file_dialog',
            'open_folder_dialog'
        ],
        // From main to render.
        'receive': [
            // 'open_file_dialog',
            'selected_directory'
        ],
        // From render to main and back again.
        'sendReceive': [
            'search'
        ]
    }
};

contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel, data) => {
            let validChannels = whitelist.render.sendReceive;
            if (validChannels.includes(channel)) {
                // ipcRenderer.invoke accesses ipcMain.handle channels like 'myfunc'
                // make sure to include this return statement or you won't get your Promise back
                return ipc.send(channel, data); 
                // return ipc.invoke(channel, data); 
            }
        },
        // From render to main.
        send: (channel, args) => {
            let validChannels = whitelist.render.send;
            if (validChannels.includes(channel)) {
                ipc.send(channel, args);
            }
        },
        // From main to render.
        receive: (channel, listener) => {
            let validChannels = whitelist.render.receive;
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`.
                ipc.on(channel, (event, ...args) => listener(...args));
            }
        },
    }
);

// ipc.on('selected_directory', function (event, path) {
//     // document.getElementById('selected-file').innerHTML = `You selected: ${path}`
//     console.log(path)
// })