var app = angular.module('itemExportPro', ['toastr','angularjs-dropdown-multiselect']);
app.controller('itemExportProCtrl', function($scope, itemSer,$state,toastr){
    itemSer.getProjectTask().then(function(response){
        if(response.data.code == 0){
            $scope.getProjectTasks = response.data.data;
        }
    });
    $scope.projectTasks=[];
    $scope.stringSettings = {template : '{{option.project}}', smartButtonTextConverter(skip, option) { return option; }};
    //添加
    $scope.workersAddFun = function(){
        var permitArr=[];
        angular.forEach($scope.projectTasks,function(item){
            permitArr.push(item.project)
        });
        $scope.project=permitArr.join(',');
        var obj = $scope;
        var obj = {
            projects:$scope.project
        };
        window.open(`/itemExportPro/exportPro${encode(obj,true)}`);
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