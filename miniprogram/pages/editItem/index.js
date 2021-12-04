// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

import vars from "../../vars.js"
var CHARATERS = vars[0]
var FUND_TYPE = vars[1]

Page({
  data: {
    form: {
      id: '',
      item: '',
      value: '',
      type: FUND_TYPE.LIQUID,
      charater: CHARATERS.dog.value
    },
    charaters: CHARATERS,
    errorMsg: '', // 验证表单显示错误信息
    rules: [{
        name: 'item',
        rules: [{
            required: true,
            message: '请填写存款项'
          },
          {
            maxlength: 20,
            message: "存款项长度过长"
          }
        ],
      },
      {
        name: 'value',
        rules: [{
            required: true,
            message: '请填写金额'
          },
          {
            maxlength: 12,
            message: "金额长度过长"
          }
        ]
      },
      {
        name: 'type',
        rules: {
          required: true,
          message: '请选择流动性'
        }
      },
    ],
    typeItems: [{
        name: '流动',
        value: FUND_TYPE.LIQUID,
        checked: true
      },
      {
        name: '非流动',
        value: FUND_TYPE.ILLIQUID
      }
    ]
  },

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
  weSubmitForm() {
    const {
      item,
      value,
      type,
      charater,
    } = this.data.form;
    this.selectComponent('#form').validate((valid, errors) => {
      console.log(this.data.form)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            errorMsg: errors[firstError[0]].message
          })
        }
      } else {
        let action = this.data.form.id ? 'updateItem' : 'addItem';
        wx.cloud.callFunction({
          name: action,
          data: {
            id: this.data.form.id,
            item: item,
            value: value * 100,
            type: type,
            charater: charater,
          },
        }).then(res => {
          console.log(res);
          if (res.result.success) {} else {
            wx.showToast({
              title: '失败:',
              icon: 'error'
            });
          }
        });
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 重置表单
  restForm() {
    this.setData({
      'form.item': '',
      'form.value': '',
      'form.type': FUND_TYPE.LIQUID,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad(options) {
    var keys = ['id', 'item', 'value', 'type', 'charater'];
    for (var k in keys) {
      var key = keys[k];
      if (options.hasOwnProperty(key)) {
        this.setData({
          [`form.${key}`]: options[key]
        })
      }
    }
    console.log(this.data.form)
  }

});