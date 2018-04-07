var app = angular.module('executAgain', ['toastr']);
app.controller('executAgainCtrl', function($scope, executSer,$stateParams,$state,toastr){
$scope.showed=true
    executSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });

    // $scope.changSelect = function(){
    //     var obj={biddingNumber:$scope.editexecut.biddingNumber};
    //     executSer.getBiddingNum(obj).then(function(response){
    //         if(response.data.code == 0){
    //             $scope.projectNames = response.data.data;
    //         }
    //     });
    // };
    $scope.changSelect2 = function(){
        if($scope.edit.split==true){
            $scope.splitDay={"opacity":"1"};
        }else if($scope.edit.split==false){
            $scope.splitDay={"opacity":"0"};
        }
    }
    var infoData ={id: $stateParams.id};
    //获取ID
    executSer.exectId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.edit = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    //编辑点击提交
    $scope.openEditFun = function(){
        // var vm = $scope;
        // vm.edit.id=$stateParams.id;
        // vm.edit.actualTime=vm.edit.actualTime1;
        // vm.edit.needTime=vm.edit.needTime1;
        // vm.edit.startTime = angular.element('.startTime').val();
        // vm.edit.endTime = angular.element('.endTime').val();
        // executSer.exectAgain(vm.edit).then(function(response){
        $scope.edit={
            id:$stateParams.id,
            execute:$scope.edit.execute,
            planNum:$scope.edit.planNum,
            needTime:$scope.edit.needTime1,
            needType:$scope.edit.needType,
            startTime:angular.element('.startTime').val(),
            endTime:angular.element('.endTime').val(),
            remark:$scope.edit.remark,
            split:$scope.edit.split,
            day:$scope.edit.day
        }
        executSer.exectAgain($scope.edit).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.execution.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





