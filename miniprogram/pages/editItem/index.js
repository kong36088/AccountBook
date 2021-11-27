// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

Page({
  data: {
    form: {
      item: '',
      value: '',
      type: 'liquid',
    },
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
            maxlength: 10,
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
        value: 'liquid',
        checked: true
      },
      {
        name: '非流动',
        value: 'illiquid'
      }
    ]
  },

  formInputChange(e) {
    console.log(e)
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
      type
    } = this.data.form
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
        wx.showToast({
          title: '提交成功',
        })
        // wx.navigateBack({
        //   delta: 1
        // })
      }
    })
  },
  // 重置表单
  restForm() {
    this.setData({
      'form.item': '',
      'form.value': '',
      'form.type': 'liquid',
    })
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad(options) {
    this.setData({
      item: '',
      value:'',
      type: 'liquid'
    })
  }

});