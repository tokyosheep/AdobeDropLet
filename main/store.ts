import Store from 'electron-store';
import electron, { ipcMain } from "electron";
import { ActionType , SelectedSet } from "../src/js/redux/redux/AIactions";
export type StoreData = {
    actions:ActionType[],
    selected:SelectedSet
}

export const initStore = () =>{
    const initActions:StoreData = {
            actions:[{
                setName:"",
                actions:[""],
            }],
            selected:{
                set:{
                    name:"",
                    index:0
                },
                action:{
                    name:"",
                    index:0
                }
            }
    };
    
    const store = new Store<StoreData>({defaults:initActions});
    console.log(store);

    ipcMain.handle("sendData",(event,msg)=>{
        const data = store.get("actions");
        const s = store.get("selected");
        return {actions:data,selected:s};
    });

    ipcMain.handle("saveData",(event,data:ActionType[])=>{
        store.set("actions",data);
        store.set("selected",{
            set:{
                name:data[0].setName,
                index:0
            },
            action:{
                name:data[0].actions[0],
                index:0
            }
        })
        return;
    });

    ipcMain.handle("saveSelected",(event,selected:SelectedSet)=>{
        store.set("selected",selected);
        return;
    })

    ipcMain.handle("getData",event=>{
        Store.initRenderer();
        const extData = store.get("actions");
        console.log(extData);
        return extData;
    });
}