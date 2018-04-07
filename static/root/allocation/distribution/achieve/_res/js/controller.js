var app = angular.module('distAchieve', ['toastr']);
app.controller('distAchieveCtrl', function($scope, distSer,$stateParams,$state,toastr,$http){
$scope.showed=true
    distSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });
    $scope.times=function(){
        if($scope.dist.taskType=='ADMININSTRATION'){
            $scope.dist.timesType='ADMININSTRATIONS'
        }else if($scope.dist.taskType=='ENGINEERING'){
            $scope.dist.timesType='ENGINEERINGS'
        }else if($scope.dist.taskType=='TRAINING'){
            $scope.dist.timesType='TRAININGS'
        }
    }
    $scope.btos =[{questions:[{}]}];
    $scope.add = function(){
        var obj = {questions:[{}]};
        $scope.btos.push(obj);
    }
    $scope.del = function(flag){
        $scope.btos.splice(flag,1);
    }
    var infoData ={id: $stateParams.id};
    //获取ID
    distSer.distriId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.dist = response.data.data;
            if($scope.dist.questions!='' && $scope.dist.questions!=undefined){
                $scope.btos=$scope.dist.questions;
            }
            if($scope.dist.finishStatus=='FINISH'){
                $scope.dist.finishStatus='已完成'
            }else if($scope.dist.finishStatus=='UNFINISHED'){
                $scope.dist.finishStatus='未完成'
            }
            if($scope.dist.question==true){
                $scope.yes=true;
            }
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    distSer.infoFiles(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.distFiles = response.data.data;
            $scope.length = $scope.distFiles ? $scope.distFiles.length : 0;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    $scope.fn = function(one){
        $scope.delShow = true;
        //取消
        $scope.cancel = function(){
            $scope.delShow = false;
        }
        var one2=one;
        //下载
        $scope.delFn = function(one2){
            var obj = {
                path:one.path,
                fileType:one.fileType
            };
            var iframe = document.createElement('iframe');

            iframe.src=`/infoDownload/download${encode(obj,true)}`;

            iframe.style.display = 'none';

            document.body.appendChild(iframe);
            setTimeout(function(){

                var iframe = document.getElementsByTagName('iframe');

                for(var i= 0;i<iframe.length;i++){

                    iframe[i].parentNode.removeChild(iframe[i]);

                }

            },1000);
            $scope.delShow = false;
        }
        //删除
        $scope.delete = function(one2){
            // var delNum = [];//记录删除数组的下标
            var data = {
                path: $scope.path
            };
            console.log(one)
            var fd = new FormData();
            // for(let i=0,len=$scope.encloInfo.length;i<len;i++){
                // if($scope.encloInfo[i].checked){
                    // console.log($scope.encloInfo[i].path)
                    fd.append('paths', one.path);
                    // delNum.push(i);
                // }
                // $scope.encloInfo[i].checked = false;
            // }
              $http({
                    method: 'POST',
                    url: '/infoDelfile/delfile',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: fd,
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }
                }, function (data) {
                    console.info(data);
                }).then(function (response) {
                    if (response.data.code == 0) {
                        toastr.success('成功删除文件','温馨提示');
                        location.reload();
                        $scope.delShow = false;
                        // for(var i = 0;i<delNum.length;i++){
                        //     one.delel = true;
                        //     $scope.length--;
                        // }
                        // if(!$scope.length){
                        //     angular.element('.checked-none[data-style="checked"]:checked + label').css('background','none')
                        // }
                        // $scope.isLength = 0;//控制样式

                    } else {
                        toastr.error(response.data.msg, '温馨提示');
                    }
                });
        };
    }


    //编辑点击提交
    $scope.openEditFun = function(){
        if($scope.dist.finishStatus=='已完成'){
            $scope.dist.finishStatus='FINISH'
        }else if($scope.dist.finishStatus=='未完成'){
            $scope.dist.finishStatus='UNFINISHED'
        }
       for(let i=0;i<$scope.btos.length;i++){
            $scope.btos[i].expectTime=angular.element(".expectTime")[i].value;
        }

        var data = {
            id:$stateParams.id,
            taskType:$scope.dist.taskType,
            taskName:$scope.dist.taskName,
            content:$scope.dist.content,
            execute:$scope.dist.execute,
            planNum:$scope.dist.planNum,
            actualNum:$scope.dist.actualNum,
            finishStatus:$scope.dist.finishStatus,
            needTime:$scope.dist.needTime1,
            needType:$scope.dist.needType,
            executeTime:$scope.dist.executeTime1,
            executeType:$scope.dist.executeType,
            actualTime:$scope.dist.actualTime1,
            actualType:$scope.dist.actualType,
            undoneTime:$scope.dist.undoneTime1,
            undoneType:$scope.dist.undoneType,
            finishTime:$scope.dist.finishTime,
            startExecute:$scope.dist.startExecute,
            endExecute:$scope.dist.endExecute,
            startTime:angular.element('.startTime').val(),
            endTime:angular.element('.endTime').val(),
            notice:$scope.dist.notice,
            reimbursement:$scope.dist.reimbursement,
            summary:$scope.dist.summary,
            question:$scope.dist.question,

            questions:angular.copy($scope.btos)
        }
        var addData = converFormData(data);
        distSer.distrifinish(addData).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.distribution.list[12]');
                toastr.success( "确认完成", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





app.filter('cov',function(){
    return function(val){
        var result;
        switch (val){
            case 'PNG':
                result = 'png';
                break;
            case 'JPG':
                result = 'jpg';
                break;
            case 'XLS':
                result = "XLS";
                break;
            case 'HTML':
                result = 'HTML';
                break;
            case 'XLSX':
                result = "XLSX";
                break;
            case 'PDF':
                result = 'PDF';
                break;
            case 'TXT':
                result = "TXT";
                break;
            case 'SRT':
                result = 'SRT';
                break;
            case 'UNKNOW':
                result = "UNKNOW";
                break;
            case 'PPTX':
                result = 'PPTX';
                break;
            case 'ZIP':
                result = "ZIP";
                break;
            case 'RAR':
                result = 'RAR';
                break;
            default:
                result = "other";
                break;
        }
        return '/images/' + result + '.png';
    };
});



//数据类型转换工具
function converFormData() {
    var objToFormData = function(obj,obj2,sec,flag){
        if(obj){
            var count = 0;
            for(var name in obj){
                var val = obj[name];
                if(val instanceof Array){
                    val.forEach(function (item,index) {
                        for(var name2 in item){
                            var val2 = item[name2];
                            if(val2 instanceof Array){
                                val2.forEach(function (dItem,dIndex) {
                                    objToFormData(dItem,obj,name+'['+index+'].'+name2,dIndex);
                                });
                            }else{
                                if((typeof val2)!='function'){
                                    obj[name+'['+index+'].'+name2] = val2;
                                }
                            }
                        }
                    });
                    delete obj[name];
                }else if(sec){
                    if((typeof val)!='function'){
                        obj2[sec+'['+flag+'].'+name] = val;
                        count++;
                    }
                }else if(typeof val == 'object'){
                    for(var key in val){
                        obj[name + '.' + key] = val[key];
                    }
                    delete obj[name];
                }
            }
        }

    }
    var _obj = $.extend(true,{},arguments[0]);
    objToFormData(_obj);
    return _obj;
}


function encode(){
    var obj = arguments[0];
    var contacat = false;
    if (arguments[1]) {
        contacat = true;
    }
    var str = '';
    var count = 0;
    for (var name in obj) {
        if (obj[name]&&( typeof obj[name]) != 'function') {
            str += (((contacat && count == 0) ? '?' : '&') + name + '=' + obj[name]);
            count++;
        }
    }
    return encodeURI(str);
}