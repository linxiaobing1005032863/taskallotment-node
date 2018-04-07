var app = angular.module('executServer',[]);
app.factory('executSer',function ($http) {
    return {
        exectList:exectList,
        exectCount:exectCount,
        exectId:exectId,
        exectConfirm:exectConfirm,
        exectUnconfirm:exectUnconfirm,
        exectUpload:exectUpload,
        exectAgain:exectAgain,
        exectComplete:exectComplete,
        exectPermission:exectPermission,
        //-----------------
        searchList:searchList,
        gitName:gitName,
        getDeparts:getDeparts
    };
    //菜单权限
    function exectPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function exectList(data) {
        return $http.get('/exectList/list',{
            params: data
        })
    }
    //搜索
    function searchList(data) {
        return $http.get('/bidexecution/search',{
            params: data
        })
    }
    //不确认接收任务
    function exectUnconfirm(data){
        return $http.post('/exectUnconfirm/unconfirm',data)
    }
    //上报任务
    function exectUpload(data){
        return $http.post('/exectUpload/upload',data)
    }
    //再次分发
    function exectAgain(data){
        return $http.post('/exectAgain/again',data)
    }
    //填写任务完成情况
    function exectComplete(data){
        return $http.post('/exectComplete/complete',data)
    }
    //id查询
    function exectId(data){
        return $http.get('/getId/id',{
            params:data
        })
    }
    //分页总条数
    function exectCount(data){
        return $http.get('/exectCount/count',{params:data})
    }
    //确认接收任务
    function exectConfirm(data){
        return $http.get('/exectConfirm/confirm',{
            params: data
        })
    }
    
    //获取所有部门
    function getDeparts(){
        return $http.get('/getDeparts/departs')
    }
    //获取所有姓名
    function gitName(){
        return $http.get('/gitName/name')
    }
});
