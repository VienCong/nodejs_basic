const {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
} = require('../controller/blog')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

// 统一登录验证函数
const loginCheck = (req)=> {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('登录失败'))
    }
    
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck
        }
        const result = upDateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            return new ErrorModel('更新博客失败')
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck
        }
        const author = req.session.username
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheck 
        }
        const author = req.session.username
        req.body.author = author
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            return new ErrorModel('删除博客失败')
        })

    }
}

module.exports = handleBlogRouter