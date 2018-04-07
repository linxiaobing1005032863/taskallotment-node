var app = angular.module('planInitiate', ['toastr']);
app.controller('planInitiateCtrl', function($scope, planSer,$stateParams,$state,toastr){

    $scope.edit={};
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours(); 
    var m = d.getMinutes(); 
    var se = d.getSeconds(); 
    $scope.endT=vYear+'-'+toDou(vMon)+'-'+toDou(vDay)+' '+'18:00:00';
    $scope.startT=vYear+'-'+toDou(vMon)+'-'+toDou(vDay)+' '+'08:30:00';

    $scope.showed=true
    planSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.gitNames = response.data.data;
        }
    });
    
$scope.changSelect = function(){
    if($scope.vm.changeName=="执行人"){
        $scope.vm.charge=$scope.vm.gitName;
        $scope.vm.execute=' ';
    }else if($scope.vm.changeName=="负责人"){
        $scope.vm.execute=$scope.vm.gitName;
        $scope.vm.charge=' ';
    }
}

$scope.changSelect3 = function(){
    if($scope.vm.split==true){
        $scope.splitDay={"opacity":"1"};
    }else if($scope.vm.split==false){
        $scope.splitDay={"opacity":"0"};
    }
}

    $scope.btos =[{customTitles:[{}]}];
    $scope.add = function(){
        var obj = {customTitles:[{}]};
        $scope.btos.push(obj);
        return
    }
    $scope.del = function(flag){
        $scope.btos.splice(flag,1);
    }

    var infoData ={id: $stateParams.id};
    // 获取ID
    planSer.getId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.vm = response.data.data;
            if($scope.vm.charge!='' && $scope.vm.charge != undefined){
                $scope.vm.gitName=$scope.vm.charge;
                $scope.vm.changeName='执行人';
            }else if($scope.vm.execute!='' && $scope.vm.execute != undefined){
                $scope.vm.gitName=$scope.vm.execute;
                $scope.vm.changeName='负责人';
            }
            if($scope.vm.customTitles!='' && $scope.vm.customTitles!=undefined){
                $scope.btos=$scope.vm.customTitles;
            }
            if($scope.vm.split==false){
                // console.log(111)
                $scope.splitDay={"opacity":"0"};
            }
            if($scope.vm.startTime == '' || $scope.vm.startTime == undefined){
                $scope.vm.startTime=$scope.startT;
            }
            if($scope.vm.endTime == '' || $scope.vm.endTime == undefined){
                $scope.vm.endTime=$scope.endT;
            }
        }else{
            toastr.error( response.data.msg, '温馨提示');
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

//无法获取$scope.btos[i].list.titleType，多个情况下互相干扰
// $('.zdnr1').css('display','block');
// $('.zdnr2').css('display','none');
// $('.zdnr3').css('display','none');
// $('.zdnr4').css('display','none');
// $('.zdnr5').css('display','none');
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
    //编辑设置点击提交
    $scope.openEditFun = function(){
        // if($stateParams.confirm=='' || $stateParams.confirm==undefined || $stateParams.confirm==false){
        // if($scope.vm.confirm=='' || $scope.vm.confirm==undefined || $scope.vm.confirm==false){
        //     $scope.setShow = true;
        //     $scope.setFn = function(){
        //         getAll();
        //     }
        //     $scope.cancel = function(){
        //         $scope.setShow = false;
        //     }
        // }else{
        //     getAll();
        // }
        getAll();
        function getAll(){
            var data = {
                id: $stateParams.id,
                tableId:$stateParams.id,
                taskName:$scope.vm.taskName,
                planTime:angular.element('.planTime').val(),
                taskType:$scope.vm.taskType,
                content:$scope.vm.content,
                planNum:$scope.vm.planNum,
                needTime:$scope.vm.needTime1,
                needType:$scope.vm.needType,
                remark:$scope.vm.remark,
                charge:$scope.vm.gitName,
                startTime:angular.element('.startTime').val(),
                endTime:angular.element('.endTime').val(),
                execute:$scope.vm.gitName,
                split:$scope.vm.split,
                day:$scope.vm.day,
                taskStatus:$scope.vm.taskStatus,
                moudle:$scope.vm.moudle,
                gpriority:$scope.vm.gpriority,
                timesType:$scope.vm.timesType,
                customTitles:angular.copy($scope.btos),
            }
            var addData = converFormData(data);
            // vm.editplan.projectName = angular.element('.na').val();
            planSer.planInitiate(addData).then(function(response){
                if(response.data.code == 0){
                    $state.go('root.allocation.plan.list[12]',{area:$stateParams.area,depart:$stateParams.depart,makeProject:$stateParams.makeProject,projectId:$stateParams.projectId});
                    toastr.success( "编辑成功", '温馨提示');
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
        }
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
function toDou(num){
    return num<10?'0'+num:num;
}