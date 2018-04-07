var app = angular.module('additAdd', ['toastr']);
app.controller('additAddCtrl', function ($scope, additSer, $state, toastr) {
$scope.showed=true
    // $scope.changSelect = function(){
    //     if($scope.add.changeName=="执行人"){
    //         $scope.add.charge=$scope.add.gitName;
    //         $scope.add.execute=' ';
    //     }else if($scope.add.changeName=="负责人"){
    //         $scope.add.execute=$scope.add.gitName;
    //         $scope.add.charge=' ';
    //     }
    // }
    additSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.gitNames = response.data.data;
        }
    });
    additSer.getAreaT().then(function(response){
        if(response.data.code == 0){
            $scope.getAreaTs = response.data.data;
        }
    });
    $scope.times=function(){
            if($scope.add.taskType=='ADMININSTRATION'){
                $scope.add.timesType='ADMININSTRATIONS'
            }else if($scope.add.taskType=='ENGINEERING'){
                $scope.add.timesType='ENGINEERINGS'
            }else if($scope.add.taskType=='TRAINING'){
                $scope.add.timesType='TRAININGS'
            }
    }
    $scope.getSelect1 = function(){
        var obj={areas:$scope.add.area};
        additSer.getDepartT(obj).then(function(response){
            if(response.data.code == 0){
                $scope.getDepartTs = response.data.data;
            }
        });
    }
    $scope.getSelect2 = function(){
        var obj={departs:$scope.add.depart};
        additSer.getProjectT(obj).then(function(response){
            if(response.data.code == 0){
                $scope.getProjectTs = response.data.data;
            }
        });
    }
    $scope.getSelect3 = function(){
        var obj={projectIds:$scope.add.projectId};
        additSer.getTableT(obj).then(function(response){
            if(response.data.code == 0){
                $scope.getTableTs = response.data.data;
            }
        });
    }
    additSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.getAreas = response.data.data;
        }
    });
    additSer.getDepart().then(function(response){
        if(response.data.code == 0){
            $scope.getDeparts = response.data.data;
        }
    });
    // 差最后的一个是否拆分没弄，其他全弄完，但是没测试过
    $scope.changSelect2 = function(){
        if($scope.add.split=='true'){
            $scope.splitDay={"opacity":"1"};
        }else if($scope.add.split=='false'){
            $scope.splitDay={"opacity":"0"};
        }
    }
    
    //添加
    $scope.openAddFun = function () {
        if($scope.add.changeName=="执行人"){
            $scope.add.charge=$scope.add.gitName;
            $scope.add.execute=' ';
        }else if($scope.add.changeName=="负责人"){
            $scope.add.execute=$scope.add.gitName;
            $scope.add.charge=' ';
        }
        $scope.add.needTime=$scope.add.needTime1;
        $scope.add.planTime = angular.element('.planTime').val();
        $scope.add.startTime = angular.element('.startTime').val();
        $scope.add.endTime = angular.element('.endTime').val();
        additSer.additDetect().then(function(response){
            if(response.data.code == 0){
                $scope.biddingNumbers = response.data.data;
                if($scope.biddingNumbers==true){
                    $scope.delShow = true;
                    // break;
                }else if($scope.biddingNumbers==false){
                    additSer.additAdd($scope.add).then(function (response) {
                        if (response.data.code == 0) {
                            $state.go('root.allocation.addition.list[12]');
                            toastr.success("已成功添加", '温馨提示');
                        }else{
                            toastr.error( response.data.msg, '温馨提示');
                        }
                    });
                }
            }
        });
    };
    //下面内容未测试过
    $scope.cancel = function(){//取消
        $scope.delShow = false;
        // break;
    };
    $scope.delFn = function(){
        $scope.add.planTime = angular.element('.planTime').val();
        $scope.add.startTime = angular.element('.startTime').val();
        $scope.add.endTime = angular.element('.endTime').val();
        additSer.additAdd($scope.add).then(function (response) {
            if (response.data.code == 0) {
                $state.go('root.allocation.addition.list[12]');
                toastr.success("已成功添加", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }//确认

});




