var app = angular.module('itemList', ['ng-pagination','toastr']);
app.controller('itemListCtrl',function($scope,itemSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    $scope.$emit('twoID', null);
    //删除
    //获取id
    $scope.inClick=function(id2){
        $scope.$emit('changeId',null);
        $scope.idListd2 = id2;
        $scope.$emit('twoID', $scope.idListd2);

    }
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
            'root.allocation.projects.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id
        };
        itemSer.itemDelete(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.allocation.projects.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.allocation.projects.list[12]',{id:null,name:null,page:$stateParams.page-1});
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
    //获取搜索字段
    // $scope.competitive = $stateParams.competitive?$stateParams.competitive:'';
    // if($stateParams.competitive){
    //     $scope.$emit('isId', false);
    //     $scope.isView = false;
    // }else{
    //     $scope.$emit('isId', true);
    // }
    //搜索
    // $scope.collect = function(){
    //     $state.go('root.allocation.projects.list[12]',{competitive:$scope.competitive});

    // }
    function activatePage(page) {
         
        var listData = {
            // competitive:$scope.competitive || " ",
            page:page || 1
        };
    
        itemSer.itemList(listData).then(function(response){
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
        itemSer.itemCount(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    }
    // 搜索功能字段
    // $scope.titles = ['竞争公司'];
    $scope.selectList = function(event){
        angular.forEach($scope.openLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('twoID',null);
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
    //点击更多详细
    $scope.moreList2 = function(event){
        angular.forEach($scope.openLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList2 = false
            }
        });
        event._moreList2 = !event._moreList2;
    };
//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    

});

