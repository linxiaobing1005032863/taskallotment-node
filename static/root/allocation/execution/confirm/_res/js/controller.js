var app = angular.module('executConfirm', ['toastr']);
app.controller('executConfirmCtrl', function($scope, executSer,$stateParams,$state,toastr){
$scope.showed=true
    var infoData ={id: $stateParams.id};
    //获取ID
    executSer.exectId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.editexecut = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    //编辑点击提交
    $scope.openEditFun = function(){
        $scope.edit.id=$stateParams.id;
        executSer.exectUnconfirm($scope.edit).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.execution.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





