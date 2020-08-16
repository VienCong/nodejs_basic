const {
    exec
} = require('../db/mysql')
const {
    update
} = require('lodash')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 ` // 1=1 避免后面条件都不成立
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql)
}

const upDateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author

    const sql = `insert into blogs(title,content,createtime,author) 
    values ('${title}','${content}',${createtime},'${author}');`

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}