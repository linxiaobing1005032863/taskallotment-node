var app = angular.module('planList', ['ng-pagination','toastr']);
app.controller('planListCtrl',function($scope,planSer,toastr,$stateParams,$state,$location){
    


    $scope.every={area1:'节点',area2:'执行人',area3:'计划执行时间',area4:'任务类型',area5:'计划任务量',area6:'所需时长',area7:'时间类型',area9:'任务状态',area8:'备注'};
    $scope.titles=[];

    // $scope.num=[1,556,123,15,61,51,65,1]
    // var maxInNumbers = Math.max.apply(Math, $scope.num);
    // var minInNumbers = Math.min.apply(Math, numbers);
    // console.log(maxInNumbers)
    // console.log(minInNumbers)


    planSer.newAreas().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    $scope.changSelect=function(){
        var obj={area:$scope.area}
        planSer.newDeparts(obj).then(function(response){
            if(response.data.code == 0){
                $scope.departs = response.data.data;
                
            }
        });
    }
    $scope.changSelect2=function(){
        var obj2={area:$scope.area,depart:$scope.depart}
        planSer.newMakeProjects(obj2).then(function(response){
            if(response.data.code == 0){
                $scope.makeProjects = response.data.data;
            }
        });
    }
    $scope.changSelect3=function(){
        // var obj3={area:$scope.area,makeProject:$scope.makeProject}
        var obj3={area:$scope.area,makeProject:$scope.makeProject,depart:$scope.depart}
        
        planSer.newProjects(obj3).then(function(response){
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
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function(){//取消删除
        $scope.delShow = false;
        $state.go('' +
            'root.allocation.plan.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id
        };
        // ---------------------------------------------传任务ID---------------------------------------------
        if($stateParams.mark!='' && $stateParams.mark!=undefined){
            planSer.planDeleteNode(data).then(function(response){
                if(response.data.code==0){
                    count++;
                    toastr.info( "信息已删除", '温馨提示');
                    $scope.deledId = $stateParams.id;
                    $scope.$emit('changeId', null);
                    $scope.$emit('twoID', null);
                    $scope.$emit('twoIDmark',null);
                    $scope.delShow = false;
                    if(($scope.custom.itemsCount-count)%10){
                        $state.go('root.allocation.plan.list[12]',{id:null,name:null});
                    }else{
                        $state.go('root.allocation.plan.list[12]',{id:null,name:null,page:$stateParams.page-1});
                    }
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
                
            });
            // ---------------------------------------------传节点ID---------------------------------------------
        }else{
            planSer.planDelete(data).then(function(response){
                if(response.data.code==0){
                    count++;
                    toastr.info( "信息已删除", '温馨提示');
                    $scope.deledId = $stateParams.id;
                    $scope.$emit('changeId', null);
                    $scope.$emit('twoID', null);
                    $scope.$emit('twoIDmark',null);
                    $scope.delShow = false;
                    if(($scope.custom.itemsCount-count)%10){
                        $state.go('root.allocation.plan.list[12]',{id:null,name:null});
                    }else{
                        $state.go('root.allocation.plan.list[12]',{id:null,name:null,page:$stateParams.page-1});
                    }
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            
            });
        }
        
       
        
    };
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    $scope.isView = false;
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
            planSer.newDeparts(obj4).then(function(response){
                if(response.data.code == 0){
                    $scope.departs = response.data.data;
                }
            });
        }
        //---------------------------------projectId回写-------------------------------------------------
        // $scope.getId=$stateParams.projectId;
        if($scope.area!='' && $scope.area!=undefined && $scope.depart!='' && $scope.depart!=undefined && $scope.makeProject!='' && $scope.makeProject!=undefined){
            var obj5={area:$scope.area,makeProject:$scope.makeProject,depart:$scope.depart}
            planSer.newProjects(obj5).then(function(response){
                if(response.data.code == 0){
                    $scope.projects = response.data.data;
                    $scope.projectId=$stateParams.projectId;
                    // for(var i=0;i<$scope.projects.length;i++){
                        // if($scope.projects[i].id==$scope.getId){
                    //         $scope.projectId=$scope.projects[i].project;
                    //     }
                    // }
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
            planSer.planList(listData).then(function(response){
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
            planSer.planCount(listData).then(function(response){
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
            $state.go('root.allocation.plan.list[12]',{area:$scope.area,depart:$scope.depart,makeProject:$scope.makeProject,projectId:$scope.projectId});
        }
        
       // if($stateParams.projectId){
       //      var listData = {
       //          page:page || 1,
       //          projectId:$scope.projectId
       //      };
       //      planSer.planList(listData).then(function(response){
       //          if(response.data.code == 0){
       //              $scope.openLists = response.data.data;
       //              //标题重复次数
       //              if($scope.openLists!='' && $scope.openLists!=undefined){
       //                  for(var i=0;i<$scope.openLists.length;i++){
       //                      if($scope.openLists[i].nodeS!='' && $scope.openLists[i].nodeS!=undefined){
       //                          if($scope.openLists[i].nodeS.length>=1){
       //                              $scope.numbers.push($scope.openLists[i].nodeS.length);
                                    
       //                              $scope.maxInNumbers = Math.max.apply(Math, $scope.numbers);
                                    
       //                          }
       //                      }
       //                  }
       //              }
       //              for(var j=0;j<$scope.maxInNumbers;j++){
       //                  $scope.titles.push($scope.every);
       //              }


       //              if($stateParams.id){
       //                  angular.forEach($scope.openLists,function(obj){
       //                      if(obj.id == $stateParams.id){
       //                          obj._selectList = true;
       //                      }
       //                  });
       //                  //向父Ctrl传递事件
       //                  $scope.$emit('changeId', $stateParams.id);
       //                  $scope.$emit('page',$location.search().page);
       //              }
       //          }else{
       //              toastr.error( response.data.msg, '温馨提示');
       //          }
       //      });
       //      planSer.planCount(listData).then(function(response){
       //          if(response.data.code==0){
       //              $scope.custom.itemsCount = response.data.data;
       //              $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;

       //          }else{
       //              toastr.error( response.data.msg, '温馨提示');
       //          }
       //      })
       //  }
        




















        
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
    //点击更多详细
    $scope.moreList = function(event){
        angular.forEach($scope.openLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
    //点击更多详细
    $scope.moreList2 = function(event){
        angular.forEach($scope.openLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList2 = false
            }
        });
        event._moreList2 = !event._moreList2;
    };
    //点击更多详细
    $scope.moreList3 = function(event){
        angular.forEach($scope.openLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList3 = false
            }
        });
        event._moreList3 = !event._moreList3;
    };
//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    


});

