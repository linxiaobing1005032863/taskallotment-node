var app = angular.module('plan', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.plan", {
        url : "/plan",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/plan/_res/html/index.html",
                controller:"planCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/plan/_res/html/menu.html",
                controller:"planMenuCtrl"
            }
        }
    }).state("root.allocation.plan.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=&area=&depart=&makeProject=&projectId=&mark=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/list/_res/html/index.html",
                controller:'planListCtrl'
            }
        }
    }).state("root.allocation.plan.edit[12]",{
        url:"/edit[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/edit/_res/html/index.html",
                controller:'planEditCtrl'
            }
        }
    }).state("root.allocation.plan.initiate[12]",{
        url:"/initiate[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/initiate/_res/html/index.html",
                controller:'planInitiateCtrl'
            }
        }
    }).state("root.allocation.plan.longTime[12]",{
        url:"/longTime[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/longTime/_res/html/index.html",
                controller:'planlongTimeCtrl'
            }
        }
    }).state("root.allocation.plan.editSet[12]",{
        url:"/editSet[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/editSet/_res/html/index.html",
                controller:'planEditSetCtrl'
            }
        }
    }).state("root.allocation.plan.listDetails[12]",{
        url:"/listDetails[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/listDetails/_res/html/index.html",
                controller:'planListDetailsCtrl'
            }
        }
    }).state("root.allocation.plan.task[12]",{
        url:"/task[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/task/_res/html/index.html",
                controller:'planTaskCtrl'
            }
        }   
    }).state("root.allocation.plan.importList[12]",{
        url:"/importList[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/importList/_res/html/index.html",
                controller:'planImportListCtrl'
            }
        }
    }).state("root.allocation.plan.exportList[12]",{
        url:"/exportList[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/exportList/_res/html/index.html",
                controller:'planExportListCtrl'
            }
        }
    }).state("root.allocation.plan.editState[12]",{
        url:"/editState[12]?id=&page=&area=&depart=&makeProject=&projectId=",
        views:{
            "content@root.allocation.plan":{
                templateUrl : "root/allocation/plan/editState/_res/html/index.html",
                controller:'planEditStateCtrl'
            }
        } 
    })
});