import { request } from "./request";

export function login(data) {
    return request({
        url: '/login/user',
        method: 'post',
        data
    })
}

