// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

import vars from "../../vars.js"
var CHARATERS = vars[0]
var FUND_TYPE = vars[1]

const tarbarPros = [{
    "text": "狗子",
    "iconPath": "/images/狗.png",
    "selectedIconPath": "/images/狗.png",
    "charater": CHARATERS.dog.value
  },
  {
    "text": "猪猪",
    "iconPath": "/images/猪.png",
    "selectedIconPath": "/images/猪.png",
    "charater": CHARATERS.pig.value
  },
  {
    "text": "总账目",
    "iconPath": "/images/账本.png",
    "selectedIconPath": "/images/账本.png",
    "charater": CHARATERS.total.value
  }
];

Page({
  data: {
    currentCharater: CHARATERS.dog.value,
    tarbarPros: tarbarPros,
    totalCount: {
      totalFund: 12300,
      liquidFund: 12,
      illiquidFund: 34
    },
    detailCount: [
      //   {
      //   item: "招行",
      //   value: 123400,
      //   type: FUND_TYPE.LIQUID,
      // }
    ],
  },
  watch: {
    currentCharater: function (newVal) {
      this.calcTotalCount(newVal);
    }
  },
  navbarChanged(event) {
    this.setData({
      currentCharater: event.detail.item.charater
    });
  },
  calcTotalCount(charater) {
    let totalFund = 0;
    let liquidFund = 0;
    let illiquidFund = 0;

    for (let x in this.data.detailCount) {
      let count = this.data.detailCount[x];
      if (charater == CHARATERS.total.value) {
        switch (count.type) {
          case FUND_TYPE.LIQUID:
            liquidFund += count.value;
            break;
          case FUND_TYPE.ILLIQUID:
            illiquidFund += count.value;
            break;
          default:
            break;
        }
        totalFund += count.value;
      } else {
        if (count.charater == charater) {
          switch (count.type) {
            case FUND_TYPE.LIQUID:
              liquidFund += count.value;
              break;
            case FUND_TYPE.ILLIQUID:
              illiquidFund += count.value;
              break;
            default:
              break;
          }
          totalFund += count.value;
        }
      }
    };
    this.setData({
      'totalCount.totalFund': totalFund,
      'totalCount.liquidFund': liquidFund,
      'totalCount.illiquidFund': illiquidFund
    });
  },
  reloadPage() {
    wx.cloud.callFunction({
      name: "getCharaterAccount",
      data: {}
    }).then(res => {
      console.log(res);
      if (res.result.success) {
        this.setData({
          'detailCount': res.result.data,
        });
        this.calcTotalCount(this.data.currentCharater);
      } else {
        wx.showToast({
          title: '获取数据失败',
          icon: 'error'
        });
      }
    });
  },

  onLoad(options) {
    getApp().setWatcher(this);
    console.log(options);
    this.reloadPage();
  }

});