// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

import vars from "../../vars.js"
var CHARATERS = vars[0]

const FUND_TYPE_LIQUID = "liquid";
const FUND_TYPE_ILLIQUID = "illiquid";

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
      liquidFund:12,
      illiquidFund:34
    },
    detailCount: [
      {
        item: "招行",
        value: 123400,
        fundType: FUND_TYPE_LIQUID,
      },
    ],
  },

  navbarChanged(event) {
    console.log(event)
    this.setData({currentCharater: event.detail.item.charater});
  },
  
  reloadPage() {

  }

});