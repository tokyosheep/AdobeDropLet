import electron from "electron";
import { initStore } from "./store";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const OS = process.platform;
console.log(OS);

let mainWindow:null|electron.BrowserWindow;

initStore();

const createWindow = () =>{
    mainWindow = new BrowserWindow({width:500,height:400,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    //mainWindow.webContents.openDevTools();
    if(OS === "win32"){
        mainWindow?.webContents.on("did-finish-load",()=>{
            process.argv.forEach((arg,i)=>{
                if(i===0)return;
                mainWindow?.webContents.send("dropFile",arg);
            })
        });
    }
    mainWindow.on("closed",()=>{
        mainWindow = null;
    }); 
}

if(OS === "darwin"){
    app.on("will-finish-launching",()=>{
        app.on("open-file",(event,filePath)=>{
            event.preventDefault();
            if(mainWindow){
                mainWindow?.webContents.send("dropFile",filePath);
            }else{
                app.on("ready",()=>{
                    mainWindow?.webContents.on("did-finish-load",()=>{
                        mainWindow?.webContents.send("dropFile",filePath);
                        setTimeout(()=>{
                            mainWindow?.close();
                            mainWindow = null;
                        },2000);
                    });
                });
            }
        })
    })
}

const gotTheLock = app.requestSingleInstanceLock();

if(OS === "win32"){
    if(!gotTheLock){
        app.quit();
    }else{
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            // Someone tried to run a second instance, we should focus our window.
            commandLine.forEach((arg,i)=>{
                if(i===0)return;
                mainWindow?.webContents.send("dropFile",arg);
            })
        });

        app.on("ready",()=>{
            createWindow();
        });
   }
}else{
    app.on("ready",()=>{
        createWindow();
    });
}


