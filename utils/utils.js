function http(url, callback,type,paihang) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      callback(res.data,type,paihang)
    }
  })
}
function star(stars) {
  var stararr = [];
  var num = stars.substring(0, 1);
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      stararr.push(1);
    } else {
      stararr.push(0);
    }
  }
  return stararr;
}
function qTitle(title){
  if(title.length > 7){
    return title.substring(0,7) + "...";
  }else{
    return title;
  }
}
// 处理电影名字
function cutTitle(title) {
  if (title.length > 6) {
    return title.substring(0, 6) + '...';
  } else {
    return title;
  }
}

// 演员名字用/隔开
function convertToCastString(casts) {
  var castsjoin = "";
  var castsfinal = "";
  for (var dic in casts) {
    castsjoin = castsjoin + casts[dic].name + " / ";
  }
  castsfinal = castsjoin.substring(0, castsjoin.length - 3);
  return castsfinal;
}

function convertToCastsString(casts) {
  //存储信息：头像+名字
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  http: http,
  star:star,
  qTitle: qTitle,
  convertToCastString: convertToCastString,
  convertToCastsString: convertToCastsString
}