<template>
    <div class="layout">
        <Layout>
            <!-- 左侧菜单 -->
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="logo-con" :class="logoCon">
                        <p>出行企业平台</p>
                    </div>
                    
                <leftmenu :menulist = menulist></leftmenu>
            </Sider>
            <Layout>
                <!-- 头部 -->
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" class="zhedie" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <topmenu :MainMenuList = MainMenuList></topmenu>
                    <user style="float:right;display: inline-block;padding-right: 20px"></user>
                    <div class="user-dropdown-list-con" v-if="systemList.length > 0">
                        <Row type="flex" justify="center" align="middle" class="user-dropdown-listcon">
                            <Dropdown transfer trigger="click" @on-click="onchangeSystem" >
                                <a href="javascript:void(0)">
                                    <span class="main-switch"></span>
                                    <span class="main-switch-text">{{seletedSystem.text}}</span>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem :name="item.name" v-for="item in systemList" :key="item.text">{{item.text || ""}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </Header>
                <div class="tags-con">
                    <tags-page-opened :shrink=true></tags-page-opened>
                </div>
                <!-- 内容 -->
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <div class="tag-nav-wrapper">
                        <!-- <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/> -->
                    </div>
                    <keep-alive>
                        <router-view v-show="!iframeObj.showIframe"/>
                    </keep-alive>
                    <div v-show="iframeObj.showIframe" class="iframe-content">
                        <div v-for="item in iframeObj.iframeList" :key="item.name">    
                            <iframe v-show="item.name == currentPageName" style="width:100%;height:800px;" :id="item.name" :ref="item.name" :src="item.url"  frameborder="0"></iframe>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Main from "@/components/main/main";
import user from "../user/user";
import leftmenu from "../main/leftmenu/menu-hover";
import topmenu from "../main/topmenu/topmenu";
import tagsPageOpened from "./tags-page-opened.vue";
import busBtn from "../../pages/button";
import busFilter from "../../pages/filter";
import busTable from "../../pages/table";
import {
  setMainMenuListTolocalStorage,
  getMainMenuListFromlocalStorage
} from "@/assets/util";

export default {
  name: "mainPage",
  data() {
    return {
      isCollapsed: false,
      seletedSystem: {},
      currentPageName: ""
    };
  },
  components: { user, leftmenu, topmenu, busBtn, busTable, tagsPageOpened },
  mounted() {
    this.$store.commit("initSystem", []);
    this.$store.commit("initMainMenu", []);
    // this.$store.commit("initMenu", {serverRouters: [], vm: this});
    this.$store.commit("initTag", []);
    console.log(this.$store.state.app.systemList);
    this.seletedSystem = this.$store.state.app.systemList[0];
  },
  computed: {
    systemList() {
      return this.$store.state.app.systemList;
    },
    MainMenuList() {
      return this.$store.state.app.mainMenuList;
    },
    menulist() {
      return this.$store.state.app.menulist;
    },
    iframeObj() {
      return this.$store.state.app.iframeObj
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    logoCon() {
      return this.isCollapsed ? "hide-logo-con" : "";
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    onchangeSystem(name) {
      this.seletedSystem = this.getFiterSystem(name);
      this.$store.commit("setMainMenu", this.seletedSystem);
      this.$store.commit("setMenu", this.$store.state.app.mainMenuList.length == 0 ? "" : this.$store.state.app.mainMenuList[0].name);
    },
    getFiterSystem(name) {
      let obj = {};
      this.systemList.forEach(o => {
        if (o.name == name) {
          obj = o;
          return;
        }
      });
      return obj;
    }
  },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            // this.$nextTick(() => {
            //     this.refsTag.forEach((item, index) => {
            //         if (to.name === item.name) {
            //             let tag = this.refsTag[index].$el;
            //             this.moveToView(tag);
            //         }
            //     });
            // });
            // this.tagsCount = this.tagsList.length;

            // return this.$store.state.app.tagList
        }
    }
};
</script>

<style scoped>
@import "./css/main.css";
</style>

