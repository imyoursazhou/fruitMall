const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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

/* GET order list. */
router.get('/orderList', function (req, res) {
  /*需要返回给前端的字段是:
  *订单编号:orderId
  * 用户名:username ==> 通过userId联表查询
  *商品编号:goodId
  *数量:goodNum
  *订单总价格:totalPrice ==> 通过goodId联表查询到price后与goodNum相乘得到订单总价格
  * 最好不要在for循环中使用sql语句*/

  select('SELECT * FROM orders;').then(function (data) {
    if (data.sqlStatus === '200' && data.result.length > 0) {
      res.json({
        resStatus: '200',
        msg: '查询订单列表成功',
        result: data.result
      })
    } else {
      res.json({
        resStatus: '201',
        msg: '订单列表为空',
        result: []
      })
    }
  });
});

/*单个商品下订单*/
router.post('/addOrder', function (req, res) {
  let userName = req.body.userName;
  let goodId = req.body.goodId;
  let goodNum = req.body.goodNum;
  let goodName = req.body.goodName;
  let orderTime = new Date().toLocaleString();
  let orderId = 'E' + randomString(10);

  select('SELECT * FROM goods WHERE goodId = "' + goodId + '";').then(function (data) {
    if (data.sqlStatus === '200' && data.result.length <= 0) {
      res.json({
        resStatus: '201',
        msg: '商品不存在,添加购物车失败',
        result: ''
      })
    } else {
      select('INSERT INTO orders(orderId,orderTime,username,goodId,goodNum,goodName) VALUES ("' + orderId + '","' + orderTime + '","' + userName + '","' + goodId + '","' + goodNum + '","'+goodName+'");')
        .then(function (data) {
          if (data.sqlStatus === '200') {
            res.json({
              resStatus: '200',
              msg: '订单存储成功',
              result: ''
            })
          } else {
            res.json({
              resStatus: '202',
              msg: '订单存储失败',
              result: ''
            })
          }
        });
    }
  })
});

module.exports = router;
