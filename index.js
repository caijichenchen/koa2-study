const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())
// app.use(async(ctx)=>{
//     let url = ctx.url //请求地址
    
//     //从request总接受get请求
//     let request = ctx.request 
//     let req_query = request.query //将查询参数字符串进行解析并以对象的形式返回，如果没有查询参数字字符串则返回一个空对象
//     let req_querystring = request.querystring //获取查询参数字符串(url中?后面的部分)，不包含?

//     //从上下文获取
//     let ctx_query = ctx.query
//     let ctx_querystring = ctx.query
//     ctx.body = {
//         url,
//         req_query,
//         req_querystring,
//         ctx_query,
//         ctx_querystring
//     }
// })

/**
 * 获取post请求的步骤
 * 1、解析上下文ctx中的原生node.js对象req
 * 2、将post表单数据解析成query string字符串 （例如：user=chen&age=18）
 * 3、将字符串转换成json格式
 */

 /**
  * ctx.request和ctx.req的区别
  * **ctx.request:是Koa中context经过封装的请求对象，用起来更直观简单
  * **ctx.req是context提供的Node.js原生http请求对象,虽然不直观,但是可以得到更多内容,适合深度编程
  */

app.use(async(ctx)=>{
    let url = ctx.url
    if(ctx.url == '/' && ctx.method == 'GET'){
        let html = `
                <h1>koa request POST</h1>
                <form method="POST" action>
                    <p>用户名</p>
                    <input name="username" /> <br/>
                    <p>年龄</p>
                    <input name="age" /> <br/>
                    <p>地址</p>
                    <input name="web" /> <br/>
                    <button type="submit">提交</button>
                </form>
        `
        ctx.body = html
    }else if(ctx.url == '/' && ctx.method == 'POST'){
        // let postData = await parsePostData(ctx)
        let postData = ctx.request.body
        // ctx.body = '接收到POST参数'
        ctx.body = {
            url,
            postData
        }
    }else{
        ctx.body = '<h1>404</h1>'
    }
})

//处理POST
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try {
            let postData = ''
            ctx.req.addListener('data',data=>{
                postData += data
            })
            ctx.req.on('end',()=>{
                let parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        } catch (error) {
            console.log(error)   
        }
    })
}

function parseQueryStr(queryStr){
    let queryStrs = {}
    let arr = queryStr.split("&")
    arr.forEach(x=>{
        const itemList = x.split("=")
        queryStrs[itemList[0]] = decodeURIComponent(itemList[1])
    })
    console.log(queryStrs)
    return queryStrs
}

app.listen(3000,()=>{
    console.log('app is running at post 3000')
})

// async function testAsync(){
//     return 'hello async'
// }

// async function test(){
//     console.log(22)
//     const test1 = await testAsync()
//     console.log(test1)
//     console.log(11)
// }
// test()