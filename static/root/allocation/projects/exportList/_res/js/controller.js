var app = angular.module('itemExportList', ['toastr','angularjs-dropdown-multiselect']);
app.controller('itemExportListCtrl', function($scope, itemSer,$state,toastr){
    itemSer.getTableName().then(function(response){
        if(response.data.code == 0){
            $scope.getTableNames = response.data.data;
        }
    });
    $scope.tableNames=[];
    $scope.stringSettings = {template : '{{option.name}}', smartButtonTextConverter(skip, option) { return option; }};
    
    //添加
    $scope.workersAddFun = function(){
        var permitArr=[];
        angular.forEach($scope.tableNames,function(item){
            permitArr.push(item.name)
        });
        $scope.pro={}
        $scope.pro.tables=permitArr.join(',');
        var obj = $scope;
        var obj = {
            tables:$scope.pro.tables,
        };
        window.open(`/itemExportList/exportList${encode(obj,true)}`);
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