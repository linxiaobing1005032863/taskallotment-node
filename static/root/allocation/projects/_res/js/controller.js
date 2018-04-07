var app = angular.module('projects', [{
    files:[
        "root/allocation/projects/_res/js/service.js",
    ]
}]);
app.controller('itemCtrl',function ($scope,$state) {
    if ($state.current.url == '/projects') {//默认加载列表
        $state.go('root.allocation.projects.list[12]')
    }
    $scope.$emit('isVi',false);//判断是否出现搜索按钮
}).controller('itemMenuCtrl',function($scope,$state,$rootScope,$location,itemSer){
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
        itemSer.itemPermission(buttonName).then(function(response){
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
        $scope.idListTwo = msg;
     });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'deleteMenu'
        }
    };

    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.edit[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.addTab = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.addTab[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'addTabMenu'
        }
    };
    $scope.editTab = function(){
        if($scope.idListTwo){
            $state.go('root.allocation.projects.editTab[12]',{id:$scope.idListTwo,page:$scope.page});
            $scope.idListd = '';
            $scope.menuClass = 'editTabMenu'
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = '';
        $scope.idListTwo = '';
    };
    //----------------------------------
    $scope.exportPro = function(){
        $scope.menuClass = 'exportProMenu';
        $scope.idListd = '';
        $scope.idListTwo = ''
    };
    $scope.importPro = function(){
        $scope.menuClass = 'importProMenu';
        $scope.idListd = '';
        $scope.idListTwo = ''
    };
    $scope.importList = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.importList[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'importListMenu'
        }
    };
    $scope.exportList = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.exportList[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'exportListMenu'
        }
    };
    $scope.importNew = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.importNew[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'importNewMenu'
        }
    };
    $scope.exportNew = function(){
        if($scope.idListd){
            $state.go('root.allocation.projects.exportNew[12]',{id:$scope.idListd,page:$scope.page});
            $scope.idListTwo = '';
            $scope.menuClass = 'exportNewMenu'
        }
    };
});

//自定义过滤
app.filter('pro', function(){
    return function (val) {
        var result;
        switch(val){
            case "START":
                result = "启用";
                break;
            case "END":
                result = "禁用";
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
        }
        return result;
    }
});