var app = angular.module('allotEdit', ['toastr','angularjs-dropdown-multiselect']);
app.controller('allotEditCtrl', function($scope, allotsetSer,$stateParams,$state,toastr){
$scope.showed=true
    var infoData ={id: $stateParams.id};
    //获取ID
    allotsetSer.allotId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.allot = response.data.data;
            if($scope.allot.countType=='WHOLE'){
                $scope.xmz = false;
                $scope.one = false;
            }else if($scope.allot.countType=='DEPART'){
                $scope.xmz = true;
                $scope.one = false;
            }else if($scope.allot.countType=='PERSON'){
                $scope.xmz = true;
                $scope.one = true;
            }
            if($scope.allot.forObject=="ALL"){
                $scope.xmz2 = false;
                $scope.one2 = false;
            }else if($scope.allot.forObject=="DEPART"){
                $scope.xmz2 = true;
                $scope.one2 = false;
            }else if($scope.allot.forObject=="PERSON"){
                $scope.xmz2 = true;
                $scope.one2 = true;
            }
            if($scope.allot.area!='' && $scope.allot.area!=undefined){
                $scope.positions1=$scope.allot.area.split(',');
            }
            if($scope.allot.countPersons!='' && $scope.allot.countPersons!=undefined){
                $scope.positions5=$scope.allot.countPersons.split(',');
            }
            if($scope.allot.forPersons!='' && $scope.allot.forPersons!=undefined){
                $scope.positions7=$scope.allot.forPersons.split(',');
            }
            
            
            

            $scope.positions2=$scope.allot.departs;
            $scope.positions6=$scope.allot.forDepart;
            $scope.positions3=$scope.allot.projects;
            $scope.box=[]
            for(var i=0;i<$scope.allot.tables.length;i++){
                $scope.box.push($scope.allot.tables[i].name)
                $scope.positions4=$scope.box
            }
            


            $scope.box3=[];
            $scope.box4=[];
            $scope.box5=[];
            var obj3={};
            var obj4={};
            var obj5={};
            for(var i= 0;i< $scope.allot.departs.length;i++) {
                $scope.box3.push($scope.allot.departs[i].department)
                $scope.box4.push($scope.allot.departs[i].id)
                obj3['departs[' + i +']'] = $scope.box3[i];
                obj4['deparIds['+ i +']']= $scope.box4[i]
            }
            for(var i= 0;i< $scope.allot.projects.length;i++) {
                $scope.box5.push($scope.allot.projects[i].id)
                obj5['projectIds[' + i +']'] = $scope.box5[i];
            }
            allotsetSer.getTableT(obj5).then(function(response){
                if(response.data.code == 0){
                    $scope.tables = response.data.data;
                }
            });
            allotsetSer.getProjectT(obj3).then(function(response){
                if(response.data.code == 0){
                    $scope.projects = response.data.data;
                    $scope.arr3=[]
                    for(let i=0;i<$scope.projects.length;i++){
                        $scope.arr3.push($scope.projects[i].project)
                    }
                }
            });
            allotsetSer.getNameT(obj4).then(function(response){
                if(response.data.code == 0){
                    $scope.names = response.data.data;
                }
            });





        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });






    $scope.changSelect1 = function(){
        if($scope.allot.countType=="WHOLE"){
            $scope.xmz = false;
            $scope.one = false;
        }else if($scope.allot.countType=="DEPART"){
            $scope.xmz = true;
            $scope.one = false;
        }else if($scope.allot.countType=="PERSON"){
            $scope.xmz = true;
            $scope.one = true;
        }
    }
    $scope.changSelect2 = function(){
        if($scope.allot.forObject=="ALL"){
            $scope.xmz2 = false;
            $scope.one2 = false;
        }else if($scope.allot.forObject=="DEPART"){
            $scope.xmz2 = true;
            $scope.one2 = false;
        }else if($scope.allot.forObject=="PERSON"){
            $scope.xmz2 = true;
            $scope.one2 = true;
        }
    }
    allotsetSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
            $scope.arr1=[]
            for(let i=0;i<$scope.areas.length;i++){
                $scope.arr1.push($scope.areas[i].area)
            }
        }
    });
    allotsetSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    
    
   

    
    

    $scope.positions1 = [];
    $scope.stringSettings1 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions2 = [];
    $scope.stringSettings2 = {template : '{{option.department}}', smartButtonTextConverter(skip, option) { return option; }};
    var index=0;
    $scope.aaa=function(){ 
        index++;
        if(index==1){
            $scope.positions2 = [];
        } 
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
        }
        allotsetSer.getProjectT(obj).then(function(response){
            if(response.data.code == 0){
                $scope.projects = response.data.data;
                // $scope.arr3=[]
                // for(let i=0;i<$scope.projects.length;i++){
                //     $scope.arr3.push($scope.projects[i].project)
                // }
            }
        });
        allotsetSer.getNameT(obj2).then(function(response){
            if(response.data.code == 0){
                $scope.names = response.data.data;
            }
        });
    }
    $scope.positions3 = [];
    $scope.stringSettings3 = {template : '{{option.project}}', smartButtonTextConverter(skip, option) { return option; }};
    var index2=0;
    $scope.bbb=function(){  
        index2++;
        if(index2==1){
            $scope.positions3 = [];
        }  
        var permitArr3=[];
        angular.forEach($scope.positions3,function(item3){
            permitArr3.push(item3.id)
        });
        var obj={};
        for(var i= 0;i< permitArr3.length;i++) {
            obj['projectIds[' + i +']'] = permitArr3[i];
        }
        allotsetSer.getTableT(obj).then(function(response){
            if(response.data.code == 0){
                $scope.tables = response.data.data;
            }
        });
    }
    var index3=0;
    $scope.ccc=function(){
        index3++;
        if(index3==1){
            $scope.positions6 = [];
        }
    }
    $scope.positions4 = [];
    $scope.stringSettings4 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions5 = [];
    $scope.stringSettings5 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions6 = [];
    $scope.stringSettings6 = {template : '{{option.department}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions7 = [];
    $scope.stringSettings7 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};






    //编辑点击提交
    $scope.openEditFun = function(){
       var permitArr1=[];
        angular.forEach($scope.positions1,function(item1){
            permitArr1.push(item1)
        });
        $scope.allot.areas=permitArr1.join(',');


        var permitArr2=[];
        angular.forEach($scope.positions2,function(item2){
            permitArr2.push(item2.department)
        });
        $scope.allot.departs=permitArr2.join(',');

        var permitArr3=[];
        angular.forEach($scope.positions3,function(item3){
            permitArr3.push(item3.project)
        });
        $scope.allot.projects=permitArr3.join(',');


        var permitArr4=[];
        angular.forEach($scope.positions4,function(item4){
            permitArr4.push(item4)
        });
        $scope.allot.tables=permitArr4.join(',');


        var permitArr5=[];
        angular.forEach($scope.positions5,function(item5){
            permitArr5.push(item5)
        });
        $scope.allot.countPersonss=permitArr5.join(',');


        var permitArr6=[];
        angular.forEach($scope.positions6,function(item6){
            permitArr6.push(item6.department)
        });
        $scope.allot.forDepartss=permitArr6.join(',');


        var permitArr7=[];
        angular.forEach($scope.positions7,function(item7){
            permitArr7.push(item7)
        });
        $scope.allot.forPersonss=permitArr7.join(',');

        $scope.allot.setTime = angular.element('.setTime').val();
        $scope.allot.startTime = angular.element('.startTime').val();
        $scope.allot.endTime = angular.element('.endTime').val();
        allotsetSer.allotEdit($scope.allot).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.allotmentset.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





