var app = angular.module('chargList', ['ng-pagination','toastr']);
app.controller('chargListCtrl',function($scope,chargeSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
   
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    //获取搜索字段
    $scope.competitive = $stateParams.competitive?$stateParams.competitive:'';
    if($stateParams.competitive){
        $scope.$emit('isId', false);
        $scope.isView = false;
    }else{
        $scope.$emit('isId', true);
    }
    //搜索
    $scope.collect = function(){
        $state.go('root.allocation.charge.list[12]',{competdepartitive:$scope.competitive});

    }
    function activatePage(page) {
        var listData = {
            depart:$scope.competitive || " ",
            page:page || 1
        };
    
        chargeSer.charList(listData).then(function(response){
            if(response.data.code == 0){
                $scope.openLists = response.data.data;
                if($stateParams.id){
                    angular.forEach($scope.openLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                    $scope.$emit('page',$location.search().page);
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
        chargeSer.charCount(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    }
// 搜索功能字段
$scope.titles = ['部门'];
    $scope.selectList = function(event){
        angular.forEach($scope.openLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('page',$location.search().page);
    };
    //点击更多详细
    $scope.moreList = function(event){
        angular.forEach($scope.openLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };

//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    

});

