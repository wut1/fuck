interface CONFIG_NI {
    [key:string]:string
}
declare var CONFIGNI:CONFIG_NI;
CONFIGNI = {
    getArticles: '/v1/atricles',
    getArticleDetail: '/v1/getArticleDetail',
    postRegister: '/v1/register',
    postLogin: '/v1/login',
    isLogin: '/v1/getUser',
    logout: '/v1/logout',
    forget: '/v1/forget',
    reset: '/v1/reset',
    publish: '/v1/publish',
    upload: '/v1/upload'
}