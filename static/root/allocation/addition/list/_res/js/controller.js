var app = angular.module('additList', ['ng-pagination','toastr']);
app.controller('additListCtrl',function($scope,additSer,toastr,$stateParams,$state,$location){
    
    $scope.every={area1:'节点',area2:'执行人',area3:'计划执行时间',area4:'任务类型',area5:'计划任务量',area6:'所需时长',area7:'时间类型',area9:'任务状态',area8:'备注'};
    $scope.titles=[];

    additSer.newAreas().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    $scope.changSelect=function(){
        var obj={area:$scope.area}
        additSer.newDeparts(obj).then(function(response){
            if(response.data.code == 0){
                $scope.departs = response.data.data;
                
            }
        });
    }
    $scope.changSelect2=function(){
        var obj2={area:$scope.area,depart:$scope.depart}
        additSer.newMakeProjects(obj2).then(function(response){
            if(response.data.code == 0){
                $scope.makeProjects = response.data.data;
            }
        });
    }
    $scope.changSelect3=function(){
        // var obj3={area:$scope.area,makeProject:$scope.makeProject}
        var obj3={area:$scope.area,makeProject:$scope.makeProject,depart:$scope.depart}
        
        additSer.newProjects(obj3).then(function(response){
            if(response.data.code == 0){
                $scope.projects = response.data.data;
            }
        });
    }


    $scope.$emit('changeId', null);
    $scope.$emit('twoID', null);
    $scope.$emit('twoIDmark',null);
    //删除
    //获取id
    $scope.inClick=function(id2){
        if($scope.openLists!='' && $scope.openLists!=undefined){
            for(var i=0;i<$scope.openLists.length;i++){
                angular.forEach($scope.openLists[i].nodeS,function(obj){
                    obj._selectList = false
                });
                angular.forEach($scope.openLists,function(obj){
                    obj._selectList = false
                });
            }
        }
        id2._selectList = true;
        $scope.idListdTwo = id2;
        $scope.idListdTwo.two='two';
        $scope.$emit('changeId',null);
        $scope.$emit('twoID', $scope.idListdTwo.id);
        $scope.$emit('twoIDmark', $scope.idListdTwo.two);
    }
    $scope.inClick2=function(id3){
        if($scope.openLists!='' && $scope.openLists!=undefined){
            for(var i=0;i<$scope.openLists.length;i++){
                angular.forEach($scope.openLists[i].nodeS,function(obj){
                    obj._selectList = false
                });
                angular.forEach($scope.openLists,function(obj){
                    obj._selectList = false
                });
            }
        }
        id3._selectList = true;
        $scope.idListd = id3;
        $scope.$emit('twoID',null);
        $scope.$emit('twoIDmark',null);
        $scope.$emit('changeId', $scope.idListd.id);
        event.cancelBubble = true;
    }
    function activatePage(page) {
         //-----------获取回来之后----------------------
        if($stateParams.projectId!='' && $stateParams.projectId!=undefined){
            var infoData ={projectId: $stateParams.projectId};
        }
        if($stateParams.area!='' && $stateParams.area!=undefined){
            $scope.area=$stateParams.area;
        }
        if($stateParams.depart!='' && $stateParams.depart!=undefined){
            $scope.depart=$stateParams.depart;
        }
        if($stateParams.makeProject!='' && $stateParams.makeProject!=undefined){
            $scope.makeProject=$stateParams.makeProject;
        }
        if($scope.area!='' && $scope.area!=undefined){
            var obj4={area:$scope.area}
            additSer.newDeparts(obj4).then(function(response){
                if(response.data.code == 0){
                    $scope.departs = response.data.data;
                }
            });
        }
        //---------------------------------projectId回写-------------------------------------------------
        if($scope.area!='' && $scope.area!=undefined && $scope.depart!='' && $scope.depart!=undefined && $scope.makeProject!='' && $scope.makeProject!=undefined){
            var obj5={area:$scope.area,makeProject:$scope.makeProject,depart:$scope.depart}
            additSer.newProjects(obj5).then(function(response){
                if(response.data.code == 0){
                    $scope.projects = response.data.data;
                    $scope.projectId=$stateParams.projectId;
                }
            });
        }
        $scope.makeProject=$stateParams.makeProject;
        $scope.numbers = [];
        $scope.titles=[];
        var listData = {
            page:page || 1,
            projectId: $stateParams.projectId
        };
        additSer.additList(listData).then(function(response){
            if(response.data.code == 0){
                $scope.openLists = response.data.data;
                //标题重复次数
                if($scope.openLists!='' && $scope.openLists!=undefined){
                    for(var i=0;i<$scope.openLists.length;i++){
                        if($scope.openLists[i].nodeS!='' && $scope.openLists[i].nodeS!=undefined){
                            if($scope.openLists[i].nodeS.length>=1){
                                $scope.numbers.push($scope.openLists[i].nodeS.length);
                                
                                $scope.maxInNumbers = Math.max.apply(Math, $scope.numbers);
                                
                            }
                        }
                    }
                }
                for(var j=0;j<$scope.maxInNumbers;j++){
                    $scope.titles.push($scope.every);
                }


                if($stateParams.id){
                    angular.forEach($scope.openLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                    $scope.$emit('page',$location.search().page);
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
        additSer.additCount(listData).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })

    //-----------根据项目名称获取列表-------------------
        
        
        $scope.changList=function(){
            $scope.numbers = [];
            $scope.titles=[];
            $scope.$emit('areaTo',$scope.area);
            $scope.$emit('departTo',$scope.depart);
            $scope.$emit('makeProjectTo',$scope.makeProject);
            $scope.$emit('projectIdTo',$scope.projectId);
            var listData = {
                page:page || 1,
                projectId:$scope.projectId
            };
            additSer.additList(listData).then(function(response){
                if(response.data.code == 0){
                    $scope.openLists = response.data.data;
                    //标题重复次数
                    if($scope.openLists!='' && $scope.openLists!=undefined){
                        for(var i=0;i<$scope.openLists.length;i++){
                            if($scope.openLists[i].nodeS!='' && $scope.openLists[i].nodeS!=undefined){
                                if($scope.openLists[i].nodeS.length>=1){
                                    $scope.numbers.push($scope.openLists[i].nodeS.length);
                                    
                                    $scope.maxInNumbers = Math.max.apply(Math, $scope.numbers);
                                    
                                }
                            }
                        }
                    }
                    for(var j=0;j<$scope.maxInNumbers;j++){
                        $scope.titles.push($scope.every);
                    }


                    if($stateParams.id){
                        angular.forEach($scope.openLists,function(obj){
                            if(obj.id == $stateParams.id){
                                obj._selectList = true;
                            }
                        });
                        //向父Ctrl传递事件
                        $scope.$emit('changeId', $stateParams.id);
                        $scope.$emit('page',$location.search().page);
                    }
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
            additSer.additCount(listData).then(function(response){
                if(response.data.code==0){
                    $scope.custom.itemsCount = response.data.data;
                    $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            })
        }
    }
    $scope.selectList = function(event){
        angular.forEach($scope.openLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        // $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('page',$location.search().page);

    };
//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    $scope.isView = false;
});