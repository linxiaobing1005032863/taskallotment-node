var app = angular.module('workList', ['ng-pagination','toastr']);
app.controller('workListCtrl',function($scope,worksetSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    //删除
    //获取id
    
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function(){//取消删除
        $scope.delShow = false;
        $state.go('' +
            'root.allocation.workhours.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id
        };
        worksetSer.workDelete(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.allocation.workhours.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.allocation.workhours.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    $scope.isView = false;
    function activatePage(page) {
         
        var listData = {
            page:page || 1
        };
    
        worksetSer.workList(listData).then(function(response){
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
        worksetSer.workCount(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    }
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

