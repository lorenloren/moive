// page/movie/movie.js
var utils = require("../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据之前 页面显示加载中
    wx.showLoading({
      title: '加载中',
    }),
    //   in_theaters  coming_soon
    utils.http("http://localhost:8888/v2/movie/in_theaters?count=3", this.callback,"in_theaters","正在热映");
    utils.http("http://localhost:8888/v2/movie/coming_soon?count=3", this.callback, "coming_soon","即将上映");
    utils.http("http://localhost:8888/v2/movie/top250?count=3", this.callback, "top250","排行榜");
    
  },

  callback: function (data,type,paihang) {
    //加载数据成功后 调用函数的时候  手动吧 loading
    wx.hideLoading();
    //创建一个数组  用来接收 temp这个对象(多个板块的5条数据)的数据
    var movies = [];
    for (var i = 0; i < data.subjects.length;i++){
      //temp 对象  来接收单个块的5条数据
      var temp = {
        // 1.大图2.标题3.星星4.评分5.id
        large: data.subjects[i].images.large,
        title: data.subjects[i].title,
        star: utils.star(data.subjects[i].rating.stars),
        average: data.subjects[i].rating.average,
        id: data.subjects[i].id
      }
      //单次循环过后的数据赋值给 movie数组 循环结束后 movie数组的格式为[{},{},{}]
      movies.push(temp);
    }
    //创建一个对象  用来区分, 每次把数据赋值给初始化data中的时候 避免movie名字向同抵掉
    var moviedata = {};
    //开始储存单块的数据了 第一个movie指的是 数组赋值给对象的时候的名字 第二个指的是数组的值
    moviedata[type] ={
      movies:movies,
      paihang:paihang
    };
    //把 moviedeta 传给初始化data
    this.setData(moviedata);
    // console.log(this.data);
  },
  morel: function (event){
    var current = event.currentTarget.dataset.current;
    wx.navigateTo({
      url: 'movie-more/movie-more?current='+current,
    })
  },
  //跳转到电影详情页面  在电影目录下跳转
  detailHandler: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieid,
    })
  }
})