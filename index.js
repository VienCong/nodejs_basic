const http = require('http')
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    // console.log(req.method,req.url)
    // const url = req.url
    // req.query = querystring.parse(url.split('?')[1])
    // console.log('query',req.query);
    // res.writeHead(200,'aaaaa', { 'content-type':'text/html'})
    // res.end(JSON.stringify(req.query))
    // if(req.method === 'POST') {
    //     console.log('content-type',req.headers['content-type']);
    //     let postData = ''
    //     req.on('data',chunk=>{
    //         console.log('chunk',chunk);
    //         postData += chunk.toString()
    //     })
    //     req.on('end', ()=>{
    //         console.log('postData',postData)
    //         res.end('aaaaaa')
    //     })
    // }
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    // 
    res.setHeader('Content-type', 'application/json')
   
    const resData = {
        method,
        url,
        path,
        query
    }

    if (req.method === 'GET') {
        res.end(JSON.stringify(resData))
    }
    if (req.method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            console.log('chunk', chunk);
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
    }
})

server.listen(3000, () => {
    console.log('server listening on --port 3000');
})