class AppDao {
    static appList = [
        {
            id: 1,
            appName: "王者荣耀",
            appState: "上架",
            appType: "娱乐",
            appPlatform: "魔方云",
            appCount: 99,
            appHref: "王者荣耀",
            appSize: "10M",
            appImg: "images/app/1.png"
        }, {
            id: 2,
            appName: "绝地求生",
            appState: "下架",
            appType: "娱乐",
            appPlatform: "狐表",
            appCount: 199,
            appHref: "绝地求生",
            appSize: "20M",
            appImg: "images/app/2.png"
        }, {
            id: 3,
            appName: "开心消消乐",
            appState: "下架",
            appType: "娱乐",
            appPlatform: "魔方云",
            appCount: 89,
            appHref: "开心消消乐",
            appSize: "30M",
            appImg: "images/app/3.png"
        }, {
            id: 4,
            appName: "植物大战僵尸",
            appState: "上架",
            appType: "娱乐",
            appPlatform: "云表",
            appCount: 109,
            appHref: "植物大战僵尸",
            appSize: "40M",
            appImg: "images/app/4.png"
        }, {
            id: 5,
            appName: "Photoshop",
            appState: "下架",
            appType: "办公",
            appPlatform: "魔方云",
            appCount: 69,
            appHref: "Photoshop",
            appSize: "50M",
            appImg: "images/app/5.png"
        }, {
            id: 6,
            appName: "vxCode",
            appState: "上架",
            appType: "办公",
            appPlatform: "魔方云",
            appCount: 79,
            appHref: "vxCode",
            appSize: "60M",
            appImg: "images/app/6.png"
        }, {
            id: 7,
            appName: "webStorm",
            appState: "上架",
            appType: "办公",
            appPlatform: "云表",
            appCount: 299,
            appHref: "webStorm",
            appSize: "70M",
            appImg: "images/app/7.png"
        }, {
            id: 8,
            appName: "markDown",
            appState: "下架",
            appType: "办公",
            appPlatform: "魔方云",
            appCount: 699,
            appHref: "markDown",
            appSize: "80M",
            appImg: "images/app/8.png"
        }, {
            id: 9,
            appName: "蜗牛APP",
            appState: "上架",
            appType: "办公",
            appPlatform: "狐表",
            appCount: 799,
            appHref: "蜗牛APP",
            appSize: "90M",
            appImg: "images/app/9.png"
        }, {
            id: 10,
            appName: "百度地图",
            appState: "上架",
            appType: "办公",
            appPlatform: "魔方云",
            appCount: 899,
            appHref: "百度地图",
            appSize: "100M",
            appImg: "images/app/10.png"
        }
    ];
    //1.查询app
    static queryApp(appType = "", appPlatform = "", appName = "", orderId = 0) {
        let newArr = [...AppDao.appList];
        return newArr.filter((item) => {
            return item.appType.includes(appType) &&
                item.appPlatform.includes(appPlatform) &&
                item.appName.includes(appName);
        })
    }
    // 2. sort 
    static sortData(params, sortCondition = "id", order = 1) {
        // if (order == 0) {
        //     return AppDao.appList;
        // }
        // ...[] for deep copy
        return [...params].sort((a, b) => {
            return (a[sortCondition] - b[sortCondition]) * order;
        });
    }
    //3.修改app
    static changeData(dataList) {
        return AppDao.appList.map((item) => {
            if (item.id == dataList.id) {
                return dataList;
            }
            return item;
        })

    }
    //4.添加app
    static addData(newDataList) {
        // set id = the appList last id+1
        newDataList.id = AppDao.appList[AppDao.appList.length - 1].id + 1;
        AppDao.appList.push(newDataList);
        return AppDao.appList;
    }
    //5.批量删除
    static delIdByBatch(delArr) {
        AppDao.appList = AppDao.appList.filter((item) => {
            // only can del user
            return !delArr.includes(item.id);
        });
        return AppDao.appList;

    }
}