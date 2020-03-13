const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()


let home = new Router();
home.get('/jspang',async(ctx)=>{
    ctx.body="Home JSPang";
}).get('/todo',async(ctx)=>{
    ctx.body ='Home ToDo';
})




let page = new Router();
page.get('/jspang',async(ctx)=>{
    ctx.body="Page JSPang";
}).get('/todo',async(ctx)=>{
    ctx.body ='Page ToDo';
})

//装载所有子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());


app
    .use(router.routes()) //装载路由
    .use(router.allowedMethods())


app.listen(3000,()=>{
    console.log('服务开启在3000')
})