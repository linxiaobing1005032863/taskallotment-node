var app = angular.module('summary', ['toastr','angularjs-dropdown-multiselect']);
app.controller('summaryCtrl', function($scope, completeSer,toastr){
    $scope.showed=true;
    $scope.changSelect=function(){
        if($scope.vm.countType=="WHOLE"){
            $scope.none = false;
            $scope.name = false;
        }else if($scope.vm.countType=="DEPART"){
            $scope.none = true;
            $scope.name = false;
        }else if($scope.vm.countType=="PERSON"){
            $scope.none = true;
            $scope.name = true;
        }
    }


    completeSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    completeSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    $scope.positions1 = [];
    $scope.stringSettings1 = {template : '{{option.area}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions2 = [];
    $scope.stringSettings2 = {template : '{{option.department}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.aaa=function(){
        var permitArr2=[];
        var name1=[];
        angular.forEach($scope.positions2,function(item2){
            permitArr2.push(item2.department)
            name1.push(item2.id)
        });
        var obj={};
        var obj2={};
        for(var i= 0;i< permitArr2.length;i++) {
            obj['departs[' + i +']'] = permitArr2[i];
            obj2['deparIds['+ i +']']= name1[i]
            obj.startTime=angular.element('.startTime').val();
            obj.endTime=angular.element('.endTime').val();
        }
        completeSer.getAllProjects(obj).then(function(response){
            if(response.data.code == 0){
                $scope.allProjects = response.data.data;
                Array.prototype.fillterList=function(){
                    var arr=[]
                    var obj={}
                    for(var i=0;i<this.length;i++){
                        var val=this[i]
                        if(!obj[val]){
                            arr.push(val);
                            obj[val]=1
                        }
                    }
                    return arr;
                }
                $scope.allProjectsNew=[]
                $scope.allProjectsNew=$scope.allProjects.fillterList()
            }
        });
        completeSer.getNameT(obj2).then(function(response){
            if(response.data.code == 0){
                $scope.names = response.data.data;
            }
        });
    }
    $scope.positions5 = [];
    $scope.stringSettings5 = {template : '{{option.project}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.bbb=function(){
        var permitArr3=[];
        angular.forEach($scope.positions5,function(item5){
            // permitArr3.push(item5)
            permitArr3.push(item5.id)
        });
        var obj3={};
        for(var i= 0;i< permitArr3.length;i++) {
            // obj3['departs[' + i +']'] = permitArr3[i];
            obj3['projectsID[' + i +']'] = permitArr3[i];
            obj3.startTime=angular.element('.startTime').val();
            obj3.endTime=angular.element('.endTime').val();
        }
        completeSer.collTableCT(obj3).then(function(response){
            if(response.data.code == 0){
                $scope.projects = response.data.data;
            }
        });
    }
    $scope.positions3 = [];
    $scope.stringSettings3 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions4 = [];
    $scope.stringSettings4 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};

    $scope.summary = function(){
        var permitArr1=[];
        angular.forEach($scope.positions1,function(item1){
            permitArr1.push(item1.area)
        });
        $scope.vm.area=permitArr1.join(',');

        var permitArr2=[];
        angular.forEach($scope.positions2,function(item2){
            permitArr2.push(item2.department)
        });
        $scope.vm.depart=permitArr2.join(',');

        var permitArr5=[];
        angular.forEach($scope.positions5,function(item5){
            permitArr5.push(item5)
        });
        $scope.vm.projects=permitArr5.join(',');

        var permitArr3=[];
        angular.forEach($scope.positions3,function(item3){
            permitArr3.push(item3)
        });
        $scope.vm.tables=permitArr3.join(',');

        var permitArr4=[];
        angular.forEach($scope.positions4,function(item4){
            permitArr4.push(item4)
        });
        $scope.vm.name=permitArr4.join(',');

        $scope.vm.startTime=angular.element('.startTime').val();
        $scope.vm.endTime=angular.element('.endTime').val();
        





        completeSer.completeSummary($scope.vm).then(function(response){
            if(response.data.code == 0){
                $scope.summaryAll = response.data.data;
                for(var i=0;i<$scope.summaryAll.length;i++){
                    var ob = {num:0};
                    for(var j=0;j<$scope.summaryAll[i].caseSonS.length;j++){
                        var ob2 = {num:0};
                        for(var k=0;k<$scope.summaryAll[i].caseSonS[j].caseProBOS.length;k++){
                            var ob3 = {num:0};
                            for(var l=0;l<$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS.length;l++){
                                var ob4 = {num:0};
                                for(var n=0;n<$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS.length;n++){
                                    // 第五层
                                    if($scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS[n].caseLastS.length>1){
                                        length5=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS[n].caseLastS.length;
                                    }else{
                                        length5=1;
                                    }
                                    $scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS[n].length5=length5;
                                    ob4.num+=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS[n].length5;
                                    // 当第四层之包含一个第五层的时候
                                    if($scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS.length<=1){
                                        $scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].length4=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS[n].length5;
                                        ob3.num+=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].length4;
                                    }
                                }

                                // 第四层
                                if($scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].grandSonS.length>1){
                                    $scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].length4=ob4.num;
                                    ob3.num+=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].length4;
                                }
                                // 当第三层之包含一个第四层的时候(判断的时候会删减东西？？？)
                                if($scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS.length<=1){
                                    $scope.summaryAll[i].caseSonS[j].caseProBOS[k].length3=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS[l].length4;
                                    ob.num += $scope.summaryAll[i].caseSonS[j].caseProBOS[k].length3;
                                }
                            }

                            // 第三层
                            if($scope.summaryAll[i].caseSonS[j].caseProBOS[k].caseTableBOS.length>1){
                                $scope.summaryAll[i].caseSonS[j].caseProBOS[k].length3=ob3.num;
                                ob2.num+=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].length3;
                            }
                            // 当第二层之包含一个第三层的时候(判断的时候会删减东西？？？)
                            if($scope.summaryAll[i].caseSonS[j].caseProBOS.length<=1){
                                $scope.summaryAll[i].caseSonS[j].length2=$scope.summaryAll[i].caseSonS[j].caseProBOS[k].length3;
                                // ob.num += $scope.summaryAll[i].caseSonS[j].length2;
                            }
                                
                        }

                        //第二层
                        if($scope.summaryAll[i].caseSonS[j].caseProBOS.length>1){
                            $scope.summaryAll[i].caseSonS[j].length2=ob2.num;
                            ob.num += $scope.summaryAll[i].caseSonS[j].length2;
                        }
                    }

                    //第一层
                    $scope.summaryAll[i].length1 = ob.num;
                }
                // console.log($scope.summaryAll)























                // for(var i=0;i<$scope.summaryAll.length;i++){
                //     var ob = {num:0};
                //     for(var j=0;j<$scope.summaryAll[i].caseSonS.length;j++){
                //         var ob2 = {num:0};
                //         for(var k=0;k<$scope.summaryAll[i].caseSonS[j].caseTableS.length;k++){
                //             var ob3 = {num:0};
                //             for(var l=0;l<$scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS.length;l++){
                //                 // 第四层
                //                 if($scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS[l].caseLastS.length>1){
                //                     length4=$scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS[l].caseLastS.length;
                //                 }else{
                //                     length4=1;
                //                 }
                //                 $scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS[l].length4=length4;
                //                 ob3.num+=$scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS[l].length4;
                //                 // 当第三层之包含一个第四层的时候
                //                             if($scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS.length<=1){
                //                                 $scope.summaryAll[i].caseSonS[j].caseTableS[k].length3=$scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS[l].length4;
                //                                 ob2.num+=$scope.summaryAll[i].caseSonS[j].caseTableS[k].length3;
                //                             }
                //             }
                //             // 第三层
                //             if($scope.summaryAll[i].caseSonS[j].caseTableS[k].grandSonS.length>1){
                //                 $scope.summaryAll[i].caseSonS[j].caseTableS[k].length3=ob3.num;
                //                 ob2.num+=$scope.summaryAll[i].caseSonS[j].caseTableS[k].length3;
                //             }
                //             // 当第二层之包含一个第三层的时候(判断的时候会删减东西？？？)
                //             if($scope.summaryAll[i].caseSonS[j].caseTableS.length<=1){
                //                 $scope.summaryAll[i].caseSonS[j].length2=$scope.summaryAll[i].caseSonS[j].caseTableS[k].length3;
                //                 ob.num += $scope.summaryAll[i].caseSonS[j].length2;
                //             }
                                
                //         }
                //         //第二层
                //         if($scope.summaryAll[i].caseSonS[j].caseTableS.length>1){
                //             $scope.summaryAll[i].caseSonS[j].length2=ob2.num;
                //             ob.num += $scope.summaryAll[i].caseSonS[j].length2;
                //         }
                //     }
                //     //第一层
                //     $scope.summaryAll[i].length1 = ob.num;
                // }
            }else{
                toastr.error(response.data.msg,'温馨提示');
            }
        })
        
        
        completeSer.completeFigure($scope.vm).then(function(response){
            if(response.data.code==0){
                $scope.figure = response.data.data;
                var myChart = echarts.init(document.getElementById('main2'));
                var option=$scope.figure;
                option.legend.bottom=20;
                option.title.x= 'center';
                option.grid={};
                option.grid.bottom='20%';
                myChart.setOption(option);
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    };
});





