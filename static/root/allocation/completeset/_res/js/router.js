var app = angular.module('completeset', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.completeset", {
        url : "/completeset",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/completeset/_res/html/index.html",
                controller:"compsetCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/completeset/_res/html/menu.html",
                controller:"compsetMenuCtrl"
            }
        }
    }).state("root.allocation.completeset.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.completeset":{
                templateUrl : "root/allocation/completeset/list/_res/html/index.html",
                controller:'compsetListCtrl'
            }
        }
    }).state("root.allocation.completeset.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.completeset":{
                templateUrl : "root/allocation/completeset/add/_res/html/index.html",
                controller:'compsetAddCtrl'
            }
        }
    }).state("root.allocation.completeset.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.completeset":{
                templateUrl : "root/allocation/completeset/edit/_res/html/index.html",
                controller:'compsetEditCtrl'
            }
        }
    })
});