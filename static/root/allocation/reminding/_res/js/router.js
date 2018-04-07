var app = angular.module('reminding', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.reminding", {
        url : "/reminding",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/reminding/_res/html/index.html",
                controller:"remindCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/reminding/_res/html/menu.html",
                controller:"remindMenuCtrl"
            }
        }
    }).state("root.allocation.reminding.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.reminding":{
                templateUrl : "root/allocation/reminding/list/_res/html/index.html",
                controller:'remindListCtrl'
            }
        }
    }).state("root.allocation.reminding.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.reminding":{
                templateUrl : "root/allocation/reminding/add/_res/html/index.html",
                controller:'remindAddCtrl'
            }
        }
    }).state("root.allocation.reminding.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.reminding":{
                templateUrl : "root/allocation/reminding/edit/_res/html/index.html",
                controller:'remindEditCtrl'
            }
        }
    }).state("root.allocation.reminding.summary[12]",{
        url:"/summary[12]",
        views:{
            "content@root.allocation.reminding":{
                templateUrl : "root/allocation/reminding/summary/_res/html/index.html",
                controller:'summaryCtrl'
            }
        }
    }).state("root.allocation.reminding.export[12]",{
        url:"/export[12]",
        views:{
            "content@root.allocation.reminding":{
                templateUrl : "root/allocation/reminding/export/_res/html/index.html",
                controller:'exportCtrl'
            }
        }
    })
});