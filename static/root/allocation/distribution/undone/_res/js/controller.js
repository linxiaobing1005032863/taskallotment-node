var app = angular.module('distUndone', ['toastr']);
app.controller('distUndoneCtrl', function($scope, distSer,$stateParams,$state,toastr,$http){
$scope.showed=true
    distSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });
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
        $scope.cancel = function(){//取消
            $scope.delShow = false;
        }
        var one2=one;
        $scope.delFn = function(one2){//确认
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
            var data = {
                path: $scope.path
            };
            console.log(one)
            var fd = new FormData();
            fd.append('paths', one.path);
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
        // $scope.dist.startTime = angular.element('.startTime').val();
        // $scope.dist.endTime = angular.element('.endTime').val();
        // $scope.dist.needTime=$scope.dist.needTime1;
        // $scope.dist.actualTime=$scope.dist.actualTime1;
        // $scope.dist.executeTime=$scope.dist.executeTime1;
        // $scope.dist.undoneTime=$scope.dist.undoneTime1;
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
        distSer.distriunFinish(addData).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.distribution.list[12]');
                toastr.success( "确认未完成", '温馨提示');
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