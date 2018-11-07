<template>
    <div class="padding-top-10">
        <Icon v-if="titleOptions.isicon" :type="titleOptions.imgname"></Icon>
        <Icon type="ionic"></Icon>
        <img v-if="!titleOptions.isicon" :width="titleOptions.width" :src="imgsrc"/>
        <span class="default">{{titleOptions.text}}</span>
    </div>
</template>

<style lang="less" scoped>
    .default{
        color: #000;
    }
    .padding-top-10{
        display: inline-block;
        padding-top: 10px;
    }
    img{
        vertical-align: middle;
    }
</style>


<script>
export default {
    props: ['titleOptions'],
    data () {
        return {
            imgsrc: ''
        }
    },
    created () {
        // if(this.imgsrc) return
        // const that = this;
        // import(`../../images/${this.titleOptions.imgname}`)
        //     .then((img) => {
        //         that.imgsrc = img
        //     })
    }
}
</script>

