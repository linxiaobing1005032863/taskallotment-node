var app = angular.module('planExportList', ['toastr','angularjs-dropdown-multiselect']);
app.controller('planExportListCtrl', function($scope, planSer,$state,toastr,$stateParams){
/*    var nameId = {id : $stateParams.id};*/
    planSer.getTableName().then(function(response){
        if(response.data.code == 0){
            $scope.getTableNames = response.data.data;
            /*for(var i=0;i< $scope.getTableNames.length;i++){
                var o=$scope.getTableNames[i].name;
                $scope.aa=function(o){
                    if( $scope.getTableNames[i].name == $scope.tables){
                        var item=$scope.getTableNames[i].id;
                        console.log(item)
                    }
                }
                }*/
            $scope.aa=function(event){
                angular.forEach($scope.getTableNames,function(obj){
                    if($scope.tables==obj.name){
                        var id=obj.id;
                        var item={id:obj.id};
                        $scope.id=id;
                          planSer.getMission(item).then(function(response){
                            if(response.data.code == 0){
                                $scope.getMissions = response.data.data;
                            }
                        });

                    }
                })
            }
        }
    });


    $scope.missions = [];
    $scope.stringSettings = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    //添加
    $scope.workersAddFun = function(){
        var permitArr=[];
        angular.forEach($scope.missions,function(item){
            permitArr.push(item)
        });
        $scope.taskNames=permitArr.join(',');
        var obj = $scope;
        var obj = {
            tables:$scope.tables,
            taskNames:$scope.taskNames,
            tableId:$scope.id,
        };
        window.open(`/planExportList/exportList${encode(obj,true)}`);
    };

});
function encode(){
    var obj = arguments[0];
    var contacat = false;
    if (arguments[1]) {
        contacat = true;
    }
    var str = '';
    var count = 0;
    for (var name in obj) {
        if (obj[name]&&( typeof obj[name]) != 'function') {
            str += (((contacat && count == 0) ? '?' : '&') + name + '=' + obj[name]);
            count++;
        }
    }
    return encodeURI(str);
}