var app = angular.module('charge', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.charge", {
        url : "/charge",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/charge/_res/html/index.html",
                controller:"chargCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/charge/_res/html/menu.html",
                controller:"chargMenuCtrl"
            }
        }
    }).state("root.allocation.charge.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.charge":{
                templateUrl : "root/allocation/charge/list/_res/html/index.html",
                controller:'chargListCtrl'
            }
        }
    }).state("root.allocation.charge.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.charge":{
                templateUrl : "root/allocation/charge/edit/_res/html/index.html",
                controller:'chargEditCtrl'
            }
        }
    }).state("root.allocation.charge.listDetails[12]",{
        url:"/listDetails[12]?id=&page=",
        views:{
            "content@root.allocation.charge":{
                templateUrl : "root/allocation/charge/listDetails/_res/html/index.html",
                controller:'chargListDetailsCtrl'
            }
        }
    })
});