const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // check id
    let docId;
    if (!event.hasOwnProperty('id') || !event['id']) {
      return {
        success: false,
        message: `missing param 'id'`
      }
    }
    docId = event['id'];

    // update data
    let keys = ['charater', 'item', 'value', 'type'];
    let data = {};
    for (let k in keys) {
      let key = keys[k];
      if (event.hasOwnProperty(key) && event[key]) {
        data[key] = event[key]
      }
    }
    if (!data) {
      return {
        success: true,
        message: 'ok'
      };
    }

    await db.collection('account').doc(docId).update({data: data}).then(res => {});
    return {
      success: true,
      message: 'ok'
    };
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: e
    };
  }
};