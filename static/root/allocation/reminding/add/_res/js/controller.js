var app = angular.module('remindingAdd', ['toastr']);
app.controller('remindAddCtrl', function ($scope, remindSer, $state, toastr) {
$scope.showed=true
    remindSer.getProjectTask().then(function(response){
        if(response.data.code == 0){
            $scope.getProjects = response.data.data;
        }
    });
    $scope.changSelect1 = function(){
        var obj={projectId:$scope.remind.project};
        remindSer.getTableTask(obj).then(function(response){
            if(response.data.code == 0){
                $scope.getTables = response.data.data;
            }
        });
    }
    $scope.changSelect2 = function(){
        var obj={tableId:$scope.remind.projectTable};
        remindSer.getNameTask(obj).then(function(response){
            if(response.data.code == 0){
                $scope.getNames = response.data.data;
            }
        });
    }
    
    
    //添加
    $scope.openAddFun = function () {
        $scope.remind.project = angular.element('.project option:selected').text();
        $scope.remind.projectTable = angular.element('.projectTable option:selected').text();

        $scope.remind.firstTime = angular.element('.firstTime').val();
        $scope.remind.secondTime = angular.element('.secondTime').val();
        $scope.remind.thridTime = angular.element('.thridTime').val();
        remindSer.remindAdd($scope.remind).then(function (response) {
            if (response.data.code == 0) {
                $state.go('root.allocation.reminding.list[12]');
                toastr.success("已成功添加", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };

});




