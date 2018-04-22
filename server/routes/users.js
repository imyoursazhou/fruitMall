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
      database: 'fruitmall'
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
          sqlStatus: '200',
          result
        });
      }
    });
    /*断开数据库连接*/
    connection.end();
  });
  return mySqlPromise;
}

/*自定义生成随机唯一商品/订单编号*/
function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    //0~32的整数
    pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return pwd;
}

/* 登录 */
router.post('/login', function (req, res) {
  let loginName = req.body.username;
  let loginPwd = req.body.password;
  select('SELECT * FROM users WHERE username = "' + loginName + '";')
    .then(function (data) {
      if (data.sqlStatus === '200' && data.result.length > 0) {
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
              //console.log(req.session.username);
              //req.session.username = loginName;
              res.json({
                resStatus: '200',
                msg: '用户名密码匹配成功，允许登录',
                results: {
                  userName: user.username,
                  userType: user.type,
                  userId: user.userId
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

  let userId = 'UD' + randomString(10);

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
      if (data.sqlStatus === '200' && data.result.length > 0) {
        res.json({
          resStatus: '201',
          msg: '用户名已存在,注册失败'
        });
        res.end();
      } else {
        select('INSERT INTO users(username,password,type,userId) VALUES ("' + userName + '","' + userPwd + '","' + userType + '","' + userId + '");')
          .then(function (data) {
            if (data.sqlStatus === '200' && data.result.affectedRows > 0) {
              //req.session.username = userName;
              res.json({
                resStatus: '200',
                msg: '新用户注册成功',
                results: {
                  userName,
                  userType,
                  userId
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
  /*res.cookie("userName", "", {
    path: "/",
    maxAge: -1
  });*/
  /*delete req.session.user;
  delete res.locals.user;*/
  res.json({
    resStatus: '200',
    msg: '退出登录成功',
    results: ''
  })
});

/*获取用户列表*/
router.get('/userList', function (req, res) {
  select('SELECT * FROM users;').then(function (data) {
    if (data.sqlStatus === '200' && data.result.length > 0) {
      let userList = [];
      let userObj = {};
      for (let i = 0; i < data.result.length; i++) {
        userObj = {
          userId: data.result[i].userId,
          username: data.result[i].username,
          type: data.result[i].type
        };
        userList.push(userObj);
      }
      res.json({
        resStatus: '200',
        msg: '查询用户列表成功',
        result: userList
      })
    } else {
      res.json({
        resStatus: '201',
        msg: '用户列表为空',
        result: []
      })
    }
  })
});

module.exports = router;
