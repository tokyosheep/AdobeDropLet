import electron from "electron";
import { initStore } from "./store";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const OS = process.platform;

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
    mainWindow.on("closed",()=>{
        mainWindow = null;
    }); 
    if(OS === "win32"){
        console.log(process.argv);
        if(process.argv){
            console.log("fire");
        }
    }
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


app.on("ready",()=>{
    createWindow();
});