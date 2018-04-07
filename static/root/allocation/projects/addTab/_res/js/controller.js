var app = angular.module('itemAddTab', ['toastr']);
app.controller('itemAddTabCtrl', function($scope, itemSer,$stateParams,$state,toastr){
$scope.showed=true
    // var infoData ={id: $stateParams.id};
    // //获取ID
    // itemSer.itemTableId(infoData).then(function(response){
    //     if(response.data.code== 0){
    //         $scope.item = response.data.data;
    //         if($scope.item.status=="START"){
    //             $scope.item.status='启用';
    //         }else if($scope.item.status=="END"){
    //             $scope.item.status='禁用';
    //         }
    //     }else{
    //         toastr.error( response.data.msg, '温馨提示');
    //     }

    // });

    //编辑点击提交
    $scope.openEditFun = function(){
        if($scope.item.status=="启用"){
            $scope.item.status='START';
        }else if($scope.item.status=="禁用"){
            $scope.item.status='END';
        }
        $scope.item.projectId=$stateParams.id;
        itemSer.itemAddTab($scope.item).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.projects.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





