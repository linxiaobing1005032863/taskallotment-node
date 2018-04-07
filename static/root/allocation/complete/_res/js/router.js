var app = angular.module('complete', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.complete", {
        url : "/complete",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/complete/_res/html/index.html",
                controller:"subsCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/complete/_res/html/menu.html",
                controller:"subsMenuCtrl"
            }
        }
    }).state("root.allocation.complete.summary[12]",{
        url:"/summary[12]",
        views:{
            "content@root.allocation.complete":{
                templateUrl : "root/allocation/complete/summary/_res/html/index.html",
                controller:'summaryCtrl'
            }
        }
    })
});