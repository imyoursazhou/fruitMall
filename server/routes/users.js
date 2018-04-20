const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

/*自定义连接数据增删改查的回调函数*/
function select(sql) {
  let mySqlPromise = new Promise(function (resolve, reject) {
    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'fruit_mall'
    });
    /*开启连接数据库*/
    connection.connect();
    /*执行sql语句*/
    connection.query(sql, function (err, result, fields) {
      if (err) {
        /*执行sql失败，返回err*/
        reject(err);
      } else {
        resolve({
          sqlStatus: 200,
          result
        });
      }
    });
    /*断开数据库连接*/
    connection.end();
  });
  return mySqlPromise;
}

/* 登录 */
router.post('/login', function (req, res) {
  let loginName = req.body.username;
  let loginPwd = req.body.password;
  select('SELECT * FROM users WHERE username = "' + loginName + '";')
    .then(function (data) {
      if (data.sqlStatus == 200 && data.result.length > 0) {
        let user = data.result[0];
        bcrypt.compare(loginPwd, user.password, function (err, isMatch) {
          if (err) {
            console.log(`匹配密码操作抛出异常：${err}`);
          } else {
            if (isMatch) {
              /*功能待实现
              *res.cookie("userName", user.username, {
                path: '/',
                maxAge: 1000 * 60 * 60
              });*/
              res.json({
                resStatus: '200',
                msg: '用户名密码匹配成功，允许登录',
                results: {
                  userName: user.username,
                  userType: user.type
                }
              });
            } else {
              res.json({
                resStatus: '201',
                msg: '用户名密码匹配失败'
              })
            }
          }
        });
      } else {
        res.json({
          resStatus: '202',
          msg: '用户不存在，登录失败'
        });
        res.end();
      }
    });
});

/*注册*/
router.post('/register', function (req, res) {
  let userName = req.body.username;
  let userPwd = req.body.password;
  let userType = 'normalUser';

  /*将用户设置的密码通过bcrypt进行加盐+hash后再进行存储*/
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      console.log(`执行SALT_WORK_FACTOR加盐操作失败：${err}`);
    } else {
      bcrypt.hash(userPwd, salt, function (err, hash) {
        if (err) {
          console.log(`执行password hash操作失败：${err}`)
        } else {
          userPwd = hash;
        }
      })
    }
  });
  select('SELECT * FROM users WHERE username = "' + userName + '";')
    .then(function (data) {
      if (data.sqlStatus == 200 && data.result.length > 0) {
        res.json({
          resStatus: '201',
          msg: '用户名已存在,注册失败'
        });
        res.end();
      } else {
        select('INSERT INTO users(username,password,type) VALUES ("' + userName + '","' + userPwd + '","' + userType + '");')
          .then(function (data) {
            if (data.sqlStatus == 200 && data.result.affectedRows > 0) {
              res.json({
                resStatus: '200',
                msg: '新用户注册成功',
                results: {
                  userName,
                  userType
                }
              });
              res.end();
            }
          }).catch(function (err) {
          console.log(`新用户注册信息插入数据库失败：${err}`)
        })
      }
    });
});

/*退出登录*/
router.get('/logout', function (req, res) {
  res.cookie("userName", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    resStatus: '200',
    msg: '退出登录成功',
    results: ''
  })
});


module.exports = router;
