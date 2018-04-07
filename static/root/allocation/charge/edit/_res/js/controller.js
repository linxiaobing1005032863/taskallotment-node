var app = angular.module('chargEdit', ['toastr']);
app.controller('chargEditCtrl', function($scope, chargeSer,$stateParams,$state,toastr){
$scope.showed=true
    chargeSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });
    var infoData ={id: $stateParams.id};
    //获取ID
    chargeSer.getId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.charg = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    //编辑点击提交
    $scope.openEditFun = function(){
        $scope.charg.needTime=$scope.charg.needTime1;
        $scope.charg.id=$stateParams.id;
        $scope.charg.startTime = angular.element('.startTime').val();
        $scope.charg.endTime = angular.element('.endTime').val();
        chargeSer.charEdit($scope.charg).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.charge.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





