import request from '@/plugins/axios'
export const login = (login) => {
    return request.post('/auth/login', login)
}
export const getUserInfo = () => {
    return request.get('/system/user/getInfo')
}
export const getRouters = () => {
    return request.get('/system/menu/getRouters')
}
