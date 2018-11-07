<template>
    <div ref="sideMenu" class="menu" width="auto" @on-click="changeMenu">
        <div v-for="(item,index) in menuList" class="topList">
            <div v-if="item.children==0" class="cursor-pointer mainTitle" ref="submenuBox" @click="changeMenu(item,item.path || item.url)" @mouseover="showmenu($event,0,3)"   @mouseout="showmenu($event,0,3)" :name="item.name" :key="'menuitem' + item.name">
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
                <Icon :type="item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
            </div>
            <div v-else-if="item.children.length<=1 && !item.children[0].subChildren" class="cursor-pointer mainTitle" ref="submenuBox" @click="changeMenu(item.children[0],item.path || item.url)" @mouseover="showmenu($event,0,3)"   @mouseout="showmenu($event,0,3)" :name="item.children[0].name" :key="'menuitem' + item.name">
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
            </div>
            <div v-else-if="item.children.length<=1 && item.children[0].subChildren" :name="item.name" :key="'menuitem' + item.name">
                <div slot="title" class="cursor-pointer" style="position: relative" @mouseout="showmenu($event,0,index)" @mouseover="showmenu($event,1,index)">
                    <Icon :type="item.icon" :size="iconSize" :key="'menuicon' + item.icon"></Icon>
                    <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
                </div>    
                <div class="submenu cursor-pointer" ref="submenuBox" @mouseout="showmenu($event,0,index)" @mouseover="showmenu($event,1,index)" v-if="item.children[0].subChildren" :name="item.children[0].name" :key="item.children[0].name">
                    <div slot="title" class="cursor-pointer" style="position: relative" @mouseout="showmenu($event,0,index)" @mouseover="showmenu($event,1,index)">
                        <Icon :type="item.children[0].icon" :size="iconSize" :key="'menuicon' + item.children[0].icon"></Icon>
                        <span class="layout-text" :key="'title' + item.children[0].name">{{ itemTitle(item.children[0]) }}</span>
                    </div> 
                    <div v-for="subchild in item.children[0].subChildren">
                        <div slot="title" style="padding-left: 20px;" class="title" @click="changeMenu(subchild,subchild.path || subchild.url)">
                            <Icon :type="subchild.icon" :size="iconSize"></Icon>
                            <span class="layout-text">{{ subchild.title }}</span>
                        </div>
                        <!-- <div class="sub2menu" @click="changeMenu(subchild.path)" :name="subchild.name" :key="'menuitem' + subchild.name">
                            <Icon :type="subchild.icon" :size="iconSize" :key="'icon' + subchild.name"></Icon>
                            <span class="layout-text thirdmenu" :key="'title' + subchild.name">{{ subchild }}</span>
                        </div> -->
                    </div>
                </div>
            </div>
            

            <div v-else-if="item.children.length > 1" :name="item.name" :key="item.name">
                <div slot="title" class="cursor-pointer mainTitle"  @mouseover="showmenu($event,1,index)"  @mouseout="showmenu($event,0,index)">
                    <span class="layout-text inline-w100">{{ itemTitle(item) }}</span>
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                </div>
                <!-- 三级菜单 -->
                <div class="cursor-pointer submenu" ref="submenuBox"  @mouseover="showmenu($event,1,index)"  @mouseout="showmenu($event,0,index)">
                    <div v-for="(child,index) in item.children" class="secendList">
                        <div v-if="!child.subChildren" class="cursor-pointer" :name="child.name" :key="'menuitem' + child.name"  @click="changeMenu(child,child.path)">
                            <Icon :type="child.icon" :size="iconChild" :key="'icon' + child.name"></Icon>
                            <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                        </div>
                        <div v-else="child.subChildren" id="demoaa" :name="child.name" :key="child.name">
                            <div slot="title" class="cursor-pointer" style="position: relative">
                                <Icon :type="child.icon" :size="iconSize" :key="'menuicon' + child.icon"></Icon>
                                <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                            </div>    
                            <!-- <div class="submenu cursor-pointer" ref="submenuBox" @mouseout="showmenu($event,0,index)" @mouseover="showmenu($event,1,index)" v-if="item.children[0].subChildren" :name="item.children[0].name" :key="item.children[0].name"> -->
                            <div v-for="(subchild,j) in child.subChildren">
                                <div slot="title" style="padding-left: 20px;" class="title"  @click="changeMenu(subchild,subchild.path)">
                                    <Icon :type="item.children[0].subChildren[0].icon" :size="iconSize"></Icon>
                                    <span class="layout-text thirdmenu">{{ itemTitle(subchild) }}1212</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { setTagTolocalStorage } from "@/assets/util"
export default {
    name: "menu-hover",
    data (){
        return {
            iconSize: 10,
            iconChild: 10
        }
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList
        }
    },
    mounted () {
    },
    methods: {
        changeMenu(active,path){
            debugger
            //增加tag标签
            this.$store.commit("setTag",{
                title: active.title,
                name: active.name,
                url: active.url
            })
            // 如果是iframe页面,则执行iframe渲染，否则走正常路由
            if(active.url){
                this.$store.commit("setIframe",{
                    name: active.name,
                    url: active.url
                });
                this.$router.push({
                    name: active.name
                });
            }else{
                this.$store.commit("setIframe",{});
                this.$router.push({
                    name: active.name
                });
            }
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        },
        showmenu (event,flag,index) {  //1: 显示  0: 隐藏
        //    if(event.target.className.indexOf("title") >= 0) return;
           if(flag == 1){
                if(this.$refs.submenuBox && this.$refs.submenuBox[index]){
                    this.menuActive(event,1);
                    this.$refs.submenuBox[index].style.display = 'block';
                    this.$refs.submenuBox[index].style.top = index * 50 + 'px';
                }
            }else{
                if(this.$refs.submenuBox && this.$refs.submenuBox[index]){
                    this.menuActive(event,0);
                    this.$refs.submenuBox[index].style.display = 'none';
                    this.$refs.submenuBox[index].style.top = '0px';
                }
            }
            
        },
        menuActive (event,flag) {
            if(flag == 1){
                if(event.target.className.split(',').indexOf('cursor-pointer') >= 0){
                    event.target.style.background = '#2e3f66';
                    event.target.style.color = '#cddffc';
                }else{
                    event.target.parentNode.style.background = '#2e3f66';
                    event.target.parentNode.style.color = '#cddffc';
                }
            }else if(flag==0){
                if(event.target.className.split(',').indexOf('cursor-pointer') >= 0){
                    event.target.style.background = '#001529';
                    event.target.style.color = '#95a1a8';
                }else{
                    event.target.parentNode.style.background = '#001529';
                    event.target.parentNode.style.color = '#95a1a8';
                }
            }
            
        }
    }
}
</script>

<style lang="less">
    // @import '../styles/menu.less';
    .menu{
        position: relative;
        color: #95a1a8;
        div.topList{
            height: 50px;
            line-height: 50px;
            font-size: 16px;
        }
         div.secendList{
            font-size: 14px;
        }
        .submenu{
            margin-left: 70px;
            position: absolute;
            left: 128px;
            top: 0;
            z-index: 9999;
            width: 200px;
            height: auto;
            background: #001529;
            display: none;
            cursor: pointer;
            .layout-text{
                font-size: 14px;
            }
        }
        .sub2menu{
            padding-left: 15px;
            box-sizing: border-box;
        }
        .cursor-pointer{
            cursor: pointer;
        }
    }
    .submenuTitle{
        display: inline-block;
        width: 90%;
        font-size: 20px!important;
        color: #fff;
    }
    .thirdmenu{
        display: inline-block;
        width: 90%;
    }
    .mainTitle{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    .inline-w100{
        display: inline-block;
        width: 100%;
    }
</style>