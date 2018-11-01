// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


export const setTagTolocalStorage = (tagObj) => {
    const tagList = sessionStorage.tagList ? JSON.parse(sessionStorage.tagList) : [];
    if(!checkObjIsInArray(tagList,tagObj)){
        tagList.push(tagObj);
        sessionStorage.tagList = JSON.stringify(tagList);
    }
}
export const removeTagFromlocalStorage = (tagName) => {
    const tagList = sessionStorage.tagList ? JSON.parse(sessionStorage.tagList) : [];
    tagList.forEach((o, i) => {
        if (tagName == o.name) {
            tagList.remove(i);
        }
    });
    sessionStorage.tagList = JSON.stringify(tagList);
}
export const getNextRoute = () => {
    const tagList = sessionStorage.tagList ? JSON.parse(sessionStorage.tagList) : [];
    return tagList[tagList.length - 1]
}
export const getTagListFromlocalStorage = () => {
    let arr = [{
        name: "home",
        title: "欢迎页"
    }];
    if (sessionStorage.tagList) {
        arr.push(JSON.parse(sessionStorage.tagList));
    }
    sessionStorage.tagList = JSON.stringify(arr);
    return arr
}
export const getFilterMenuList = (routers, serverRouters, defaultMainMenu) => {
    
    const filterRouters = getFilterRouter(routers, serverRouters);
    // 如果项目左侧菜单依赖顶部菜单，则进行过滤，否则为后台返回的所有权限路由
    debugger
    if(defaultMainMenu){
        const arr = [];
        filterRouters.forEach((o) => {
            if(o.belongMenu == defaultMainMenu.name) arr.push(o);
        })
        return arr
    }else{
        return filterRouters
    }
}
export const getFilterRouter = (routers, serverRouters) => {
    let menuList = [];
    routers.forEach((routerItem, index) => {
        serverRouters = serverRouters.length == 0 ? JSON.parse(sessionStorage.menuList) : serverRouters;
        if (serverRouters) {
            serverRouters.forEach((serverItem, i) => { //遍历菜单数据，找出路由中匹配的
                // if(v.belongMenu !== state.mainTopMenu) return false
                if (serverItem.name === routerItem.name) {
                    //一级菜单标题、所属菜单
                    routerItem.title = serverItem.title;
                    routerItem.belongMenu = serverItem.belongMenu;

                    // 筛选子菜单
                    let childrenArr = [];
                    serverItem.children.forEach((serverItemChild, j) => {
                        routerItem.children.forEach((routerItemChild, n) => {
                            if (serverItemChild.name == routerItemChild.name) { //数据中的children集合和前端路由中的子路由有相同的
                                routerItemChild.title = serverItemChild.title;
                                routerItemChild.isFrame = serverItemChild.isFrame;
                                routerItemChild.url = serverItemChild.url;
                                routerItemChild.subChildren = getSubChild(serverItemChild,routerItemChild);
                                
                                
                                


                                childrenArr.push(routerItemChild);
                            }
                        })
                    })
                    if (childrenArr.length > 0) {
                        let routes = menuList.some(o => {
                            return o.name === serverItem.name
                        });
                        if (routes) return
                        routerItem.children = childrenArr;
                        menuList.push(routerItem);
                    }
                } else {
                    // Util.addRoute(state.mainTopMenu,appRouter,v,menuList);
                }
            })
        }
    })
    sessionStorage.menuList = JSON.stringify(menuList);
    return menuList
}
export const setSystemTolocalStorage = (systemArr) => {
    if(systemArr.length == 0) return;
    let localSystemArr = sessionStorage.systemList ? JSON.parse(sessionStorage.systemList): systemArr;
    sessionStorage.systemList = JSON.stringify(systemArr);
}
export const getSystemFromlocalStorage = () => {
    let localSystemArr = sessionStorage.systemList ? JSON.parse(sessionStorage.systemList): [];
    return localSystemArr
}
export const setMainMenuListTolocalStorage = (mainMenuList) => {
    if(mainMenuList.length == 0) return;
    let localMainMenuArr = sessionStorage.mainMenuList ? JSON.parse(sessionStorage.mainMenuList): mainMenuList;
    sessionStorage.mainMenuList = JSON.stringify(localMainMenuArr);
}
export const getMainMenuListFromlocalStorage = (defaultSystemList) => {
    const defaultSystemName = defaultSystemList.name;
    const defaultMainMenu = [];
    let localMainMenuArr = sessionStorage.mainMenuList ? JSON.parse(sessionStorage.mainMenuList): [];
    localMainMenuArr.forEach((o) => {
        if(o.belongMenu == defaultSystemName){
            defaultMainMenu.push(o)
        }
    })
    return defaultMainMenu
}








/*=============================以下是工具方法============================ */
const getSubChild = (serverItemChild,routerItemChild) => {
    var serverThirdChild = serverItemChild.subChildren;
    var routerThirdChild = routerItemChild.subChildren;
    // 如果权限列表中的某个children有三级路由
    if(serverThirdChild && serverThirdChild.length != 0){
        let thirdArr = [];
        serverThirdChild.forEach(function(o,i){
            routerThirdChild.forEach(function(v){
                if(o.name==v.name){
                    v.title = o.title;
                    v.isFrame = o.isFrame;
                    v.url = o.url;
                    thirdArr.push(v)
                }
            })
            
        })
        return thirdArr
    }else{
        return routerItemChild.subChildren
    }
}



export const checkObjIsInArray = (array, obj) => {
    var newVal = obj.name;
    for (var i = 0; i < array.length; i++) {
        if (obj) {
            if (array[i]) {
                var val = array[i].name;
                if (newVal === val) {
                    return true;
                }
            }
        }
    }
    return false;
}