var app = angular.module('personnel', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.personnel", {
        url : "/personnel",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/personnel/_res/html/index.html",
                controller:"subsCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/personnel/_res/html/menu.html",
                controller:"subsMenuCtrl"
            }
        }
    }).state("root.allocation.personnel.summary[12]",{
        url:"/summary[12]",
        views:{
            "content@root.allocation.personnel":{
                templateUrl : "root/allocation/personnel/summary/_res/html/index.html",
                controller:'summaryCtrl'
            }
        }
    }).state("root.allocation.personnel.summaryOne[12]",{
        url:"/summaryOne[12]",
        views:{
            "content@root.allocation.personnel":{
                templateUrl : "root/allocation/personnel/summaryOne/_res/html/index.html",
                controller:'summaryOneCtrl'
            }
        }
    })
});