export let tranferJson = (result:any,json?:any) => {
    return Object.assign({resultObj:json},{resultCode:result.status,resultMess:result.message ||''});
}