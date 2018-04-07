var app = angular.module('distList', ['ng-pagination','toastr']);
app.controller('distListCtrl',function($scope,distSer,toastr,$stateParams,$state,$location){

    $scope.$emit('changeId', null);
    $scope.$emit('changeId5', null);
    //删除
    //获取id
    
    if($stateParams.id){
        switch ($stateParams.name){
            case 'reback':
                $scope.reShow = true;
                break;
            case 'achieve':
                $scope.reShow1 = true;
                break;
            case 'undone':
                $scope.reShow2 = true;
                break;

        }
    }
    $scope.recel = function(){//取消
        $scope.reShow = false;
        $state.go('' +
            'root.allocation.distribution.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.reFn = function(){//确认
        var data = {
            id:$stateParams.id
        };
    
        distSer.distrireback(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "任务已撤回", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    $scope.affirm = function(){//批量确认
        var data = {
            id:$stateParams.tos
        };

       for (var prop in data) {
        var rus=data[prop].split(",");
        rus.pop();
        $scope.toss=[];
        distSer.distriList().then(function(response){
            if(response.data.code == 0){
                $scope.openListss = response.data.data;
          }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

        for(var i=0;i<rus.length;i++){
            $scope.openListss[i].needTime=$scope.openListss[i].needTime1;
            $scope.toss.push($scope.openListss[i])
    
        }

      }
    
        var datas={
                tos:$scope.toss,
           }
        var addData = converFormData(datas);

        distSer.distrireaffirm(addData).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "任务已确认", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    $scope.unaffirm = function(){//批量未确认
        var data = {
            id:$stateParams.tos
        };

       for (var prop in data) {
        var rus=data[prop].split(",");
        rus.pop();
        $scope.toss=[];
        distSer.distriList().then(function(response){
            if(response.data.code == 0){
                $scope.openListss = response.data.data;
          }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

        for(var i=0;i<rus.length;i++){
            $scope.openListss[i].needTime=$scope.openListss[i].needTime1;
            $scope.toss.push($scope.openListss[i])
    
        }

      }
    
        var datas={
                tos:$scope.toss,
           }
        var addData = converFormData(datas);
        distSer.distrireunaffirm(addData).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "任务已经全部未确认", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.allocation.distribution.list[12]',{id:null,name:null,page:$stateParams.page-1});
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
    //获取搜索字段
    $scope.user = $stateParams.user?$stateParams.user:'';
    if($stateParams.user){
        $scope.$emit('isId', false);
        $scope.isView = false;
    }else{
        $scope.$emit('isId', true);
    }
    //搜索
    $scope.collect = function(){
        $state.go('root.allocation.distribution.list[12]',{user:$scope.user});

    }
     // 搜索功能字段
     $scope.titles = ['姓名'];


    function activatePage(page) {
        // if($scope.openLists)return;
        var listData = {
            user:$scope.user || "",
            page:page || 1
        };
    
        distSer.distriList(listData).then(function(response){
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
        distSer.distriCount(listData).then(function(response){
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
    //checkbox的值

     $scope.affirm1 = function(){  
        $scope.userIdList= '';                           //先赋值 '' 避免append的时候 undefined  
         var formEle = document.testFrom.elements.userId; //获取form表单name等于userId元素  
          $scope.more=[];
          for (var i = 0; i < formEle.length; i++) {       //遍历userId元素  
            if(formEle[i].checked){  //判断是否选中  
                $scope.userIdList +=i+","; 
            //   $scope.more.push(  $scope.userIdList);
            
            }
         }  
         $scope.$emit('changeId5',$scope.userIdList);
       }  
        


    

});
//数据类型转换工具
function converFormData() {
    var objToFormData = function (obj, obj2, sec, flag) {
        if (obj) {
            var count = 0;
            for (var name in obj) {
                var val = obj[name];
                if (val instanceof Array) {
                    val.forEach(function (item, index) {
                        for (var name2 in item) {
                            var val2 = item[name2];
                            if (val2 instanceof Array) {
                                val2.forEach(function (dItem, dIndex) {
                                    for (var name3 in dItem) {
                                        var val3 = dItem[name3];
                                        if (val3 instanceof Array) {
                                            val3.forEach(function (sItem, sIndex) {
                                                objToFormData(sItem, obj, name + '[' + index + '].' + name2 + '[' + dIndex + '].' + name3, sIndex);
                                            })
                                        }else {
                                           if((typeof val3) != 'function'){
                                               obj[name + '[' + index + '].' + name2+'['+dIndex+'].'+name3] = val3;
                                           }
                                        }
                                    }
                                });
                            } else {
                                if ((typeof val2) != 'function') {
                                    obj[name + '[' + index + '].' + name2] = val2;
                                }
                            }
                        }
                    });
                    delete obj[name];
                } else if (sec) {
                    if ((typeof val) != 'function') {
                        obj2[sec + '[' + flag + '].' + name] = val;
                        count++;
                    }
                } else if (typeof val == 'object') {
                    for (var key in val) {
                        obj[name + '.' + key] = val[key];
                    }
                    delete obj[name];
                }
            }
        }
    }
    var _obj = $.extend(true, {}, arguments[0]);
    objToFormData(_obj);
    return _obj;
}


