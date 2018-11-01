<template>
    <div class="topmenu">
        <i-menu mode="horizontal" @on-select="menuclick"  active-name="car" style="display: inline-block;margin-left: 60px;padding-top: 5px">
            <template v-for="item in MainMenuList">
                <menu-item :name="item.name" :key="item.text">{{ item.text }}</menu-item>
            </template>
        </i-menu>
    </div>
</template>
<script>

export default {
    name: "topmenu",
    props: ["MainMenuList"],
    data (){
        return {
        }
    },
    created(){
        console.log(this.MainMenuList)
    },
    methods: {
        menuclick (name){
            this.$store.commit("setMenu",name)
        }
    }
}
</script>

<style scoped>
    .topmenu{
        display: inline-block;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        background: #fff!important;
    }
</style>
