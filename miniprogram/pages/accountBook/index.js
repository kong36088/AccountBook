// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

const CHARATOR_PIG = "pig";
const CHARATOR_DOG = "dog";

const tarbarPros = [{
    "text": "狗子",
    "iconPath": "/images/狗.png",
    "selectedIconPath": "/images/狗.png",
  },
  {
    "text": "猪猪",
    "iconPath": "/images/猪.png",
    "selectedIconPath": "/images/猪.png",
  },
  {
    "text": "总账目",
    "iconPath": "/images/账本.png",
    "selectedIconPath": "/images/账本.png",
  }
];

Page({
  data: {
    currentCharator: CHARATOR_DOG,
    tarbarPros: tarbarPros,
  },

  navbarChanged(event) {
    console.log(event)
  }

});