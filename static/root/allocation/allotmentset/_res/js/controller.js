var app = angular.module('allotmentset', [{
    files:[
        "root/allocation/allotmentset/_res/js/service.js",
    ]
}]);
app.controller('allotCtrl',function ($scope,$state) {
    if ($state.current.url == '/allotmentset') {//默认加载列表
        $state.go('root.allocation.allotmentset.list[12]')
    }
    $scope.$emit('isVi',false);//判断是否出现搜索按钮
}).controller('allotMenuCtrl',function($scope,$state,$rootScope,$location,allotsetSer){
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
        allotsetSer.allotPermission(buttonName).then(function(response){
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
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.allocation.allotmentset.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page});
            $scope.menuClass = 'deleteMenu'
        }
    };

    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.allocation.allotmentset.edit[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu'
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = ''
    };
});



//自定义过滤
app.filter('allset', function(){
    return function (val) {
        var result;
        switch(val){
            case "START":
                result = "启用";
                break;
            case "END":
                result = "禁用";
                break;
            case "MINTUE":
                result = "分钟";
                break;
            case "HOUR":
                result = "小时";
                break;
            case "DAY":
                result = "天";
                break;
            case "WEEK":
                result = "周";
                break;
            case "MONTH":
                result = "月";
                break;
            case "ALL":
                result = "全体";
                break;
            case "DEPART":
                result = "部门";
                break;
            case "PERSON":
                result = "个人";
                break;
            case "SEASON":
                result = "季度";
                break;
            case "YEAR":
                result = "年";
                break;
            case "WHOLE":
                result = "整体汇总";
                break;
            case "DEPART":
                result = "项目组/部门汇总";
                break;
            case "PERSON":
                result = "个人汇总";
                break;
        }
        return result;
    }
});