const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    let condition = {
      // charater: _.in(["dog", "pig"])
    };
    if (event.hasOwnProperty('charater') && event['charater']) {
      condition.charater = event['charater']
    };
    let result;
    await db.collection('account').where(condition).get().then(res => {
      result = res.data;
    });
    return {
      success: true,
      message: 'ok',
      data: result
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: false,
      message: e
    };
  }
};