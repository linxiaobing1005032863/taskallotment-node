var app = angular.module('addition', [{
    files:[
        "root/allocation/addition/_res/js/service.js",
    ]
}]);
app.controller('additCtrl',function ($scope,$state) {
    if ($state.current.url == '/addition') {//默认加载列表
        $state.go('root.allocation.addition.list[12]')
    }
    $scope.$emit('isVi',true);//判断是否出现搜索按钮
}).controller('additMenuCtrl',function($scope,$state,$rootScope,$location,additSer){
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
        additSer.additPermission(buttonName).then(function(response){
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
    $scope.$on("getTwoId", function(event, msg){
        $scope.idListdTwo = msg;
    });
    $scope.$on("getTwoMark", function(event, msg){
        $scope.twoMark = msg;
    });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    //-----------------------------------
    $scope.$on('areaList',function(event,flag){
        $scope.area = flag;
    });
    $scope.$on('departList',function(event,flag){
        $scope.depart = flag;
    });
    $scope.$on('makeProjectList',function(event,flag){
        $scope.makeProject = flag;
    });
    $scope.$on('projectIdList',function(event,flag){
        $scope.projectId = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
    $scope.listDetails = function(){
        if($scope.idListd){
            $state.go('root.allocation.addition.listDetails[12]',{id:$scope.idListd,page:$scope.page,area:$scope.area,depart:$scope.depart,makeProject:$scope.makeProject,projectId:$scope.projectId});
            $scope.menuClass = 'listDetailsMenu'
        }
    };
    $scope.list = function(){
        $state.go('root.allocation.addition.list[12]',{id:'',page:$scope.page,area:$scope.area,depart:$scope.depart,makeProject:$scope.makeProject,projectId:$scope.projectId});
        $scope.menuClass = 'listMenu'
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = ''
    };
});
//自定义过滤
app.filter('addit', function(){
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
            case "NOMAKE":
                result = "预立项";
                break;
            case "HADMAKE":
                result = "立项";
                break;
            case "NOTMAKE":
                result = "不立项";
                break;
            case "MINUTE":
                result = "分钟";
                break;
            case "HOUR":
                result = "小时";
                break;
            case "DAY":
                result = "天";
                break;
        }
        return result;
    }
});