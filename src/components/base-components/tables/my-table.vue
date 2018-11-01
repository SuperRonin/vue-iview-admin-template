<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        点击搜索进行搜索
                    </p>
                    <Row style="margin-bottom:10px">
                        <div class="item">
                            <span>姓名</span>
                            <Input v-model="searchConName" placeholder="请输入姓名搜搜..." style="width: 150px" />
                        </div>
                        <div class="item">
                            <span>性别</span>
                             <Select v-model="searchConSex" style="width:150px">
                                <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        <!-- <Input v-model="searchConSex" placeholder="请输入性别搜搜..." style="width: 150px" /> -->
                        </div>
                        <div class="item"><span>岗位</span><Input v-model="searchConSet" placeholder="请输入岗位搜搜..." style="width: 150px" /></div>
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                    </Row>
                    <Row :gutter="10">
                        <Col span="24">
                            <div class="edittable-table-height-con">
                               <Table :columns="editInlineAndCellColumn" :data="page_video_list"></Table>
                            </div>
                        </Col>
                        <Modal
                            v-model="modal1" 
                            title="编辑页"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <p class="editlist"><span>姓名</span><Input style="width: 80%;" :value='mess.name' class='editname'/></p>
                            <p class="editlist"><span>性别</span><Input style="width: 80%;" :value='mess.sex' class='editsex'/></p>
                            <p class="editlist"><span>岗位</span><Input style="width: 80%;" :value='mess.work' class='editwork'/></p>
                            <!-- <p class="editlist"><iframe src="http://www.baidu.com" frameborder="0"></iframe></p> -->
                        </Modal>
                    </Row>
                </Card>
            </Col> 
        </Row>
    
        <Page :total="total" :page-size="pagesize" show-total @on-change="setInitPage" style="text-align:center;margin:30px 0"></Page>
    </div>
</template>
<style scoped>
    .item{
        display: inline;
        margin-right:10px;  
    }
    .item span{
        margin-right:5px;
    }

    .editlist{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 5px;
    }
    .editlist span{display: inline-block;margin-right: 20px}
</style>
<script>
import tableData from './components/table_data.js';
export default {
    name: 'editable-table1',
    data () {
        return {
            editInlineAndCellColumn: [],
            editInlineAndCellData:[],
            ajaxHistoryData:[],
            ajaxData:[],
            page_video_list:[],
            total:0,
            pagesize:5,
            searchConName:'',
            searchConSex:'',
            searchConSet:'',
            sexList:[
                {value: '',label: '不限'},
                {value: '男',label: '男'},
                {value: '女',label: '女' },
            ],
            modal1:false,
            mess:{
                'name':'',
                'sex':'',
                'work':''
            },
            index:''
        };
    },
    methods: {
        handleListApproveHistory(){
            this.editInlineAndCellColumn = [
                    {
                        type: 'selection',
                        width: 80,
                    },
                    {
                        title: '序号',
                        // type: 'index',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.current - 1) * this.pagesize + 1);
                        }
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'name',
                        width: 300,
                        editable: true
                    },
                    {
                        title: '性别',
                        align: 'center',
                        key: 'sex'
                    },
                    {
                        title: '岗位',
                        align: 'center',
                        width: 300,
                        key: 'work',
                        editable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ];
            this.editInlineAndCellData = tableData.editInlineAndCellData;
            this.total = this.editInlineAndCellData.length;
            // 保存取到的所有数据
            this.ajaxHistoryData = this.editInlineAndCellData
            if(this.editInlineAndCellData.length < this.pagesize){
                this.page_video_list = this.ajaxHistoryData;
            }else{
                this.page_video_list = this.ajaxHistoryData.slice(0,this.pagesize);
            }    
            this.current = 1;
        },
        setInitPage(index){
            var startdata = ( index - 1 ) * this.pagesize;
            var enddata = index * this.pagesize;
            this.page_video_list = this.ajaxHistoryData.slice(startdata,enddata);
            this.current = index;
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch () {
            this.page_video_list = tableData.editInlineAndCellData;
            var sourceData =[];
            sourceData = this.search(this.page_video_list, {name: this.searchConName,sex: this.searchConSex,work: this.searchConSet});
            this.ajaxHistoryData = sourceData; 
            this.total = sourceData.length;
            if(this.ajaxHistoryData.length < this.pagesize){
                this.page_video_list = this.ajaxHistoryData;
            }else{
                this.page_video_list = this.ajaxHistoryData.slice(0,this.pagesize);
            } 
            this.current = 1;
        },
        show (index) {
            this.mess = {}
            this.mess.name = this.editInlineAndCellData[index].name;
            this.mess.sex = this.editInlineAndCellData[index].sex;
            this.mess.work = this.editInlineAndCellData[index].work;
            this.modal1 = true;
            this.index = index;
        },
        remove (index) {
              this.$Modal.confirm({
                    title: 'User Info',
                    content: '您确定要删除这条数据吗',
                    onOk: () => {
                        this.editInlineAndCellData.splice(index, 1);
                        this.handleListApproveHistory();
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });   
        },
        ok () {
            var name = document.querySelector('.editname input').value;
            var sex = document.querySelector('.editsex input').value;
            var work = document.querySelector('.editwork input').value
            this.editInlineAndCellData[this.index].name = name;
            this.editInlineAndCellData[this.index].sex = sex;
            this.editInlineAndCellData[this.index].work = work;
            this.handleListApproveHistory();
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    },
    created () {
        this.handleListApproveHistory()
    }
};
</script>

