var app = angular.module('distEdit', ['toastr']);
app.controller('distEditCtrl', function($scope, distSer,$stateParams,$state,toastr){
    
$scope.showed=true
    distSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });
    distSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    distSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    $scope.times=function(){
            if($scope.dist.taskType=='ADMININSTRATION'){
                $scope.dist.timesType='ADMININSTRATIONS'
            }else if($scope.dist.taskType=='ENGINEERING'){
                $scope.dist.timesType='ENGINEERINGS'
            }else if($scope.dist.taskType=='TRAINING'){
                $scope.dist.timesType='TRAININGS'
            }
    }
    $scope.btos =[{questions:[{}]}];
    $scope.add = function(){
        var obj = {questions:[{}]};
        $scope.btos.push(obj);
    }
    $scope.del = function(flag){
        $scope.btos.splice(flag,1);
    }

    var infoData ={id: $stateParams.id};
    //获取ID
    distSer.distriId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.dist = response.data.data;
            if($scope.dist.questions!='' && $scope.dist.questions!=undefined){
                $scope.btos=$scope.dist.questions;
            }
            
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

//------------------------------------------接口获取没弄--------------------------------------------




    
    //编辑点击提交
    $scope.openEditFun = function(){
        for(let i=0;i<$scope.btos.length;i++){
            $scope.btos[i].expectTime=angular.element(".expectTime")[i].value;
        }

        var data = {
            id:$stateParams.id,
            execute:$scope.dist.execute,
            executeArea:$scope.dist.executeArea,
            executeDepart:$scope.dist.executeDepart,
            planNum:$scope.dist.planNum,
            taskType:$scope.dist.taskType,
            taskName:$scope.dist.taskName,
            needTime:$scope.dist.needTime1,
            needType:$scope.dist.needType,
            content:$scope.dist.content,
            planTime:angular.element('.planTime').val(),
            startTime:angular.element('.startTime').val(),
            endTime:angular.element('.endTime').val(),
            startExecute:angular.element('.startExecute').val(),
            endExecute:angular.element('.endExecute').val(),
            actualTime:$scope.dist.actualTime1,
            actualType:$scope.dist.actualType,
            undoneTime:$scope.dist.undoneTime1,
            undoneType:$scope.dist.undoneType,
            taskStatus:$scope.dist.taskStatus,
            finishTime:angular.element('.finishTime').val(),
            remark:$scope.dist.remark,
            notice:$scope.dist.notice,
            reimbursement:$scope.dist.reimbursement,
            question:$scope.dist.question,
            moudle:$scope.dist.moudle,
            timesType:$scope.dist.timesType,
            gpriority:$scope.dist.gpriority,
            questions:angular.copy($scope.btos)
        }
        var addData = converFormData(data);
        distSer.distriEdit(addData).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.distribution.list[12]');
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