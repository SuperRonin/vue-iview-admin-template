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
      mainMenuList: [],
      iframeObj: {
        name: "",
        showIframe: false,
        iframeList: []
      }
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
      /**
       * obj包含两个参数
       * @param {} serverRouters 服务端返回的权限列表
       * @param {} vm   vue实例
       */
      initMenu (state, obj){
        // console.log(getFilterMenuList(routers, obj.serverRouters,state.mainMenuList[0]), obj.vm);
        state.menuList = getFilterMenuList(routers, obj.serverRouters,state.mainMenuList[0], obj.vm);
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
        state.menuList = arr;
      },
      setIframe (state, iframeObj) {
        debugger
        if(iframeObj.name && iframeObj.url){
          state.iframeObj.showIframe = true;
          state.iframeObj.name = iframeObj.name;
          var isAdd = state.iframeObj.iframeList.some((o) => {
            return o.name === iframeObj.name;
          })
          if(!isAdd) state.iframeObj.iframeList.push(iframeObj);
          console.log(state.iframeObj)
        }else{
          state.iframeObj.showIframe = false;
        }
      }
    },
    actions: {}
}