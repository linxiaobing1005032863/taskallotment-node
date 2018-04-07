var app = angular.module('allotment', [{
    files:[
        "root/allocation/allotment/_res/js/service.js",
    ]
}]);
app.controller('subsCtrl',function ($scope,$state) {
    if ($state.current.url == '/allotment') {//默认加载列表
        $state.go('root.allocation.allotment.summary[12]')
    }
    $scope.$emit('isVi',false);//判断是否出现搜索按钮
}).controller('subsMenuCtrl',function($scope,$state,$rootScope,$location,allotmentSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='summary[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'summaryMenu';
        }
    });
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu';
        }

    }
    $scope.menuCheck = function (name) {
        var buttonName = name;
        $scope.buttonShow = true;
        allotmentSer.subsPermission(buttonName).then(function(response){
            if(response.data.code == 0 && response.data.data){
                $scope[buttonName] = true;
            }else{
                $scope[buttonName] = false;
            }
        });
        $scope.menuAdd = false;
    };
    //监听到父Ctrl后改变事件
    $scope.$on("getId", function(event, msg){
       $scope.idListd = msg;
    });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
    $scope.summary = function(){
        $scope.menuClass = 'summaryMenu';
    };
});
//自定义过滤
app.filter('all', function(){
    return function (val) {
        var result;
        switch(val){
            case false:
                result = "处罚";
                break;
            case true:
                result = "奖励";
                break;
            case 'ADMININSTRATION':
                result = "行政任务";
                break;
            case 'ENGINEERING':
                result = "工程任务";
                break;
            case 'TRAINING':
                result = "培训任务";
                break;
        }
        return result;
    }
});
//去重
app.filter('unique', function () {
  return function (collection, keyname) {
    var output = [],
      keys = [];
    angular.forEach(collection, function (item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
});