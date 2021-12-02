const cloud = require('../deleteItem/node_modules/wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let keys = ['charater'];
    for (let k in keys) {
      let key = keys[k];
      if (!event.hasOwnProperty(key) || !event[key]) {
        return {
          success: false,
          message: `missing param '${key}'`
        }
      }
    }

    await db.collection('account').add({
      // data 字段表示需新增的 JSON 数据
      data: data
    });
    return {
      success: true,
      message: 'ok'
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: true,
      message: 'create collection success'
    };
  }
};
