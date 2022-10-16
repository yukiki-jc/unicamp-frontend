export const backend = '43.159.39.232:8080/api';
export const frontend = "localhost:3000"
export const apiPath = {
    login: '/login',
    course: {
        list: '/course/list',
        info: '/course/info',
        delete: '/course/delete',
        add: '/course/add',
        update: '/course/update'
    },
    category: {
        list: '/category/list',
        info: '/category/info'
    },
    register: '/register',
    reset: {
        'password': '/reset/password'
    },
    profile: {
        'update': '/profile/update',
        'myprofile': '/profile/myprofile'
    }
    
}