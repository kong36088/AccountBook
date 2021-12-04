const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let keys = ['charater','item', 'value', 'type'];
    let data = {};
    for (let k in keys) {
      let key = keys[k];
      if (!event.hasOwnProperty(key) || !event[key]) {
        return {
          success: false,
          message: `missing param '${key}'`
        }
      }
      data[key] = event[key]
    }

    let id;
    await db.collection('account').add({
      // data 字段表示需新增的 JSON 数据
      data: data
    }).then(res => {
      id = res._id;
    });
    return {
      success: true,
      message: 'ok',
      data: {'id': id},
    };
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: e
    };
  }
};
