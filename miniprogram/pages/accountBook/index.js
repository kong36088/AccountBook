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

const iconPath = {
  [CHARATERS.dog.value]: "/images/狗.png",
  [CHARATERS.pig.value]: "/images/猪.png",
};

Page({
  data: {
    currentCharater: CHARATERS.dog.value,
    tarbarPros: tarbarPros,
    iconPath: iconPath,
    totalCount: {
      totalFund: 0,
      liquidFund: 0,
      illiquidFund: 0
    },
    detailCount: {},
    // action sheet
    actionSheet: {
      show: false,
      groups: [{
          text: '修改',
          value: 'update'
        },
        {
          text: '删除',
          value: 'delete',
          type: 'warn'
        }
      ],
      selected: '',
    },
    dialog: {
      show: false,
      buttons: [{
        text: '取消'
      }, {
        text: '确定',
        type: 'warn'
      }]
    }
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
      count.value = Number(count.value);
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
      getApp().setLoading(true);
      if (res.result.success) {
        getApp().setLoading(false);
        let detailCount = {};
        for (let x in res.result.data) {
          let item = res.result.data[x];
          detailCount[item.id] = item;
        }
        this.setData({
          'detailCount': detailCount,
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
  itemClick(e) {
    console.log(e)
    this.setData({'actionSheet.selected': e.currentTarget.dataset.id, 'actionSheet.show': true})
  },
  dialogClick(e) {
    console.log(e);
    if (e.detail.item.text == '确定') {
      getApp().setLoading(true);
      let id = this.data.actionSheet.selected;
      wx.cloud.callFunction({
        name: "deleteItem",
        data: {
          id: id,
        }
      }).then(res => {
        getApp().setLoading(false);
        console.log(res);
        if (res.result.success) {
          let detailCount = this.data.detailCount;
          delete detailCount[id];
          this.setData({
            'detailCount': detailCount
          });
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'error'
          });
        }
      });
    }
    this.setData({
      'dialog.show': false,
    });
  },
  sheetClick(e) {
    console.log(e)
    this.setData({
      'actionSheet.show': false
    });
    switch (e.detail.value) {
      case 'update':
        let charater = this.data.currentCharater;
        let id = this.data.actionSheet.selected;
        let item = this.data.detailCount[id].item;
        let value = this.data.detailCount[id].value/100;
        let type = this.data.detailCount[id].type;
        wx.navigateTo({
          url: `/pages/editItem/index?charater=${charater}&id=${id}&item=${item}&value=${value}&type=${type}`,
        });
        break;
      case 'delete':
        this.setData({'dialog.show': true});
        break;
      default:
        break;
    }
  },

  onLoad(options) {
    getApp().setWatcher(this);
    console.log(options);
    this.reloadPage();
  },
});