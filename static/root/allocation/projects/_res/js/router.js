var app = angular.module('projects', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.projects", {
        url : "/projects",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/projects/_res/html/index.html",
                controller:"itemCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/projects/_res/html/menu.html",
                controller:"itemMenuCtrl"
            }
        }
    }).state("root.allocation.projects.list[12]",{
        url:"/list[12]?id=&name=&page=&competitive=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/list/_res/html/index.html",
                controller:'itemListCtrl'
            }
        }
    }).state("root.allocation.projects.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/add/_res/html/index.html",
                controller:'itemAddCtrl'
            }
        }
    }).state("root.allocation.projects.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/edit/_res/html/index.html",
                controller:'itemEditCtrl'
            }
        }
    }).state("root.allocation.projects.addTab[12]",{
        url:"/addTab[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/addTab/_res/html/index.html",
                controller:'itemAddTabCtrl'
            }
        }
    }).state("root.allocation.projects.editTab[12]",{
        url:"/editTab[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/editTab/_res/html/index.html",
                controller:'itemEditTabCtrl'
            }
        }
        //-----------------------------------------------------
    }).state("root.allocation.projects.exportPro[12]",{
        url:"/exportPro[12]",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/exportPro/_res/html/index.html",
                controller:'itemExportProCtrl'
            }
        }
    }).state("root.allocation.projects.importPro[12]",{
        url:"/importPro[12]",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/importPro/_res/html/index.html",
                controller:'itemImportProCtrl'
            }
        }   
    }).state("root.allocation.projects.importList[12]",{
        url:"/importList[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/importList/_res/html/index.html",
                controller:'itemImportListCtrl'
            }
        }
    }).state("root.allocation.projects.exportList[12]",{
        url:"/exportList[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/exportList/_res/html/index.html",
                controller:'itemExportListCtrl'
            }
        }   
    }).state("root.allocation.projects.importNew[12]",{
        url:"/importNew[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/importNew/_res/html/index.html",
                controller:'itemImportNewCtrl'
            }
        }
    }).state("root.allocation.projects.exportNew[12]",{
        url:"/exportNew[12]?id=&page=",
        views:{
            "content@root.allocation.projects":{
                templateUrl : "root/allocation/projects/exportNew/_res/html/index.html",
                controller:'itemExportNewCtrl'
            }
        } 
    })
});