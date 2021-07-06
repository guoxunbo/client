import {SessionContext} from "../api/Application";

const EnvMode = {
    Local: "LOCAL",
    Test: "TEST",
    Prod: "PROD",
    Dev: "DEV"
}

let baseURL = '';
// @ts-ignore
switch (ENV_MODE) {
    case EnvMode.Prod:
        baseURL = "http://10.39.0.51:10010";
        break
    case EnvMode.Dev:
        baseURL = "http://10.39.0.49:10010";
        break
    case EnvMode.Test:
        baseURL = "http://10.39.0.49:10010";
        break
    default:
        baseURL = "http://127.0.0.1:8080";
}

export const timeout = 6000
export const headers = {
    'Content-Type': "application/json;charset=utf-8",
    authorization: SessionContext.getToken()
}
export const baseUrl = baseURL




