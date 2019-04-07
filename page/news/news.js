// page/news/news.js
// 引入data.js
var data = require("../../data/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs:{
      //是否显示面板指示点
      indicatorDots: 'true',
      //指示点颜色
      indicatorColor: '#999',
      //当前选中的指示点颜色
      indicatorActiveColor:'red',
      //是否自动切换
      autoplay: 'true',
      //自动切换时间间隔
      interval: '2000',
      //是否采用衔接滑动
      circular: 'true',
      imgUrl:[
        "../../images/banner1.jpg",
        "../../images/banner2.jpg",
        "../../images/banner3.jpg"
      ],
      news: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      news: data
    });
  },


  //点击新闻跳转页面 
  //html页面设置属性接收 data.js里面的id值 用来区分点击的是哪个 
  //然后根据那个变量的值 把那个值拼接到跳转的url上 
  //在详情页面可以根据点击的是哪个值 id=0 ||id=1 来把哪个数据传到详情页的储存数组里面 然后就可以根据数据进行页面渲染
  //html页面  data-开头的 是自定义的属性
  //详情页面的js页面  this.setData({  key: val }); 用来改变key的值 
  //require("../../data/data.js");  用来引入外部的js 文件
  xinwenTiaozhuan :function (event){
    var current = event.currentTarget.dataset.newsid;
    // console.log(current)
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid='+current,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})