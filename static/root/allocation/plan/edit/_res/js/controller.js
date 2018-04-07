var app = angular.module('planEdit', ['toastr']);
app.controller('planEditCtrl', function($scope, planSer,$stateParams,$state,toastr){
$scope.showed=true
    planSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.gitNames = response.data.data;
        }
    });
    $scope.times=function(){
        
            if($scope.vm.taskType=='ADMININSTRATION'){
                $scope.vm.timesType='ADMININSTRATIONS'
            }else if($scope.vm.taskType=='ENGINEERING'){
                $scope.vm.timesType='ENGINEERINGS'
            }else if($scope.vm.taskType=='TRAINING'){
                $scope.vm.timesType='TRAININGS'
            }
    }
    $scope.changSelect = function(){
    //     if($scope.vm.changeName=="执行人"){
    //         $scope.vm.charge=$scope.vm.gitName;
    //         $scope.vm.execute=' ';
    //     }else if($scope.vm.changeName=="负责人"){
    //         $scope.vm.execute=$scope.vm.gitName;
    //         $scope.vm.charge=' ';
    //     }
    }
    $scope.btos =[{customTitles:[{}]}];
    $scope.add = function(){
        if($scope.btos == null){
            $scope.btos =[];
        }
        var obj = {customTitles:[{}]};
        $scope.btos.push(obj);
        return
    }
    $scope.del = function(flag){
        $scope.btos.splice(flag,1);
    }
    $scope.changSelect2 = function(index){
        var num=angular.element('.change2')[index].value;
        if(num=="TEXT"){
            $('.zdnr1').eq(index).css('display','block');
            $('.zdnr2').eq(index).css('display','none');
            $('.zdnr3').eq(index).css('display','none');
            $('.zdnr4').eq(index).css('display','none');
            $('.zdnr5').eq(index).css('display','none');
        }else if(num=="INT"){
            $('.zdnr1').eq(index).css('display','none');
            $('.zdnr2').eq(index).css('display','block');
            $('.zdnr3').eq(index).css('display','none');
            $('.zdnr4').eq(index).css('display','none');
            $('.zdnr5').eq(index).css('display','none');
        }else if(num=="DOUBLE"){
            $('.zdnr1').eq(index).css('display','none');
            $('.zdnr2').eq(index).css('display','block');
            $('.zdnr3').eq(index).css('display','none');
            $('.zdnr4').eq(index).css('display','none');
            $('.zdnr5').eq(index).css('display','none');
        }else if(num=="DATE"){
            $('.zdnr1').eq(index).css('display','none');
            $('.zdnr2').eq(index).css('display','none');
            $('.zdnr3').eq(index).css('display','block');
            $('.zdnr4').eq(index).css('display','none');
            $('.zdnr5').eq(index).css('display','none');
        }else if(num=="DATETIME"){
            $('.zdnr1').eq(index).css('display','none');
            $('.zdnr2').eq(index).css('display','none');
            $('.zdnr3').eq(index).css('display','none');
            $('.zdnr4').eq(index).css('display','block');
            $('.zdnr5').eq(index).css('display','none');
        }else if(num=="BOOLEAN"){
            $('.zdnr1').eq(index).css('display','none');
            $('.zdnr2').eq(index).css('display','none');
            $('.zdnr3').eq(index).css('display','none');
            $('.zdnr4').eq(index).css('display','none');
            $('.zdnr5').eq(index).css('display','block');
        }
    }












    var infoData ={id: $stateParams.id};
    //获取ID
    planSer.getId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.vm = response.data.data;
            if($scope.vm.execute!=''){
                $scope.vm.gitName=$scope.vm.execute;
                $scope.vm.changeName='执行人';
            }else if($scope.vm.charge!=''){
                $scope.vm.gitName=$scope.vm.charge;
                $scope.vm.changeName='负责人';
            }
            if($scope.vm.customTitles!='' && $scope.vm.customTitles!=undefined){
                $scope.btos=$scope.vm.customTitles;
            }else{
                $scope.btos =null;
            }
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    //编辑点击提交
    $scope.openEditFun = function(){
        if($scope.vm.changeName=="执行人"){
            $scope.vm.execute=$scope.vm.gitName;
            $scope.vm.charge='';
        }else if($scope.vm.changeName=="负责人"){
            $scope.vm.charge=$scope.vm.gitName;
            $scope.vm.execute='';
        }
        var data = {
            id:$stateParams.id,
            tableId:$stateParams.id,
            taskName:$scope.vm.taskName,
            planTime:angular.element('.planTime').val(),
            taskType:$scope.vm.taskType,
            content:$scope.vm.content,
            planNum:$scope.vm.planNum,
            needTime:$scope.vm.needTime1,
            needType:$scope.vm.needType,
            remark:$scope.vm.remark,
            charge:$scope.vm.charge,
            execute:$scope.vm.execute,
            taskStatus:$scope.vm.taskStatus,
            moudle:$scope.vm.moudle,
            gpriority:$scope.vm.gpriority,
            timesType:$scope.vm.timesType,
            customTitles:angular.copy($scope.btos),
        }
        var addData = converFormData(data);
        planSer.planEdit(addData).then(function(response){
            if(response.data.code == 0){
                // $scope.$emit('areaTo',$stateParams.area);
                // $scope.$emit('departTo',$stateParams.depart);
                // $scope.$emit('makeProjectTo',$stateParams.makeProject);
                // $scope.$emit('projectIdTo',$stateParams.projectId);
                $state.go('root.allocation.plan.list[12]',{area:$stateParams.area,depart:$stateParams.depart,makeProject:$stateParams.makeProject,projectId:$stateParams.projectId});
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

