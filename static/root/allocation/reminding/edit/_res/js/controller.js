var app = angular.module('remindEdit', ['toastr']);
app.controller('remindEditCtrl', function($scope, remindSer,$stateParams,$state,toastr){
$scope.showed=true
    remindSer.getProjectTask().then(function(response){
        if(response.data.code == 0){
            $scope.getProjects = response.data.data;
        }
    });
    $scope.changSelect1 = function(){
        for(var i=0;i<$scope.getProjects.length;i++){
            if($scope.remind.project==$scope.getProjects[i].project){
                var obj={projectId:$scope.getProjects[i].id};
                remindSer.getTableTask(obj).then(function(response){
                    if(response.data.code == 0){
                        $scope.getTables = response.data.data;
                    }
                });
            }
        }
    }
    $scope.changSelect2 = function(){
        for(var i=0;i<$scope.getTables.length;i++){
            if($scope.remind.projectTable==$scope.getTables[i].name){
                var obj={tableId:$scope.getTables[i].id};
                remindSer.getNameTask(obj).then(function(response){
                    if(response.data.code == 0){
                        $scope.getNames = response.data.data;
                    }
                });
            }
        }
        
    }
    var infoData ={id: $stateParams.id};
    //获取ID
    remindSer.remindId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.remind = response.data.data;
            for(var i=0;i<$scope.getProjects.length;i++){
                if($scope.remind.project==$scope.getProjects[i].project){
                    var obj={projectId:$scope.getProjects[i].id};
                    remindSer.getTableTask(obj).then(function(response){
                        if(response.data.code == 0){
                            $scope.getTables = response.data.data;
                            for(var j=0;j<$scope.getTables.length;j++){
                                if($scope.remind.projectTable==$scope.getTables[j].name){
                                    var obj={tableId:$scope.getTables[j].id};
                                    remindSer.getNameTask(obj).then(function(response){
                                        if(response.data.code == 0){
                                            $scope.getNames = response.data.data;
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
            // $scope.remind.projectTable=$scope.remind.projectTable;
            // $scope.remind.project=$scope.remind.project;
        }
    });

    //编辑点击提交
    $scope.openEditFun = function(){
        // $scope.remind.project = angular.element('.project option:selected').text();
        // $scope.remind.projectTable = angular.element('.projectTable option:selected').text();

        $scope.remind.firstTime = angular.element('.firstTime').val();
        $scope.remind.secondTime = angular.element('.secondTime').val();
        $scope.remind.thridTime = angular.element('.thridTime').val();
        remindSer.remindEdit($scope.remind).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.reminding.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





