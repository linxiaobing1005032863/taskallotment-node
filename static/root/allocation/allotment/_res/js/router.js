var app = angular.module('allotment', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.allotment", {
        url : "/allotment",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/allotment/_res/html/index.html",
                controller:"subsCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/allotment/_res/html/menu.html",
                controller:"subsMenuCtrl"
            }
        }
    }).state("root.allocation.allotment.summary[12]",{
        url:"/summary[12]",
        views:{
            "content@root.allocation.allotment":{
                templateUrl : "root/allocation/allotment/summary/_res/html/index.html",
                controller:'summaryCtrl'
            }
        }
    })
});