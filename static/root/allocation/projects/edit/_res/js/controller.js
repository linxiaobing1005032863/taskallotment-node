var app = angular.module('itemEdit', ['toastr']);
app.controller('itemEditCtrl', function($scope, itemSer,$stateParams,$state,toastr){
$scope.showed=true
    itemSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    itemSer.getProject().then(function(response){
        if(response.data.code == 0){
            $scope.projects = response.data.data;
        }
    });
    itemSer.getInternal().then(function(response){
        if(response.data.code == 0){
            $scope.internals = response.data.data;
        }
    });
    itemSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    itemSer.getApproval().then(function(response){
        if(response.data.code == 0){
            $scope.approvals = response.data.data;
        }
    });
    itemSer.getNums().then(function(response){
        if(response.data.code == 0){
            $scope.nums = response.data.data;
        }
    });

     $scope.btos =[{tables:[{}]}];
    $scope.add = function(){
        var obj = {tables:[{}]};
        $scope.btos.push(obj);
    }
    $scope.del = function(flag){
        $scope.btos.splice(flag,1);
    }
    var infoData ={id: $stateParams.id};
    //获取ID
    itemSer.itemId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.item = response.data.data;
            if($scope.item.tables.status=="START"){
                $scope.item.tables.status='启用';
            }else if($scope.item.tables.status=="END"){
                $scope.item.tables.status='禁用';
            }
            if($scope.item.tables!='' && $scope.item.tables!=undefined){
                $scope.btos=$scope.item.tables;
            }
            
            
            if($scope.item.status=="START"){
                $scope.item.status='启用';
            }else if($scope.item.status=="END"){
                $scope.item.status='禁用';
            }
            // for(var i=0;i<$scope.btos.length;i++){
            //     var index=i;
            //     if($scope.btos[index].status=="启用"){
            //         $scope.btos[index].status='START';
            //         // 需要把字符串转化为对象
            //     }else if($scope.btos[index].status=="禁用"){
            //         $scope.btos[index].status='END';
            //         // 需要把字符串转化为对象
            //     }
            // }
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    });


   



    //编辑点击提交
    $scope.openEditFun = function(){
        if($scope.item.status=="启用"){
            $scope.item.status='START';
            // 需要把字符串转化为对象
        }else if($scope.item.status=="禁用"){
            $scope.item.status='END';
            // 需要把字符串转化为对象
        }
        for(var i=0;i<$scope.btos.length;i++){
            var index=i;
            if($scope.btos[index].status=="启用"){
                $scope.btos[index].status='START';
                // 需要把字符串转化为对象
            }else if($scope.btos[index].status=="禁用"){
                $scope.btos[index].status='END';
                // 需要把字符串转化为对象
            }
        }
        var data = {
            area:$scope.item.area,
            project:$scope.item.project,
            innerProject:$scope.item.innerProject,
            depart:$scope.item.depart,
            makeProject:$scope.item.makeProject,
            dispatchNum:$scope.item.dispatchNum,
            status:$scope.item.status,
            tables:angular.copy($scope.btos),
            id:$stateParams.id
        }
        var addData = converFormData(data);
        itemSer.itemEdit(addData).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.projects.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});


//数据类型转换工具
function converFormData() {
    var objToFormData = function(obj,obj2,sec,flag){
        if(obj){
            var count = 0;
            for(var name in obj){
                var val = obj[name];
                if(val instanceof Array){
                    val.forEach(function (item,index) {
                        for(var name2 in item){
                            var val2 = item[name2];
                            if(val2 instanceof Array){
                                val2.forEach(function (dItem,dIndex) {
                                    objToFormData(dItem,obj,name+'['+index+'].'+name2,dIndex);
                                });
                            }else{
                                if((typeof val2)!='function'){
                                    obj[name+'['+index+'].'+name2] = val2;
                                }
                            }
                        }
                    });
                    delete obj[name];
                }else if(sec){
                    if((typeof val)!='function'){
                        obj2[sec+'['+flag+'].'+name] = val;
                        count++;
                    }
                }else if(typeof val == 'object'){
                    for(var key in val){
                        obj[name + '.' + key] = val[key];
                    }
                    delete obj[name];
                }
            }
        }

    }
    var _obj = $.extend(true,{},arguments[0]);
    objToFormData(_obj);
    return _obj;
}


