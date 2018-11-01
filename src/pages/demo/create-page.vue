<template>
    <div class="container">
        <Row>
            <Col span="12">
                <div class="action" v-if="setOptions.setTitle">
                    <form>
                        <fieldset>
                            <legend>配置标题</legend>
                            标题名称：<Input type="text" style="width: 300px" v-model="fxoptions.title"/>
                        </fieldset>
                    </form>
                </div>
                <div class="action" v-if="setOptions.setPage">
                    <form>
                        <fieldset>
                            <legend>背景设置</legend>
                            <p>选择背景图片(图片尺寸为666*177像素)，大小不超过3M</p>
                            <Upload
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击此处上传或拖拽到此处</p>
                                </div>
                            </Upload>
                        </fieldset>
                    </form>
                </div>
                <div class="action" v-if="setOptions.setBtns">
                    <form>
                        <fieldset>
                            <legend>按钮设置</legend>
                            <p>正在开发~</p>
                        </fieldset>
                    </form>
                </div>
            </Col>
            <Col span="12">
                <div class="mobileshow">
                    <div class="title">
                        <div class="content">
                            <img src="@/assets/close.png" alt="">
                            <p class="titleTxt" id="titleTxt" @click="edit($event,'setTitle')">{{fxoptions.title || '中国公路客票网'}}</p>
                            <div class="more"></div>
                        </div>
                    </div>
                    <div class="page" id="page"  @click="edit($event,'setPage')">
                        <div class="contentlist">				
                            <ul class="btns" id="btns" @click="edit($event,'setBtns')">
                                <li><img src="../../../static/img/coach.png" alt="" /></li>
                                <li><img src="../../../static/img/trip.png" alt="" /></li>
                                <li><img src="../../../static/img/zby.png" alt="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  name: "createpage",
  data() {
    return {
      fxoptions: {
        title: "中国公路客票网"
      },
      setOptions: {
          setTitle: true,
          setPage: false,
          setBtns: false,
      },
      borderDom: ["titleTxt", "page", "btns"]
    };
  },
  methods: {
    edit(e,type) {
      this.removeAllBorder();
      e.stopPropagation();
      const that = this;
      for(let key in this.setOptions){
          that.setOptions[key] = false;
      }
      this.setOptions[type] = true;
      if (e.currentTarget.style.border) {
        e.currentTarget.style.border = "";
      } else {
        e.currentTarget.style.border = "1px dashed blue";
      }
    },
    removeAllBorder() {
      this.borderDom.forEach((o, i) => {
        const ele = document.getElementById(o);
        ele.style.border = "";
      });
    }
  }
};
</script>

<style scoped>
.mobileshow {
  position: relative;
  width: 370px;
  height: 680px;
  background: url("../../assets/bgiphone.png") no-repeat center;
  background-size: 100% 100%;
}
.action{
    padding-top: 30px;
    padding-left: 20px;
    font-size: 16px;
}
fieldset{
    padding: 10px 0 0 10px;
}
.title {
  width: 348px;
  padding-top: 88px;
  padding-left: 6%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 0;
  background-color: #efefef;
}
.content p {
  display: inline-block;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 5px;
}
.title img {
  width: 25px;
  height: 25px;
}
.page {
  width: 88%;
  height: 470px;
  background: url("../../../static/img/bg.jpg") no-repeat center;
  background-size: 100% 100%;
  margin-left: 6%;
}
img {
  display: inline-block;
  width: 100%;
  height: 50px;
}
.contentlist {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>

