<style lang="less">
    @import '../../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div class='mess'>
        <Row style="width:60%;">
            <Col>
                <div v-if="supplier!='false'"><Checkbox>供应商</Checkbox></div>
                <div class="searchlist"><Input style="width: 60%"/><Button>查询</Button></div>
                <Table border ref="selection" :columns="columns1" :data="data1"></Table>
            </Col>
        </Row> 
        <Row style="width:30%;" v-if="citychoose!='false'">
            <Col>
                <Checkbox>是否限制地区</Checkbox>  
                <Table border ref="selection" :columns="columns2" :data="data2" style="margin-top:40px"></Table>
            </Col>
        </Row>  
    </div>
</template>

<script>
export default {
        props: ['msgfromfa','supplier','citychoose'],
        name:'canchoosetable',
        data () {
            return {
                title:'',
                columns1: [
                    {
                        title: '机构编码',
                        key: 'name',
                        width:90,
                        align: 'center'
                    },
                    {
                        title: this.msgfromfa,
                        key: 'age'
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
                data1: [
                    {
                        age: 'John Brown',
                        name: 18,
                    },
                    {
                        age: 'Jim Green',
                        name: 24,
                    },
                    {
                        age: 'Joe Black',
                        name: 30,
                    },
                    {
                        age: 'Jon Snow',
                        name: 26,
                    }
                ],                
                columns2: [
                    {
                        title: '省份',
                        key: 'name'
                    },
                    {
                        type: 'selection',
                        align: 'center',
                        width: 60,
                    }
                ],
                data2: [
                    {
                        name: '河南',
                    },
                    {
                        name: '天津',
                    },
                    {
                        name: '北京',
                    },
                    {
                        name: '河北',
                    }
                ]
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        },
        
    }
</script>
<style>
.mess{
    display: flex;
    justify-content: space-around
}
.searchlist{
    margin: 20px 0
}
.searchlist button{margin-left: 10px}
</style>

