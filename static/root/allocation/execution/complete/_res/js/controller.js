var app = angular.module('executComplete', ['toastr']);
app.controller('executCompleteCtrl', function($scope, executSer,$stateParams,$state,toastr, $http){


    $scope.edit={};
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours(); 
    var m = d.getMinutes(); 
    var se = d.getSeconds(); 
    $scope.endT=vYear+'-'+toDou(vMon)+'-'+toDou(vDay)+' '+'18:00:00';
    $scope.startT=vYear+'-'+toDou(vMon)+'-'+toDou(vDay)+' '+'08:30:00';



    $scope.showed=true
    executSer.gitName().then(function(response){
        if(response.data.code == 0){
            $scope.names = response.data.data;
        }
    });
    executSer.getDeparts().then(function(response){
        if(response.data.code == 0){
            $scope.departs = response.data.data;
        }
    });
    var infoData ={id: $stateParams.id};
    //获取ID
    executSer.exectId(infoData).then(function(response){
        if(response.data.code== 0){
            $scope.edit = response.data.data;
            if($scope.edit.finishTime == '' || $scope.edit.finishTime == undefined){
                $scope.edit.finishTime=$scope.endT;
            }
            if($scope.edit.startExecute == '' || $scope.edit.startExecute == undefined){
                $scope.edit.startExecute=$scope.startT;
            }
            if($scope.edit.endExecute == '' || $scope.edit.endExecute == undefined){
                $scope.edit.endExecute=$scope.endT;
            }
            if($scope.edit.startTime == '' || $scope.edit.startTime == undefined){
                $scope.edit.startTime=$scope.startT;
            }
            if($scope.edit.endTime == '' || $scope.edit.endTime == undefined){
                $scope.edit.endTime=$scope.endT;
            }
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    });

    $scope.times=function(){
        
            if($scope.edit.taskType=='ADMININSTRATION'){
                $scope.edit.timesType='ADMININSTRATIONS'
            }else if($scope.edit.taskType=='ENGINEERING'){
                $scope.edit.timesType='ENGINEERINGS'
            }else if($scope.edit.taskType=='TRAINING'){
                $scope.edit.timesType='TRAININGS'
            }
    }
    

    $scope.btos =[{tables:[{}]}];
    $scope.add = function(){
        var obj = {tables:[{}]};
        $scope.btos.push(obj);
    }
    $scope.del2 = function(flag){
        $scope.btos.splice(flag,1);
    }







    $scope.isUp = true;//控制按钮颜色
    $scope.files = [];
    $scope.affirmFile = [];
    var oldFiles = [];
    $scope.fileNameChanged = function () {
        $scope.$apply(function () {//触发angular脏检测
            $scope.isUp = false;
            var elFiles = document.getElementById('uploadFile').files;
            for (var i = 0, len = elFiles.length; i < len; i++) {
                var file = elFiles[i];
                var hasOldFile = false;
                for(var ii=0,iiLen=oldFiles.length;ii<iiLen;ii++){
                    if(oldFiles[ii].name==file.name){
                        hasOldFile = true;
                        break;
                    }
                }
                if(!hasOldFile){
                    oldFiles.push(file);
                }
                $scope.files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
            var obj = document.getElementById('uploadFile');
            obj.outerHTML = obj.outerHTML;
        });
    };
    //删除文件
    $scope.del = function (index) {
        $scope.files.splice(index, 1);
        if (!$scope.files.length) {
            $scope.isUp = true;
        }
    };


    $scope.updataSel = function () {
        var fd = new FormData();
        var _files = $scope.files;
        for (var i = 0; i < oldFiles.length; i++) {
            var f = oldFiles[i];
            for (var b = 0; b < _files.length; b++) {
                if (f.name == _files[b].name) {
                    fd.append('files', f);
                    break;
                }
            }
        }
        if (_files.length) {
            fd.append('id', $stateParams.id);
            $http({
                method: 'POST',
                url: '/infoUploadFile/uploadFile',
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
                    // var obj = document.getElementById('uploadFile');
                    // obj.outerHTML = obj.outerHTML;//将input file的选择的文件清空
                    // for (var i = 0; i < _files.length; i++) {//向已经确认里面推送
                    //     $scope.affirmFile.push(_files[i]);
                    // }
                    toastr.success("文件上传成功", '温馨提示');
                    // $scope.files = [];//预览的数组
                    // $scope.isUp = true;//按钮提示
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    };




    //编辑点击提交
    $scope.openEditFun = function(){
        var data = {
            id:$stateParams.id,
            taskType:$scope.edit.taskType,
            taskName:$scope.edit.taskName,
            execute:$scope.edit.execute,
            charge:$scope.edit.charge,
            planNum:$scope.edit.planNum,
            actualNum:$scope.edit.actualNum,
            finishStatus:$scope.edit.finishStatus,
            needTime:$scope.edit.needTime1,
            executeTime:$scope.edit.executeTime1,
            executeType:$scope.edit.executeType,
            actualTime:$scope.edit.actualTime1,
            actualType:$scope.edit.actualType,
            undoneTime:$scope.edit.undoneTime1,
            undoneType:$scope.edit.undoneType,
            finishTime:angular.element('.finishTime').val(),
            startExecute:angular.element('.startExecute').val(),
            endExecute:angular.element('.endExecute').val(),
            startTime:$scope.edit.startTime,
            endTime:$scope.edit.endTime,
            notice:$scope.edit.notice,
            reimbursement:$scope.edit.reimbursement,
            summary:$scope.edit.summary,
            question:$scope.edit.question,
            timesType:$scope.edit.timesType,
            moudle:$scope.edit.moudle,
            gpriority:$scope.edit.gpriority,
            tables:angular.copy($scope.btos),
        }
        var addData = converFormData(data);
        // vm.editexecut.projectName = angular.element('.na').val();
        executSer.exectComplete(addData).then(function(response){
            if(response.data.code == 0){
                $state.go('root.allocation.execution.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

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


function toDou(num){
    return num<10?'0'+num:num;
}