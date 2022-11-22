export const backend = '43.159.39.232:8080/api';
export const apiPath = {
    login: '/login',
    course: {
        list: '/course/list',
        info: '/course/info',
        delete: '/course/delete',
        add: '/course/add',
        update: '/course/update',
        relation: '/course/relation'
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
    },
    avatar: {
        'get': '/avatar/get',
        'set': '/avatar/set'
    },
    comment: {
        'get': '/comment/get',
        'add': '/comment/add',
        'delete': '/comment/delete'
    },
    grade: {
        "get": '/grade/get',
        'set': '/grade/set'
    },
    recommend: {
        new: '/recommend/new/main',
        hot: '/recommend/hot/main',
        rec: '/recommend/rec/main',
        related: '/recommend/related'
    },
    favorite: {
        query: '/favorite',
        set: '/favorite/set',
    }
    



}