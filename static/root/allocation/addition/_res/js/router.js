var app = angular.module('addition', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.addition", {
        url : "/addition",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/addition/_res/html/index.html",
                controller:"additCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/addition/_res/html/menu.html",
                controller:"additMenuCtrl"
            }
        }
    }).state("root.allocation.addition.list[12]",{
        url:"/list[12]?id=&page=&area=&depart=&makeProject=&projectId=&mark=",
        views:{
            "content@root.allocation.addition":{
                templateUrl : "root/allocation/addition/list/_res/html/index.html",
                controller:'additListCtrl'
            }
        }
    }).state("root.allocation.addition.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.addition":{
                templateUrl : "root/allocation/addition/add/_res/html/index.html",
                controller:'additAddCtrl'
            }
        }
    }).state("root.allocation.addition.listDetails[12]",{
        url:"/listDetails[12]?id=&page=&area=&depart=&makeProject=&projectId=&mark=",
        views:{
            "content@root.allocation.addition":{
                templateUrl : "root/allocation/addition/listDetails/_res/html/index.html",
                controller:'additListDetailsCtrl'
            }
        }
    })
});