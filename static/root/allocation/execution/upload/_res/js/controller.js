var app = angular.module('executUpload', ['toastr']);
app.controller('executUploadCtrl', function($scope, executSer,$stateParams,$state,toastr){
$scope.showed=true
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
        $scope.edit={
            id:$stateParams.id,
            delay:$scope.edit.delay,
            delayType:$scope.edit.delayType,
            reportReason:$scope.edit.reportReason,
            delayTime:$scope.edit.delayTime1
        }
    
        executSer.exectUpload($scope.edit).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.execution.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





