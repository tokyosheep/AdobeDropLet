import * as path from "path";

export type SendData = {
    file:string,
    action:string,
    actionSet:string
}

export const sendAIFile = async(data:SendData,url:string) =>{
    console.log(data);
    const ext = path.extname(data.file).toLowerCase();
    if(ext !== ".ai"&& ext !== ".pdf")return;
    const res = await fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"}
    }).catch(e=>{
        console.log(e);
    });
    console.log(res);
}
