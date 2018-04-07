var app = angular.module('workhours', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.workhours", {
        url : "/workhours",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/workhours/_res/html/index.html",
                controller:"workCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/workhours/_res/html/menu.html",
                controller:"workMenuCtrl"
            }
        }
    }).state("root.allocation.workhours.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.workhours":{
                templateUrl : "root/allocation/workhours/list/_res/html/index.html",
                controller:'workListCtrl'
            }
        }
    }).state("root.allocation.workhours.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.workhours":{
                templateUrl : "root/allocation/workhours/add/_res/html/index.html",
                controller:'workAddCtrl'
            }
        }
    }).state("root.allocation.workhours.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.workhours":{
                templateUrl : "root/allocation/workhours/edit/_res/html/index.html",
                controller:'workEditCtrl'
            }
        }
    })
});