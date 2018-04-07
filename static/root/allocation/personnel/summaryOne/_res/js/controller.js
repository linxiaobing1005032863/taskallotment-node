var app = angular.module('SummaryOne', ['toastr','angularjs-dropdown-multiselect']);
app.controller('summaryOneCtrl', function($scope, personnelSer,toastr){
    $scope.showed=true;
    personnelSer.getArea().then(function(response){
        if(response.data.code == 0){
            $scope.areas = response.data.data;
        }
    });
    personnelSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    $scope.positions1 = [];
    $scope.stringSettings1 = {template : '{{option.area}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.positions2 = [];
    $scope.stringSettings2 = {template : '{{option.department}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.aaa=function(){
        var name1=[];
        angular.forEach($scope.positions2,function(item2){
            name1.push(item2.id)
        });
        var obj2={};
        for(var i= 0;i< name1.length;i++) {
            obj2['deparIds['+ i +']']= name1[i]
        }
        personnelSer.getNameT(obj2).then(function(response){
            if(response.data.code == 0){
                $scope.names = response.data.data;
            }
        });
    }

    $scope.positions4 = [];
    $scope.stringSettings4 = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};







//  $scope.SummaryOne=[
//     {
//         "area": "222",
//         "personSonS": [
//             {
//                 "depart": "合计",
//                 "personLastS": [
//                     {
//                         "differ": 0,
//                         "name":123321,
//                     }
//                 ]
//             },
//             {
//                 "depart": "合计",
//                 "personLastS": [
//                     {
//                         "differ": 0,
//                         "name":123
//                     },
//                     {
//                         "differ": 0,
//                         "name":123
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "area": "合计",
//         "personSonS": [
//             {
//                 "personLastS": [
//                     {
//                         "differ": 0
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "area": "总合计",
//         "personSonS": [
//             {
//                 "depart": "合计",
//                 "personLastS": [
//                     {
//                         "differ": 0,
//                         "name":123
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// var length=0;
// var length2=0;
// var index=0;
// var index2=0;
// var arr=[];
// var num=0;
// for(var i=0;i<$scope.SummaryOne.length;i++){
//     index=i; 
//     for(var j=0;j<$scope.SummaryOne[index].personSonS.length;j++){
//         index2=j;
//         if($scope.SummaryOne[index].personSonS[index2].personLastS.length>=1){
//             length2=$scope.SummaryOne[index].personSonS[index2].personLastS.length;
//         }else{
//             length2=1;
//         }
//         $scope.SummaryOne[i].personSonS[j].length2=length2;
//         // if(Number($scope.SummaryOne[i].personSonS[j].length2)>1){
//         //     console.log()
//         // }
//         // $scope.SummaryOne[i].length+=$scope.SummaryOne[index].personSonS[index2].length2;
//         arr.push($scope.SummaryOne[i].personSonS[j].length2)
        
//     }   
//     // console.log($scope.SummaryOne[i].personSonS.length)
//     if($scope.SummaryOne[i].personSonS.length>1){
//         for(var q=0;q<$scope.SummaryOne[i].personSonS.length;q++){
//             num += arr[q];
//             $scope.SummaryOne[i].length=num;
//         }
//     }
//     // $scope.SummaryOne[i].length=length;
// }
// console.log(num)
// console.log(arr)
// console.log( $scope.SummaryOne)






























    $scope.collect = function(){
        $scope.vm={};
        $scope.vm.startTime=angular.element('.startTime').val();
        $scope.vm.endTime=angular.element('.endTime').val();
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

        var permitArr4=[];
        angular.forEach($scope.positions4,function(item4){
            permitArr4.push(item4)
        });
        $scope.vm.name=permitArr4.join(',');
        personnelSer.personnelSummaryOne($scope.vm).then(function(response){
            if(response.data.code == 0){
                $scope.SummaryOne = response.data.data;
                var length=0;
                var length2=0;
                var index=0;
                var index2=0;
                var arr=[];
                // var num=0;
                for(var i=0;i<$scope.SummaryOne.length;i++){
                    var ob = {num:0};
                    for(var j=0;j<$scope.SummaryOne[i].personSonS.length;j++){
                        if($scope.SummaryOne[i].personSonS[j].personLastS.length>=1){
                            length2=$scope.SummaryOne[i].personSonS[j].personLastS.length;
                        }else{
                            length2=1;
                        }
                        $scope.SummaryOne[i].personSonS[j].length2=length2;
                        // arr.push($scope.SummaryOne[i].personSonS[j].length2)
                        ob.num+=$scope.SummaryOne[i].personSonS[j].length2;
                    }   
                    if($scope.SummaryOne[i].personSonS.length>1){
                        // for(var q=0;q<$scope.SummaryOne[i].personSonS.length;q++){
                        //     num += arr[q];
                        //     $scope.SummaryOne[i].length=num;
                        // }
                        $scope.SummaryOne[i].length=ob.num;
                    }else if($scope.SummaryOne[i].personSonS.length=1){
                        $scope.SummaryOne[i].length=ob.num;
                    }
                }
            }else{
                toastr.error(response.data.msg,'温馨提示');
            }
        })



        personnelSer.personnelFigureOne($scope.vm).then(function(response){
            if(response.data.code==0){
                $scope.figure = response.data.data;
                var myChart = echarts.init(document.getElementById('main4'));
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





