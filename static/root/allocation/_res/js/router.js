var app = angular.module('bidding',[]);
app.config(function ($provide, $stateProvider) {
    $stateProvider.state("root.allocation", {
        url: "/allocation",
        views: {
            "content@root": {
                templateUrl: "root/allocation/_res/html/index.html",
                controller: "biddingCtrl"
            },"nav@root":{
                templateUrl: "root/allocation/_res/html/nav.html",
                controller:"navCtrl"
            }
        }
    })
});