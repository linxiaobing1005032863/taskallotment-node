var app = angular.module('workhoursAdd', ['toastr','angularjs-dropdown-multiselect']);
app.controller('workAddCtrl', function ($scope, worksetSer, $state, toastr) {
$scope.showed=true
    worksetSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    worksetSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });


    $scope.positions = [];
    $scope.stringSettings = {displayProp: 'username'};
    worksetSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });

    //添加
    $scope.openAddFun = function () {
        var permitArr=[];
        angular.forEach($scope.positions,function(item){
            permitArr.push(item.username)
        });
        $scope.work.remindObjects=permitArr.join(',');
        $scope.work.remindTime = angular.element('.remindTime').val();
        worksetSer.workAdd($scope.work).then(function (response) {
            if (response.data.code == 0) {
                $state.go('root.allocation.workhours.list[12]');
                toastr.success("已成功添加", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };

});




