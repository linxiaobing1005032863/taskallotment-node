var app = angular.module('app', ['ngVerify','ipCookie',
    'indexSerModule'
]);
app.controller('rootCtrl', function ($scope,$rootScope,$state,ipCookie,$location) {
    if ($state.current.url == '/root') {//默认加载列表
        $state.go('root.allocation');
    }
    $scope.username = ipCookie('username');
    if($scope.username==undefined){
        $scope.username="登录用户"
    }else {
        $scope.logined=true;
    }
    //返回按钮
    // $scope.back=function(){
    //     var forward=ipCookie('forward');
    //     ipCookie('forward','',{expires:-1});
    //     window.location.href=forward ? forward : 'https://show.issp.bjike.com/system.html';
    // }
    // $scope.login = function(){
    //     var absurl = $location.absUrl();
    //     window.location.href='https://login.issp.bjike.com/login?url='+absurl
    //     // window.location.href='http://localhost/login?url='+absurl
    // };
    // $scope.logout = function(){
    //     var abs = window.location.host;
    //     var hashs = $location.url().split('?')[0];
    //     location.href="https://login.issp.bjike.com/user/logout?absurl="+abs+"&hash="+hashs;
    //     // location.href="http://localhost/user/logout?absurl="+abs+"&hash="+hashs;
    // };
    $scope.login = function(){
        var absurl = $location.absUrl();
        window.location.href='http://localhost/login?url='+absurl
    };
    $scope.logout = function(){
        var abs = window.location.host;
        var hashs = $location.url().split('?')[0];
        location.href="http://localhost/user/logout?absurl="+abs+"&hash="+hashs;
    };



    //搜索功能
    $scope.isClick = true;
    $scope.searchToggle = function(){
        $scope.isClick = !$scope.isClick;
        //父 Ctrl 监听到事件，向下广播
        $scope.$broadcast('iSsearch',$scope.isClick)
    };
    //更新 isClick
    $scope.$on('isId',function(event,msg){
        $scope.isClick = msg;
    });
    //监听当前页面是否有搜索功能
    $scope.$on('isVi',function(event,msg){
        $scope.isView = msg;
    });
});
