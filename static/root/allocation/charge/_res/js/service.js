var app = angular.module('chargeServer',[]);
app.factory('chargeSer',function ($http) {
    return {
        charList:charList,
        charCount:charCount,
        charEdit:charEdit,
        additDetect:additDetect,
        getId:getId,
        gitName:gitName,
        charPermission:charPermission
    };
    //菜单权限
    function charPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function charList(data) {
        return $http.get('/charList/list',{
            params: data
        })
    }
    //分配
    function charEdit(data){
        return $http.post('/charEdit/edit',data)
    }
    //id查询
    function getId(data){
        return $http.get('/getId/id',{params:data})
    }
    //分页总条数
    function charCount(data){
        return $http.get('/charCount/count',{params:data})
    }
    //检测
    function additDetect(data){
        return $http.post('/additDetect/detect',data)
    }
    function gitName(){
        return $http.get('/gitName/name')
    }
});
