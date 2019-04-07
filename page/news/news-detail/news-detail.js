// page/news/news-detail/news-detail.js
var data = require("../../../data/data.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentNews:{},
    colled:false,
    id:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentNews:data[options.newsid],
      id: options.newsid
    });
    //收藏 colls 取到的所有数据 
    var colls = wx.getStorageSync('zhikey');
    if(colls){
      this.setData({
        colled: colls[options.newsid]
      })
    }else{
      var colls = {};
      //赋值
      colls[options.newsid] = false;
      //储存到storagesSyn
      wx.setStorageSync("zhikey", colls)
    }
  },
  //点击收藏 事件
  collect:function (event){
    var colls = wx.getStorageSync('zhikey');
    //this.data.newid 指的是引入的date中的 id的值(也就是指data中的第几条数据)  通过id值 来取storage对应的数据
    // console.log(this.data)
    //取出storage 对应的那条数据  
    var colltion = colls[this.data.id];
    //数据取反
    colltion = !colltion;
    //赋值数据
    colls[this.data.id] =colltion;
    //储存数据
    wx.setStorageSync("zhikey", colls);
    //给colled 重新赋值储存到data中去
    this.setData({
      colled:colltion
    })
  }
})