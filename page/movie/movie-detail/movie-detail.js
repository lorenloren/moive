var utils = require("../../../utils/utils.js");
Page({
  data: {
    movie: {}
  },

  onLoad: function (options) {
    //loading 提示动画 开始
    wx.showLoading({
        title: '加载中...',
    });
    utils.http("http://localhost:8888/v2/movie/subject/" + options.movieid, this.callback, null, null);
  },
  callback: function (data) {
    //停止加载中的动画
    wx.hideLoading();
    // wx.hideLoading();
    /*
        1.电影图片：movieImg
        2.制片国家/地区：country
        3.电影名称：title
        4.繁体名称：original_title
        5.想看人数：wish_count
        6.短评数量：commentCount
        7.年代：year
        8.电影类型：generes
        9.评星：stars
        10.评分：score
        11.导演:director
        12.主演：casts
        13.主演信息：castsInfo
        14.简介：summary
    */
    if (!data) {
      return;
    }
    //处理一下导演
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var temp = {
      movieImg: data.images.large,
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres,
      stars: utils.star(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastsString(data.casts),
      summary: data.summary
    }
    this.setData({
      movie: temp
    })

    // console.log(temp);
  }
})