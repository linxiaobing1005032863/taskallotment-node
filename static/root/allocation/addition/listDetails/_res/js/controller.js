var app = angular.module('additListDetails', ['ng-pagination','toastr']);
app.controller('additListDetailsCtrl',function($scope,additSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    function activatePage(page) { 
        var listData = {
            page:page || 1,
            id: $stateParams.id
        };
        additSer.getId(listData).then(function(response){
            if(response.data.code == 0){
                $scope.lists = response.data.data;
                if($stateParams.id){
                    angular.forEach($scope.lists,function(obj){
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
        additSer.additCount(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    }
    $scope.selectList = function(event){
        angular.forEach($scope.lists,function(obj){
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
        angular.forEach($scope.lists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
    //点击更多详细
    $scope.moreList2 = function(event){
        angular.forEach($scope.lists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList2 = false
            }
        });
        event._moreList2 = !event._moreList2;
    };
    //点击更多详细
    $scope.moreList3 = function(event){
        angular.forEach($scope.lists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList3 = false
            }
        });
        event._moreList3 = !event._moreList3;
    };
//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    

});

