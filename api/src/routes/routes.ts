import { publicTestDelete, publicTestGet, publicTestPost, privateTestDelete, privateTestGet, privateTestPost } from '../controller/TestController'

const RoutePath: string = "/api";
const v1: string = "/v1";
const v2: string = "/v2";

export const v1_AppRoutes = [
    {
        path: RoutePath + v1 + '/test',
        method: 'get',
        action: publicTestGet,
        protected: false
    },
    {
        path: RoutePath + v1 + '/test',
        method: 'post',
        action: publicTestPost,
        protected: false
    },
    {
        path: RoutePath + v1 + '/test',
        method: 'delete',
        action: publicTestDelete,
        protected: false
    },
    {
        path: RoutePath + v1 + '/test-auth',
        method: 'get',
        action: privateTestGet,
        protected: true
    },
    {
        path: RoutePath + v1 + '/test1-auth',
        method: 'post',
        action: privateTestPost,
        protected: true
    },
    {
        path: RoutePath + v1 + '/test-auth',
        method: 'delete',
        action: privateTestDelete,
        protected: true
    }
]

export const v2_AppRoutes = [
    {
        path: RoutePath + v1 + '/test',
        method: 'get',
        action: publicTestGet,
        protected: false
    },
    {
        path: RoutePath + v1 + '/test',
        method: 'post',
        action: publicTestPost,
        protected: false
    },
    {
        path: RoutePath + v1 + '/test',
        method: 'delete',
        action: publicTestDelete,
        protected: false
    }
]