import { IncomingMessage } from "http";
import Cookies from "js-cookie";
import api from "../api/axios";

function parseCookie(cookie: string){
    return Object.fromEntries(
        cookie.split(';')
        .map(prop => prop.split('='))
        .map(([key, value]) => [
            decodeURIComponent(key),
            decodeURIComponent(value)
        ])
    )
}

export function getTokensFromCookies(req: IncomingMessage){
    const cookie = req.headers.cookie;
    if(!cookie) return null;

    return parseCookie(cookie)
}

export enum MethodEnum{
    "post",
    "get",
    "put",
    "delete"
}

export async function makeAuthenticatedRequest(token: string | undefined | null, method: keyof typeof MethodEnum , url:string, data ?: any){
    return api({
        method: method,
        data:data,
        url:url,
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
}
export async function makeRequestWithCookieToken(method: keyof typeof MethodEnum, url: string, data?:any){
    const token = Cookies.get('accessToken');
    const response = await api({
        method: method,
        data:data,
        url:url,
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    return response.data
}