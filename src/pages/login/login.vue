<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="title">
            <p>旅游出行企业平台</p>
            <p class="subtitle">Tourism travel enterprise platform</p>
        </div>
        <div class="login-con">
            <div class="form-con">
                <Form ref="loginForm" :model="form" >
                        <!-- <Input  class="usercode" @input="entering($event,'user')" v-model="form.distirbutorCode" placeholder="请输入机构编码"></Input> -->
                    <!-- <FormItem prop="userName"> -->
                        <!-- <Input :class="userAddColor ? 'addColor' : ''" class="username" @input="entering($event,'user')" v-model="form.userName" placeholder="请输入用户名"></Input> -->
                    <!-- </FormItem> -->
                    <!-- <FormItem prop="password"> -->
                        <!-- <Input :class="passwordAddColor ? 'addColor' : ''" class="password" @input="entering($event,'pass')" type="password" v-model="form.password" placeholder="请输入密码" style="margin-top:15px"></Input> -->
                    <!-- </FormItem>  -->
                    <!-- <FormItem>  -->
                        <div ref="noticetext" class="noticetext"></div>
                        <Button @click="handleSubmit" type="primary" long>{{loginTxt}}</Button>
                    <!-- </FormItem> -->
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginTxt: "开始访问",
      userAddColor: false,
      passwordAddColor: false,
      form: {
        distirbutorCode: "",
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      menulist: [],
      menusys: [],
      menuplat: []
    };
  },
  methods: {
    handleSubmit() {
      // this.$refs.loginForm.validate((valid) => {

      let that = this;
      // if(!that.form.distirbutorCode || !that.form.userName || !that.form.password){
      //     that.$refs.noticetext.innerHTML = '机构编码、用户名和密码都必填！';
      //     return;
      // }

      this.initMenu();

      // that.$store.commit('menusys',this.menusys);
      // localStorage.sys = JSON.stringify(this.menusys);
    },
    entering(event, type) {
      // #238ff7!important
      if (type == "user") {
        this.userAddColor = true;
        // var user = document.getElementsByClassName('username')[0];
        // user.style.color = '#fff';
        // this.$refs.username.$el.style.color = '#fff';
      } else {
        // this.$refs.password.$el.style.color = '#238ff7!important';
      }
    },
    initMenu() {
      this.$store.commit("initSystem", [
        { id: "10", text: "供应系统", name: "SYS10", orderNo: null },
        { id: "20", text: "分销系统", name: "SYS20", orderNo: null },
        { id: "30", text: "系统管理1", name: "SYS30", orderNo: null }
      ]);
      this.$store.commit("initMainMenu", [
        {
          id: "20",
          text: "旅游",
          name: "PLAT20",
          orderNo: 2,
          belongMenu: "SYS10"
        },
        {
          id: "30",
          text: "定制客运",
          name: "PLAT30",
          orderNo: 3,
          belongMenu: "SYS10"
        }
      ]);
      this.$store.commit("initMenu", [
        {
          title: "组件",
          icon: "ios-pricetag-outline",
          name: "mainPage",
          belongMenu: "PLAT20",
          children: [
            {
              title: "button组件",
              name: "buttonPage",
              icon: "edit"
            },
            {
              title: "filter组件",
              name: "filterPage",
              icon: "edit"
            },
            {
              title: "table组件",
              name: "tablePage",
              icon: "edit"
            }
          ]
        },
        {
          title: "组件2",
          icon: "ios-pricetag-outline",
          name: "createpage",
          belongMenu: "PLAT30",
          children: [
            {
              title: "可视化页面1",
              name: "createpageDemo1",
              icon: "edit"
            }
          ]
        },
        {
          name: "backrule", //三级菜单
          title: "三级左侧菜单",
          belongMenu: "PLAT30",
          children: [
            {
              name: "backrule-first",
              title: "门票",
              belongMenu: "othermenu",
              subChildren: [
                {
                  title: "用户",
                  name: "thirdroute-page",
                  icon: "edit",
                  belongMenu: "othermenu"
                },
                {
                  title: "订票",
                  name: "thirdroute-page1",
                  icon: "edit",
                  belongMenu: "othermenu"
                },
                {
                  title: "订单列表",
                  name: "thirdroute-page2",
                  icon: "edit",
                  belongMenu: "othermenu"
                }
              ]
            },
            {
              name: "add",
              title: "定制客运",
              belongMenu: "othermenu",
              subChildren: [
                {
                  title: "用户",
                  name: "add",
                  icon: "edit",
                  belongMenu: "othermenu"
                },
                {
                  title: "订票",
                  name: "add1",
                  icon: "edit",
                  belongMenu: "othermenu"
                },
                {
                  title: "订单列表",
                  name: "add2",
                  icon: "edit",
                  belongMenu: "othermenu"
                }
              ]
            }
          ]
        }
      ]);
      this.$store.commit("initTag");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>
