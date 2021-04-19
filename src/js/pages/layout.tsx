import * as React from "react";
import { useMemo , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { selectedAI_set } from "../redux/actions/AIActions";
import { actionsAI_set } from "../redux/actions/AIActions";
import { createGlobalStyle } from "styled-components";
import connectServer from "../server/server";
import electron,{ ipcRenderer } from "electron";

import { sendAIFile , SendData } from "../server/sendMsg";
import { StoreData } from "../../../main/store";

import AiPage from "./AIPage";
import { StateType } from "../redux/stateType";

const OS = process.platform;

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: #e2914e;
    }
`;

const Layout = () =>{
    let l:null|electron.IpcRenderer = null
    const dispatch = useDispatch();
    const selected = useSelector((state:StateType)=>state.selectedAiAction);
    console.log(selected);
    useMemo(()=>{
        //起動直後にelectronStoreから保存データを引っ張って反映
        (async()=>{
            const data:StoreData = await ipcRenderer.invoke("sendData","");
            console.log(data);
            const d = data.actions;
            const s = data.selected;
            dispatch(actionsAI_set(d));
            dispatch(selectedAI_set(
                {name:s.set.name,index:s.set.index},
                {name:s.action.name,index:s.action.index}
            ));
        })();

        try{
            connectServer(async(r)=>{
                console.log(r);
                dispatch(actionsAI_set(r));
                dispatch(selectedAI_set({name:r[0].setName,index:0},{name:r[0].actions[0],index:0}));
                await ipcRenderer.invoke("saveData",r);
            });
        }catch(e){
            console.log(e);
        }
    },[]);

    const received = async(event,message)=>{
        console.log(message);
        console.log(selected);
        await sendAIFile({file:message.toString(),action:selected.action.name,actionSet:selected.set.name},"http://localhost:3000/");
    }

    useEffect(()=>{
        electron.ipcRenderer.removeAllListeners("dropFile");//selectedが更新されるたびにipcRenderderも更新
        electron.ipcRenderer.on("dropFile",received);
        (async()=>{
            await ipcRenderer.invoke("saveSelected",selected);
        })();
    },[selected]);
    return(
        <>
            <GlobalStyle />
            <AiPage />
        </>
    )
}

export default Layout;