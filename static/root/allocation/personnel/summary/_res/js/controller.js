var app = angular.module('Summary', ['toastr','angularjs-dropdown-multiselect']);
app.controller('summaryCtrl', function($scope, personnelSer,toastr){
    $scope.showed=true;
    $scope.changSelect=function(){
        if($scope.vm.countType=="WHOLE"){
            $scope.none = false;
            $scope.name = false;
        }else if($scope.vm.countType=="DEPART"){
            $scope.none = true;
            $scope.name = false;
        }
    }
    personnelSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    personnelSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    $scope.positions1 = [];
    $scope.stringSettings1 = {template : '{{option.area}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions2 = [];
    $scope.stringSettings2 = {template : '{{option.department}}', smartButtonTextConverter(skip, option) { return option; }};


    $scope.summary = function(){
        var permitArr1=[];
        angular.forEach($scope.positions1,function(item1){
            permitArr1.push(item1.area)
        });
        $scope.vm.area=permitArr1.join(',');


        var permitArr2=[];
        angular.forEach($scope.positions2,function(item2){
            permitArr2.push(item2.department)
        });
        $scope.vm.depart=permitArr2.join(',');
        $scope.vm.startTime=angular.element('.startTime').val();
        $scope.vm.endTime=angular.element('.endTime').val();
        personnelSer.personnelSummary($scope.vm).then(function(response){
            if(response.data.code == 0){
                $scope.personnelSummary = response.data.data;
                var length=0;
                var index=0;
                for(var i=0;i<$scope.personnelSummary.length;i++){
                    if($scope.personnelSummary[i].timeSonS.length>1){
                        index=i;              
                        length=$scope.personnelSummary[index].timeSonS.length;
                    }else{
                        length=1;
                    }
                    $scope.personnelSummary[i].length=length;
                }
            }else{
                toastr.error(response.data.msg,'温馨提示');
            }
        })


        personnelSer.personnelFigure($scope.vm).then(function(response){
            if(response.data.code==0){
                $scope.figure = response.data.data;
                var myChart = echarts.init(document.getElementById('main3'));
                var option=$scope.figure;
                option.legend.bottom=20;
                option.title.x= 'center';
                option.grid={};
                option.grid.bottom='20%';
                myChart.setOption(option);
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    };
});





