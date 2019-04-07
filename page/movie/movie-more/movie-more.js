// page/movie/movie.js
var utils = require("../../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    url:"",
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //导航部分的标题
    wx.setNavigationBarTitle({
      title: options.current
    })
    //获取数据之前 页面显示加载中
    wx.showLoading({
      title: '加载中',
    });
    var url = "";
    switch (options.current){
      case "排行榜":
        url = "http://localhost:8888/v2/movie/top250";
        break;
      case "即将上映":
        url = "http://localhost:8888/v2/movie/coming_soon";
        break;
      case "正在热映":
        url = "http://localhost:8888/v2/movie/in_theaters";
        break;
    };
    this.setData({
      url:url
    })
    utils.http(url, this.callback, null, null);
  },

  callback: function (data, type, paihang) {
    //加载数据成功后 调用函数的时候  手动吧 loading停止
    wx.hideLoading();
    //加载数据成功后  下拉页面刷新动画停止
    wx.stopPullDownRefresh();

    var movies = [];
    for (var i = 0; i < data.subjects.length; i++) {
      var temp = {
        large: data.subjects[i].images.large,
        title: utils.qTitle(data.subjects[i].title),
        star: utils.star(data.subjects[i].rating.stars),
        average: data.subjects[i].rating.average,
        id: data.subjects[i].id
      }
      movies.push(temp);
    }
    
    this.setData({
      movies:this.data.movies.concat(movies),
      start: this.data.start += 20
    });
  },
 
  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    utils.http(this.data.url + "?start=" + this.data.start, this.callback, null, null);
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.setData({
      movies:[],
      start:0
    });
    utils.http(this.data.url,this.callback,null,null)
  },
  //跳转到电影详情页面 是在分类里面跳转
  detailHandler: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieid,
    })
  }
})