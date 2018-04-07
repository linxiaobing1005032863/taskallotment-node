var app = angular.module('bidding', [{
    files: ['root/allocation/_res/js/service.js']
}]);
app.controller('biddingCtrl', function ($scope,$state) {
    if ($state.current.url == '/allocation') {//默认加载列表
        $state.go('root.allocation.projects');
    }
    $scope.$on('changeId',function(event,msg) {
        $scope.$broadcast('getId', msg)
    });
    $scope.$on('twoID',function(event,msg) {
        $scope.$broadcast('getTwoId', msg)
    });
    // $scope.$on('IDState',function(event,msg) {
    //     $scope.$broadcast('getState', msg)
    // });
    $scope.$on('twoIDmark',function(event,msg) {
        $scope.$broadcast('getTwoMark', msg)
    });
    $scope.$on('areaTo',function(event,msg) {
        $scope.$broadcast('areaList', msg)
    });
    $scope.$on('departTo',function(event,msg) {
        $scope.$broadcast('departList', msg)
    });
    $scope.$on('makeProjectTo',function(event,msg) {
        $scope.$broadcast('makeProjectList', msg)
    });
    $scope.$on('projectIdTo',function(event,msg) {
        $scope.$broadcast('projectIdList', msg)
    });
    $scope.$on('projectIdTo',function(event,msg) {
        $scope.$broadcast('projectIdList', msg)
    });
    //父 Ctrl 监听到事件，向下广播
    $scope.$on('changeId5',function(event,msg){
        $scope.$broadcast('pageId5',msg)
    });
}).controller('navCtrl',function($scope,$state,$location,bidSer){
    $scope.navCla='projects';
    var active = $location.path().split('/')[3];
    $scope.navCla=active?active:'projects';
    $scope.navClass = function(name){
        $scope.navCla = name;
        $scope.$emit('isId',true);//每次切换页面更新搜索值
    };

    bidSer.navPermission().then(function(response){
        if(response.data.code == 0){
            var data = response.data.data;
            if(data && data.length){
                $scope.isHide = false;
                for(var i =0,len=data.length;i<len;i++){
                    var obj = data[i];
                    $scope[obj.name]=obj.flag;
                }
            }else if(response.data.data.length == 0){
                $scope.isHide = true;
            }
        }else{
            $scope.isHide = false;
        }
    });
    bidSer.setPermission().then(function(response){
        if(response.data.code == 0){
            var data = response.data.data;
            if(data && data.length){
                $scope.isHide = false;
                for(var i =0,len=data.length;i<len;i++){
                    var obj = data[i];
                    $scope[obj.name]=obj.flag;
                }
            }else if(response.data.data.length == 0){
                $scope.isHide = true;
            }
        }else{
            $scope.isHide = false;
        }
    });
    $scope.showsList = [
        {id:"1",item:"项目管理",menuList:[{name:'项目列表',msg:'projects'},{name2:'计划任务节点',msg:'plan'}],showIs:false},
        {id:"2",item:"任务管理",menuList:[{name3:'任务提醒',msg:'reminding'},{name4:'任务添加及分发',msg:'addition'},{name5:'我分发的任务',msg:'distribution'},{name6:'我负责的任务',msg:'charge'},{name7:'我执行的任务',msg:'execution'}],showIs:false},
        {id:"3",item:"汇总管理",menuList:[{name8:'完成情况汇总',msg:'complete'},{name9:'分配及确认汇总',msg:'allotment'},{name10:'人员标准工时汇总',msg:'personnel'}],showIs:false},
        {id:"4",item:"设置",menuList:[{name11:'标准工时设置',msg:'workhours'},{name12:'分配及确认汇总设置',msg:'allotmentset'},{name13:'完成情况汇总设置',msg:'completeset'}],showIs:false},
        {id:"5",item:"客户权限设置",menuList:[{name14:'设置',msg:'setting'}],showIs:false},
        {id:"6",item:"版本信息",menuList:[{name15:'版本信息',msg:'version'},{name16:'帮助与解答',msg:'help'}],showIs:false}
    ];
    if(active){
        for(var i=0;i<$scope.showsList.length;i++){
            var n=$scope.showsList[i].menuList;
            for(var j=0;j<n.length;j++){
                var m=n[j].msg;
                if(m==active){
                    $scope.showsList[i].showIs=true;
                    break;
                }
            }
        }
    }
    $scope.showMenu = function(obj,event) {
        if(event){
            if(obj.showIs){
                obj.showIs=!event;
            }else{
                obj.showIs=event;
                /* angular.forEach(function(item){ showSubAble sublist*/
                this.showsList.forEach(function(item){
                    if(item.id!=obj.id){
                        item.showIs=!event;
                    }else{
                        item.showIs=event;
                    }
                });
            }
        }
    };
});

app.directive('mod',function(){
    return{
        restrict:'AE',
        replace:true,
        link:function(scope,elements,attrs){
            elements.hover(function(){
                var textWidth = elements.text().length*12;
                var boxWidth = elements.width();

                if(textWidth>boxWidth){
                    elements.addClass('modac');
                }
            });
            elements.dblclick(function(){
                if(elements.hasClass('modac')){
                    $('.module').show();
                    var Index =  elements.index(),
                        title,
                        tag = this.tagName;
                    if(tag=="P"){
                        title =  $(".list-head span").eq(Index).text();
                    }else if(tag=="SPAN"){
                        title = $(this).parent().siblings('.see-parent').children().eq(Index).text();
                    }
                    var conText = elements.text();
                    $('.see-type').text(title);
                    $('.see-description').text(conText)
                }

            })
        }
    }
}).directive('modclose',function(){
    return{
        restrict:'AE',
        replace:true,
        link:function(scope,elements,attrs){
            elements.on("click",function(){
                $('.module').hide();
            });

        }
    }
});