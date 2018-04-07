var app = angular.module('planEditSet', ['toastr']);
app.controller('planEditSetCtrl', function($scope, planSer,$stateParams,$state,toastr){
    $scope.showed=true
    $scope.arr=[];
    $scope.box=[];
    // $scope.vm={}
    planSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.gitNames = response.data.data;
            // for(var i=0;i<$scope.TaskNodeList.length;i++){
            //     if($scope.TaskNodeList[i].gitName=='' || $scope.TaskNodeList[i].gitName==undefined){
            //         for(var i=0;i<$scope.gitNames.length;i++){
            //             $scope.box.push($scope.gitNames[i].username);
            //         }
            //     }
                
            //     $scope.search=function(){
            //         $scope.box=[];
            //         for(var i=0;i<$scope.gitNames.length;i++){
            //             $scope.arr.push($scope.gitNames[i].username);
            //             if($scope.TaskNodeList[i].gitName=='' || $scope.TaskNodeList[i].gitName==undefined){
            //                 $scope.box=[];
            //                 $scope.box=$scope.arr;
            //                 break;
            //             }
            //             if($scope.TaskNodeList[i].gitName!='' || $scope.TaskNodeList[i].gitName!=undefined){
            //                 if($scope.arr[i].match($scope.TaskNodeList[i].gitName)){
            //                     $scope.box.push($scope.arr[i])
            //                 }
            //             }
            //         }
            //     }
            // }


            if($scope.vm.gitName=='' || $scope.vm.gitName==undefined){
                for(var i=0;i<$scope.gitNames.length;i++){
                    $scope.box.push($scope.gitNames[i].username);
                }
            }
            
            $scope.search=function(){
                $scope.box=[];
                for(var i=0;i<$scope.gitNames.length;i++){
                    $scope.arr.push($scope.gitNames[i].username);
                    if($scope.vm.gitName=='' || $scope.vm.gitName==undefined){
                        $scope.box=[];
                        $scope.box=$scope.arr;
                        break;
                    }
                    if($scope.vm.gitName!='' || $scope.vm.gitName!=undefined){
                        if($scope.arr[i].match($scope.vm.gitName)){
                            $scope.box.push($scope.arr[i])
                        }
                    }
                }
            }


            
        }
    });


    $scope.TaskNodeList=[{customTitles:[{}]}];
    $scope.addAll=function(){
        var objAll={customTitles:[{}]};
        $scope.TaskNodeList.push(objAll);
        return
    }
    $scope.delAll=function(flag){
        $scope.TaskNodeList.splice(flag,1);
    }




    $scope.add = function(num){
        var customTitles1={}
        num.customTitles.push(customTitles1);
        return
    }
    $scope.del = function(flag,numd){
        numd.customTitles.splice(flag,1);
    }


    $scope.times=function(){
        
        for(var i=0;i<$scope.TaskNodeList.length;i++){
            if($scope.TaskNodeList[i].taskType=='ADMININSTRATION'){
                $scope.TaskNodeList[i].timesType='ADMININSTRATIONS'
            }else if($scope.TaskNodeList[i].taskType=='ENGINEERING'){
                $scope.TaskNodeList[i].timesType='ENGINEERINGS'
            }else if($scope.TaskNodeList[i].taskType=='TRAINING'){
                $scope.TaskNodeList[i].timesType='TRAININGS'
            }
        }
    }

    $scope.changSelect2 = function(index,numc,all){
        for(var i=0;i<$scope.TaskNodeList.length;i++){
            for(var j=0;j<$scope.TaskNodeList[i].customTitles.length;j++){

            }
            if($scope.TaskNodeList[i].$$hashKey==numc.$$hashKey){
                var cla=angular.element('.change2')[i].value;
                var num=$(".all").eq(i).find('.change2')[index].value;
                if(num=="TEXT"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','block');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','none');
                }else if(num=="INT"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','block');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','none');
                }else if(num=="DOUBLE"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','block');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','none');
                }else if(num=="DATE"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','block');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','none');
                }else if(num=="DATETIME"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','block');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','none');
                }else if(num=="BOOLEAN"){
                    $(".all").eq(i).find('.zdnr1').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr2').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr3').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr4').eq(index).css('display','none');
                    $(".all").eq(i).find('.zdnr5').eq(index).css('display','block');
                }
            }
        }
    }
    //编辑设置点击提交
    $scope.openEditFun = function(){
        // if($scope.vm.changeName=="负责人"){
        //     $scope.vm.charge=$scope.vm.gitName;
        //     $scope.vm.execute='';
        // }else if($scope.vm.changeName=="执行人"){
        //     $scope.vm.execute=$scope.vm.gitName;
        //     $scope.vm.charge='';
        // }
        for(var i=0;i<$scope.TaskNodeList.length;i++){
            $scope.TaskNodeList[i].planTime=$(".all").eq(i).find('.planTime').val();
            $scope.TaskNodeList[i].customTitles=angular.copy($scope.TaskNodeList[i].customTitles);
            if($scope.TaskNodeList[i].changeName=="负责人"){
                $scope.TaskNodeList[i].charge=$scope.TaskNodeList[i].gitName;
                $scope.TaskNodeList[i].execute='';
            }else if($scope.TaskNodeList[i].changeName=="执行人"){
                $scope.TaskNodeList[i].execute=$scope.TaskNodeList[i].gitName;
                $scope.TaskNodeList[i].charge='';
            }
        }
        for(var i=0;i<$scope.TaskNodeList.length;i++){
            $scope.TaskNodeList[i].tableId=$stateParams.id;
        }
        
        $scope.box={
            TaskNodeList:$scope.TaskNodeList
        }
        $scope.box2=converFormData($scope.box)
        planSer.planEditSets($scope.box2).then(function(response){
            if(response.data.code == 0){
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