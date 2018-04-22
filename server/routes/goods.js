const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/*自定义连接数据增删改查的回调函数*/
function select(sql) {
  let mySqlPromise = new Promise(function (resolve, reject) {
    let connection = mysql.createConnection({
      host: '43.255.154.39',
      user: 'azhoumysql',
      password: 'zly262925',
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

/*增加商品*/
router.post('/addNew', function (req, res) {
  let newGood = req.body.newGoodsInfo;
  /*动态生成商品编号*/
  let goodId = 'GD' + randomString(10);
  select('SELECT * FROM goods WHERE name = "' + newGood.name + '";')
    .then(function (data) {
      if (data.sqlStatus === '200' && data.result.length > 0) {
        res.json({
          resStatus: '201',
          msg: '商品名称已存在,添加失败',
          result: ''
        });
        res.end();
      } else {

        select('INSERT INTO goods(goodId,name,price,imgSrc) VALUES ("' + goodId + '","' + newGood.name + '","' + newGood.price + '","' + newGood.imgSrc + '");')
          .then(function (data) {
            if (data.sqlStatus === '200' && data.result.affectedRows > 0) {
              //req.session.username = userName;
              res.json({
                resStatus: '200',
                msg: '添加商品成功',
                result: {
                  ...newGood,
                  goodId,
                }
              });
              res.end();
            }
          }).catch(function (err) {
          console.log(`新商品信息插入数据库失败：${err}`)
        })
      }
    });
});

/*获取商品列表*/
router.get('/getList', function (req, res) {
  select('SELECT * FROM goods;').then(function (data) {
    if (data.sqlStatus === '200' && data.result.length > 0) {
      res.json({
        resStatus: '200',
        msg: '查询所有商品信息成功',
        result: data.result
      })
    } else {
      res.json({
        resStatus: '201',
        msg: '商品信息列表为空',
        result: ''
      })
    }
  })
});

/*删除商品*/
router.post('/deleteGood', function (req, res) {
  let goodId = req.body.goodId;
  select('SELECT * FROM goods WHERE goodId = "' + goodId + '";')
    .then(function (data) {
      if (data.sqlStatus === '200' && data.result.length <= 0) {
        res.json({
          resStatus: '201',
          msg: '商品不存在,删除失败',
          result: ''
        })
      } else {
        select('DELETE FROM goods WHERE goodId = "' + goodId + '";')
          .then(function (data) {
            if (data.sqlStatus === '200' && data.result.affectedRows > 0) {
              res.json({
                resStatus: '200',
                msg: '删除商品成功',
                result: ''
              })
            } else {
              res.json({
                resStatus: '202',
                msg: '删除商品失败',
                result: ''
              })
            }
          })
      }
    })
});

/*更新商品信息*/
router.post('/updateGood', function (req, res) {
  let id = req.body.id;
  let newName = req.body.name;
  let newPrice = req.body.price;
  let newImgSrc = req.body.imgSrc;

  /*let sql1 = 'SELECT * FROM goods WHERE id = ' + id + ';';
  console.log(sql1);*/
  /*判断此商品是否存在*/
  select('SELECT * FROM goods WHERE id = ' + id + ';').then(function (data) {
      //res.json(data);
      if (data.sqlStatus === '200' && data.result.length > 0) {
        /*商品存在的情况下,判断商品名称是否修改,若修改则检查修改后的名称是否已存在*/
        let sql = 'UPDATE goods SET name="' + newName + '",price="' + newPrice + '",imgSrc="' + newImgSrc + '" WHERE id="' + id + '";';
        if (data.result[0].name === newName) {
          /*商品名称未修改,直接进行商品信息更新操作*/
          select(sql).then(function (data) {
            if (data.sqlStatus === '200' && data.result.affectedRows > 0) {
              res.json({
                resStatus: '200',
                msg: '商品名称未修改,商品其他信息更新成功',
                result: ''
              })
            } else {
              res.json({
                resStatus: '203',
                msg: '商品信息更新失败',
                result: ''
              })
            }
          })
        } else {
          select('SELECT * FROM goods WHERE name ="' + newName + '";').then(function (data) {
            if (data.sqlStatus === '200' && data.result.length > 0) {
              res.json({
                resStatus: '202',
                msg: '商品新名称已存在,修改失败',
                result: ''
              })
            } else {
              /*商品名称已修改,并且修改后的名称未重复,允许商品信息更新操作*/
              select(sql).then(function (data) {
                if (data.sqlStatus === '200') {
                  res.json({
                    resStatus: '200',
                    msg: '商品信息更新成功',
                    result: ''
                  })
                } else {
                  res.json({
                    resStatus: '203',
                    msg: '商品信息更新失败',
                    result: ''
                  })
                }
              })
            }
          })
        }
      } else {
        res.json({
          resStatus: '205',
          msg: '此商品不存在,修改失败',
          result: ''
        })
      }
    }
  );
});

module.exports = router;
