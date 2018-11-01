import routers from "@/router/routers"
import { 
  getTagListFromlocalStorage,
  getFilterMenuList,
  setTagTolocalStorage,
  removeTagFromlocalStorage,
  checkObjIsInArray,
  setSystemTolocalStorage,
  getSystemFromlocalStorage,
  setMainMenuListTolocalStorage,
  getMainMenuListFromlocalStorage
} from "@/assets/util"
export default {
    state: {
      tagList: [],
      menuList: [],
      systemList: [],
      mainMenuList: []
    },
    getters: {

    },
    mutations: {
      initSystem (state, systemArr) {
        setSystemTolocalStorage(systemArr);
        state.systemList = getSystemFromlocalStorage();
      },
      initMainMenu (state,mainMenuList) {
        setMainMenuListTolocalStorage(mainMenuList);
        state.mainMenuList = getMainMenuListFromlocalStorage(state.systemList[0]);
      },
      initMenu (state, serverRouters){
        state.menuList = getFilterMenuList(routers, serverRouters,state.mainMenuList[0]);
      },
      initTag (state) {
        state.tagList = getTagListFromlocalStorage();
      },
      setTag (state,tagObj) {
        //缓存存储一份
        setTagTolocalStorage(tagObj);
        //更新state数据
        debugger
        if(!checkObjIsInArray(state.tagList,tagObj)) state.tagList.push(tagObj);
      },
      removeTag (state,tagName){
        //清楚缓存中的某个菜单
        removeTagFromlocalStorage(tagName);
        //更新state数据
        state.tagList.forEach((o, i) => {
            if (tagName == o.name) {
              state.tagList.remove(i);
            }
        });
        console.log('==========')
        console.log(state.tagList)

      },
      setMainMenu(state,seletedSystemObj){
        let arr = [];
        const mainMenuList = getMainMenuListFromlocalStorage(seletedSystemObj);
        mainMenuList.forEach(o => {
          if (o.belongMenu == seletedSystemObj.name) {
            arr.push(o);
          }
        });
        setMainMenuListTolocalStorage(arr);
        state.mainMenuList = arr;
      },
      setMenu (state,seletedMainMenuName) {
        let arr = [];
        const allMenuList = JSON.parse(sessionStorage.menuList);
        allMenuList.forEach(o => {
          if (o.belongMenu == seletedMainMenuName) {
            arr.push(o);
          }
        });
        debugger
        state.menuList = arr;
      }
    },
    actions: {}
}