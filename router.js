const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

app.listen(3000,()=>{
    console.log('服务链接成功3000')
})

app.use(async(ctx)=>{
    let url = ctx.request.url
    let html = await route(url)
    ctx.body = html
})

async function route(path){
    let page = 'index.html'
    switch(path){
        case '/':
            page = 'index.html'
            break
        case '/404':
            page = '404.html'
            break
        case '/todo':
            page = 'todo.html'
            break
        default:
            break
    }
    let html = await render(page)
    return html
}

function render(path){
    return new Promise((resolve,reject)=>{
        let pageUrl = `./pages/${path}`
        fs.readFile(pageUrl,"binary",(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}