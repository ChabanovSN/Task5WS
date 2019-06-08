// console.log('It works!');
const Koa = require('koa');
var serve = require('koa-static');// .punlic
const mount  = require('koa-mount');
const bodyParser = require('koa-bodyparser'); // в коа нет парсера по дефолту

const session = require('koa-session');
const passport = require('koa-passport');
const indexRouter = require('./routers/index');
const movieRoutes = require('./routers/movies');
const authRoutes = require('./routers/auth');
const app = new Koa();

const PORT = process.env.PORT || 1337;

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// app.use(async (ctx) =>{
//     ctx.body = {
//         status: 'success',
//         message: 'hello, world'
//     };
// });

app.use(bodyParser());
app.use( mount(  serve('./public') ) ) ;

console.log(app.inspect());

// authentication сериализация
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter.routes());
app.use(movieRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT,() =>{
    console.log(`Servwr listening on port: ${PORT}`);
});

module.exports = server;