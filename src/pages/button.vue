<template>
    <div class="container">
        <h1>button组件</h1>
        <!-- <header-button :headerButton= headerButton></header-button> -->
        <header-btn :headerButton = headerButton></header-btn>
    </div>
</template>

<script>
import headerBtn from "../components/base-components/buttons/header-button"
export default {
    name: "buttonPage",
    components: { headerBtn },
    data(){
        return {
			titleOptions: {
                text: '标题',
                isicon: true,
			},
            headerButton:{
				list: [ 
				{
					text: "新建",
                    value:"create",
                    icon: 'plus'
				},
				{
					text: "编辑",
					value:"edit"
				},
				{
					text: "移除",
					value:"remove",
					disabled:true
				},
				{
					text: "导出",
					value:"export"
				}
                ],
                showmore: true,
                morelist: [
                    {
                        text: "导出txt",
                        value:"new1"
                    },
                    {
                        text: "导出excel",
                        value:"new2"
                    },
                    {
                        text: "导出word",
                        value:"new3",
                        disabled:true
                    },
                    {
                        text: "导出table",
                        value:"new4"
                    }
                ]
			}
        }
    }
}
</script>

<style>
h1{
    font-size: 40px;
    text-align: center;
    margin-top: 250px;
}
</style>

