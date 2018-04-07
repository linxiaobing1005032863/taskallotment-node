var app = angular.module('workEdit', ['toastr','angularjs-dropdown-multiselect']);
app.controller('workEditCtrl', function($scope, worksetSer,$stateParams,$state,toastr){
 $scope.positions = [];
 $scope.stringSettings = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
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
    var infoData ={id: $stateParams.id};
    //获取ID
    worksetSer.workId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.work = response.data.data;
            $scope.positions=$scope.work.remindObject.split(',')
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    });
   
    worksetSer.gitName(infoData).then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
            $scope.arr=[]
            for(let i=0;i<$scope.names.length;i++){
                $scope.arr.push($scope.names[i].username)
            }
        }
    });
    //编辑点击提交
    $scope.openEditFun = function(){
        var permitArr=[];
        angular.forEach($scope.positions,function(item){
            permitArr.push(item)
        });
        $scope.work.remindObjects=permitArr.join(',');
        $scope.work.remindTime = angular.element('.remindTime').val();
        worksetSer.workEdit($scope.work).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.workhours.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





