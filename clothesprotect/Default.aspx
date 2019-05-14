<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>
<html>
<head>
	<title>衣橱欢迎界面</title>
	<meta charset="utf-8">
  <meta name="auther" content="屈小花">
  <link rel="stylesheet" href="./static/js/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="./css/layout.css">

  <link rel="stylesheet" href="./css/home.css">

  <!-- 基本所需库JS -->
  <script src="./static/js/jquery/jquery-3.3.1.js"></script>
  <script src="./static/js/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
  <div id="app">
    <div class="wrapper">
      <header id="cloth-header" class="clear-float">
        <div class="left cloth-header-logo">
          <a href="./home.html"><span class="logo"></span></a>
          <span>衣橱管理</span>
        </div>
        <div class="right cloth-header-user">
          <span class="login"><a href="./login.html" target="_self">登录</a></span>
        </div>
      </header>
      <div class="main">
        <div id="content">
          <!-- 页面内容 -->
          <div class="content-body home">
            <div class="home-start-bg">
              <div class="home-title text-center">
                <div class="title-img">
                  <img src="image/title.png" >
                </div>
                <p class="home-title-link text-center">
                  <a href="./chothespress.html" target="_self" class="btn btn-info" role="button">进入我的衣橱</a>
                </p>
              </div>
              <div class="citi">
                <img src="./image/citi_bg.png" alt="">
              </div>
            </div>         
            <div class="home-share">
              <ul class="home-share-list clear-float" id="home-share"></ul>
            </div>
          </div>
          <footer id="footer">衣橱应用</footer>
		    </div>
    	</div>
    </div>  
  </div>
</body>
<!-- 项目基本JS -->
<script src="./js/common.js"></script>
<!-- 当前页所需JS -->
<script src="./js/home.js"></script>
<script>
  $().ready(function () {
    clothCommon.init();

    home.init();
  });
</script>
</html>
