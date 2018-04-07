var app = angular.module('distribution', [{
    files:[
        "root/allocation/distribution/_res/js/service.js",
    ]
}]);
app.controller('distCtrl',function ($scope,$state) {
    if ($state.current.url == '/distribution') {//默认加载列表
        $state.go('root.allocation.distribution.list[12]')
    }
    $scope.$emit('isVi',true);//判断是否出现搜索按钮
}).controller('distMenuCtrl',function($scope,$state,$rootScope,$location,distSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
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
        distSer.additPermission(buttonName).then(function(response){
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
    $scope.$on('pageId5',function(event,flag){
        $scope.tos = flag;
        console.log( $scope.tos)
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
    $scope.achieve = function(){
        if($scope.idListd){
            $state.go('root.allocation.distribution.list[12]',{id:$scope.idListd,name:'achieve',page:$scope.page,tos:$scope.tos});
            $scope.menuClass = 'achieveMenu'
        }
    };
    $scope.undone = function(){
        if($scope.idListd){
            $state.go('root.allocation.distribution.list[12]',{id:$scope.idListd,name:'undone',page:$scope.page,tos:$scope.tos});
            $scope.menuClass = 'undoneMenu'
        }
    };
    $scope.reback = function(){
        if($scope.idListd){
            $state.go('root.allocation.distribution.list[12]',{id:$scope.idListd,name:'reback',page:$scope.page});
            $scope.menuClass = 'rebackMenu'
        }
    };
    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.allocation.distribution.edit[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu'
    };
    $scope.listDetails = function(){
        if($scope.idListd){
            $state.go('root.allocation.distribution.listDetails[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'listDetailsMenu'
        }
    };
});


//自定义过滤
app.filter('dist', function(){
    return function (val) {
        var result;
        switch(val){
            case "START":
                result = "启用";
                break;
            case "END":
                result = "禁用";
                break;
            case true:
                result = "是";
                break;
            case false:
                result = "否";
                break;
            case "ADMININSTRATION":
                result = "行政任务";
                break;
            case "ENGINEERING":
                result = "工程任务";
                break;
            case "TRAINING":
                result = "培训任务";
                break;
            case "ADMININSTRATIONS":
                result = "行政时长";
                break;
            case "ENGINEERINGS":
                result = "工程时长";
                break;
            case "TRAININGS":
                result = "培训时长";
                break;
            case "FINISH":
                result = "已完成";
                break;
            case "UNFINISHED":
                result = "未完成";
                break;
            case "DOING":
                result = "正在执行";
                break;
            case "RECEIVE":
                result = "待接收";
                break;
            case "NOTRECEIVE":
                result = "不接收";
                break;
            case "TOBEAUDITED":
                result = "上报待审核";
                break;
            case "TEXT":
                result = "文本";
                break;
            case "INT":
                result = "整数";
                break;
            case "DOUBLE":
                result = "非整数";
                break;
            case "DATE":
                result = "日期";
                break;
            case "DATETIME":
                result = "时间日期";
                break;
            case "BOOLEAN":
                result = "逻辑类型";
                break;
        }
        return result;
    }
});