var app = angular.module('planEditState', ['toastr']);
app.controller('planEditStateCtrl', function($scope, planSer,$stateParams,$state,toastr){
$scope.showed=true

    var infoData ={id: $stateParams.id};
    //获取ID
    // planSer.getId6666(infoData).then(function(response){
    //     if(response.data.code== 0){
    //         $scope.vm = response.data.data;
    //     }else{
    //         toastr.error( response.data.msg, '温馨提示');
    //     }

    // });

    //编辑点击提交
    $scope.openEditFun = function(){
        $scope.sum={
            id:$stateParams.id,
            taskStatus:$scope.vm.taskStatus
        }
        planSer.editState($scope.sum).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.plan.list[12]',{area:$stateParams.area,depart:$stateParams.depart,makeProject:$stateParams.makeProject,projectId:$stateParams.projectId});
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});