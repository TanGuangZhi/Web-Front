import Vue from "vue";

Vue.filter("appTypeFilter",function (typeId) {
    if(typeId==1){
        return "娱乐";
    }else if(typeId==2){
        return "办公";
    }else if(typeId==3){
        return "休闲";
    }else{
        return "学习";
    }
});
Vue.filter("appPlatformFilter",function (platformId) {
    if(platformId==1){
        return "软件云";
    }else if(platformId==2){
        return "魔方云";
    }else if(platformId==3){
        return "狐表";
    }else{
        return "云表";
    }
});