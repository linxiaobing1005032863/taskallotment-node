var app = angular.module('allotmentset', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.allotmentset", {
        url : "/allotmentset",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/allotmentset/_res/html/index.html",
                controller:"allotCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/allotmentset/_res/html/menu.html",
                controller:"allotMenuCtrl"
            }
        }
    }).state("root.allocation.allotmentset.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.allotmentset":{
                templateUrl : "root/allocation/allotmentset/list/_res/html/index.html",
                controller:'allotListCtrl'
            }
        }
    }).state("root.allocation.allotmentset.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.allotmentset":{
                templateUrl : "root/allocation/allotmentset/add/_res/html/index.html",
                controller:'allotAddCtrl'
            }
        }
    }).state("root.allocation.allotmentset.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.allotmentset":{
                templateUrl : "root/allocation/allotmentset/edit/_res/html/index.html",
                controller:'allotEditCtrl'
            }
        }
    })
});