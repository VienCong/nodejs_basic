const http = require('http')

const PORT = 3000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(3000, ()=> {
    console.log('server listening on --port 3000...')
})