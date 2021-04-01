const authRouter = require('./authRouter')
const dashboardRoute = require('./dashbordRoute')
const play=require('../playground/play')

const routes = [
    {
        path: "/auth",
        handaler: authRouter
    },
    {

        path:'/playground',
        handaler:play,
    },
    {
        path: "/dashboard",
        handaler: dashboardRoute
    },
    {
        path: "/",
        handaler: (req, res, next) => {
            res.render('pages/auth/signup', { title: 'Create a new account', error: {}, value: {} });
        }
    }
]


module.exports = app => {
    routes.map(route => {
        if (route.path === '/')
            app.get(route.path, route.handaler);
        else
            app.use(route.path, route.handaler);
    })
}