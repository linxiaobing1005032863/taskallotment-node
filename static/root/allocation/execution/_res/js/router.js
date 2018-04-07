var app = angular.module('execution', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.execution", {
        url : "/execution",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/execution/_res/html/index.html",
                controller:"executCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/execution/_res/html/menu.html",
                controller:"executMenuCtrl"
            }
        }
    }).state("root.allocation.execution.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/list/_res/html/index.html",
                controller:'executListCtrl'
            }
        }
    }).state("root.allocation.execution.confirm[12]",{
        url:"/confirm[12]?id=&page=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/confirm/_res/html/index.html",
                controller:'executConfirmCtrl'
            }
        }
    }).state("root.allocation.execution.upload[12]",{
        url:"/upload[12]?id=&page=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/upload/_res/html/index.html",
                controller:'executUploadCtrl'
            }
        }
    }).state("root.allocation.execution.again[12]",{
        url:"/again[12]?id=&page=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/again/_res/html/index.html",
                controller:'executAgainCtrl'
            }
        }
    }).state("root.allocation.execution.listDetails[12]",{
        url:"/listDetails[12]?id=&page=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/listDetails/_res/html/index.html",
                controller:'executionListDetailsCtrl'
            }
        }
    }).state("root.allocation.execution.complete[12]",{
        url:"/complete[12]?id=&page=",
        views:{
            "content@root.allocation.execution":{
                templateUrl : "root/allocation/execution/complete/_res/html/index.html",
                controller:'executCompleteCtrl'
            }
        }
    })
});