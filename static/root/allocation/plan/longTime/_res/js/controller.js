var app = angular.module('planlongTime', ['toastr']);
app.controller('planlongTimeCtrl', function($scope, planSer,$stateParams,$state,toastr){

    $scope.openEditFun = function(){
            var data = {
                id: $stateParams.id,
                tableId:$stateParams.id,
                increase:$scope.edit.increase,
                split:$scope.edit.split,
                day:$scope.edit.day,
            }
        
            planSer.planlongTime(data).then(function(response){
                if(response.data.code == 0){
                    $state.go('root.allocation.plan.list[12]');
                    toastr.success( "添加时长成功", '温馨提示');
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
        }
});
