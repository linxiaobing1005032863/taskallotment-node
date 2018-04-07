var app = angular.module('distribution', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.distribution", {
        url : "/distribution",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/distribution/_res/html/index.html",
                controller:"distCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/distribution/_res/html/menu.html",
                controller:"distMenuCtrl"
            }
        }
    }).state("root.allocation.distribution.list[12]",{
        url:"/list[12]?id=&name=&page=&user=&tos=",
        views:{
            "content@root.allocation.distribution":{
                templateUrl : "root/allocation/distribution/list/_res/html/index.html",
                controller:'distListCtrl'
            }
        }
    }).state("root.allocation.distribution.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.distribution":{
                templateUrl : "root/allocation/distribution/edit/_res/html/index.html",
                controller:'distEditCtrl'
            }
        }
    }).state("root.allocation.distribution.listDetails[12]",{
        url:"/listDetails[12]?id=&page=",
        views:{
            "content@root.allocation.distribution":{
                templateUrl : "root/allocation/distribution/listDetails/_res/html/index.html",
                controller:'distListDetailsCtrl'
            }
        }
    })
});