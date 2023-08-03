import { request } from "./request";

export function listGoodsCategory(data) {
    return request({
        url: '/goods/category/list',
        method: 'get',
        params: data
    })
}

export function addGoodsCategory(data) {
    return request({
        url: 'goods/category/add',
        method: 'post',
        data
    })
}

export function editGoodsCategory(data) {
    return request({
        url: 'goods/category/update',
        method: 'put',
        data
    })
}

export function delGoodsCategory(id) {
    return request({
        url: 'goods/category/'+ id,
        method: 'delete'
    })
}