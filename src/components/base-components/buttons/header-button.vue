<template>
    <div class="button-box">
        <template v-for="item in headerButton.list">
            <Button :key="item.text" :disabled="item.disabled" :type="item.type?item.type:'primary'" @click="onHeaderButtonClick(item.value)">
                <Icon :type="item.icon"></Icon>
                {{ item.text }}
            </Button>
        </template>
        <Dropdown v-if="headerButton.showmore" @on-click="dropdownClick">
            <Button type="primary">
                更多
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" >
                <template v-for="item in headerButton.morelist">
                    <DropdownItem  :key="item.text" :name="item.value" >{{item.text}}</DropdownItem>
                </template>

            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<style lang="less" scoped>
    .button-box{
        display: inline-block;
    }
    .button-box button{
        margin-right: 8px;
    }
</style>


<script>
export default {
    name: "headerButton",
    props: ["headerButton"],
    created(){
        console.log(this.headerButtons)
    },
	methods: {
		onHeaderButtonClick(value){
            // debugger
			this.$emit("onHeaderButtonClick",value);
        },
        dropdownClick (value) {
            this.$emit("headerButtonClick",value);
        }
	}
}
</script>

