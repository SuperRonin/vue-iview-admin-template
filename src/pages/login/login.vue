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
import authorityJson from "../../mock/authority.json"
import Main from "../../components/main/main"
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
      // this.$router.addRoutes([
      //   {
      //     title: "一级iframe",
      //     icon: "ios-arrow-forward",
      //     name: "iframe",
      //     belongMenu: "PLAT20",
      //     isFrame: "1",
      //     url: "http:www.baidu.com",
      //     children: [
      //       {
      //         title: "一级iframe",
      //         name: "iframe1",
      //         icon: "edit"
      //       }
      //     ]
      //   }
      // ]);
      this.$store.commit("initSystem", authorityJson.systemList);

      this.$store.commit("initMainMenu", authorityJson.menuList);
      this.$store.commit("initMenu", {serverRouters: authorityJson.serverRouters,
      vm: this
      });
      this.$store.commit("initTag");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>
