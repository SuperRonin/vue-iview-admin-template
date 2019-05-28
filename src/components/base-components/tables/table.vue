<style lang="less">
    // @import '../../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
         <!-- v-contbtm-resize="60" -->
        <Row class="margin-top-10">
            <Col span="24">
                <div>
                    <Table
                    v-if="tableData.border"
                    :border="tableData.border"
                    :size="tableData.size"
                    :highlight-row="tableData.highlight" 
                    :stripe="tableData.stripe"
                    :height="height"
                    :class="tableData.footeData.isHeader ? 'overscroll' : 'hidden'"
                    :columns="tableData.columns"
                    :data="tableData.data"
                    @on-select="selectRow"
                    @on-select-all="selectAllRow"
                    @on-select-cancel="onSelectCancel"
                    >
                    <div slot="footer">
                       <table>
                            <thead v-if="tableData.footeData.isHeader">
                                <tr>
                                    <td width="100px" style="text-align: center;background: #eee;" v-for="item in tableData.footeData.colums" :key="item.index">{{item}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="100px" style="text-align: center" v-for="item in tableData.footeData.data" :key="item.index">{{item}}</td>
                                    <!-- <td width="60px" style="text-align: center">总计</td>
                                    <td width="78px" style="text-align: center">123</td>
                                    <td width="265px" style="text-align: center">456</td>
                                    <td width="265px" style="text-align: center">789</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </Table>
                    <!-- <Table></Table> -->
                </div>
            </Col>
        </Row>
    
        <Page :total="total" ref="pages" :loading="loading" :show-sizer=tableData.showSizer :page-size="Number(pagesize)" show-total @on-page-size-change="onPageSize" @on-change="setInitPage" style="text-align:center;margin:30px 0"></Page>
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
import $http from "@/assets/http"
export default {
    name: 'editable-table1',
    props: ['table'],
    data () {
        return {
            allSeletedRowData: '',//当前选中的行数据集
            currentRowData: '',//当前选中行数据
            current: 0,
            pagesize: 10,
            total: 0,
            totalTableData: [],
            tableData: {},
            wordbook:['关闭','开启'],
            loading: true
        };
    },
    mounted() {
       // 获取表格数据
       this.getTableData(1);
       console.log(this.table)
    },
    methods: {
        init (res){
            const that = this;
            that.table.data = res.data.list;
            that.total = res.data.total;
            let tableColumns = that.table.columns;
            that.table.data.forEach((o,i) => {
                o.status = that.wordbook[o.status || 0];
            })
            tableColumns.forEach((o,i) => {
                // 序号
                if(o.type == "num"){
                    o["render"] =  (h, params) => {
                        
                        return h('span', params.index + that.current * that.pagesize + 1);
                        // return h('span', 1);
                    }
                }
               // 字典表
                // if(o.wordbook instanceof Array){
                //     o["render"] =  (h, params) => {
                //         return h('span', o.wordbook[Number(that.table.data[i].status)]);
                //     }
                // }
                // 操作按钮
                if(o.key == 'handle'){
                    o['render'] = (h, params) => {
                            return h('div', that.initButton(h,o,params));
                    }
                }
                
                // switch开关
                if(o.switch){
                    o["render"] = (h, params) => {
                            return h('i-switch', {
                                props: {
                                    value: params.row.status == 'open',
                                    size:"large"
                                },
                                on: {
                                    'on-change': (status) =>{
                                        this.onswitchChange(status,params);
                                    }
                                }            
                             },[
                                h('span', {
                                    slot: 'open',
                                    domProps:{ innerHTML: '启用'} 
                                }),
                                h('span', {
                                    slot: 'close',
                                    domProps:{innerHTML: '停用'} 
                                })
                             ]);
                        }
                }
            })
            this.table.columns = tableColumns;
           this.tableData = this.table;
        },
        initButton(h,o,params){
            let ButtonArr = [];
            o.handle.forEach((v,j) => {
                ButtonArr.push(
                    h('Button', {
                        props: {
                            type: v.type || '',
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.ontableButtonClick(v.value,params)
                            }
                        }
                }, v.text))
            })
            return ButtonArr
        },
        getTableData(index){
            this.loading = true;
            if(this.table.urltype === "get" || this.table.urltype === "post"){
                const that = this;
                const urltype = this.table.urltype;
                const data = {
                    pageNo: index,
                    pageSize: that.pagesize
                }
                that.$http[urltype](that.table.initUrl,{params: data}).then((res) => {
                    if(res.code == "0000"){
                        that.loading = false;
                        that.current = 0;
                        that.init(res);
                    }
                })
                .catch(function(error) {
                    that.loading = false;
                    that.$Message.error(error.message);
                });
            }
        },
        setInitPage(index){
        //     let startdata = ( index - 1 ) * this.pagesize;
        //     let enddata = index * this.pagesize;
        //     debugger
        //     this.table.data = this.totalTableData.slice(startdata,enddata);
            this.current = index - 1;
            this.$emit("onpageSize",{page: index});
        },
        /**
         * @description 获取某一行数据
         * @param {Number} row
         */
        getRowData(row){
            return this.table.data[row]
        },
        /**
         * @description 返回当前选择行json
         */
        getCurrentRowData(type){
            return this.currentRowData
        },
        
        /**
         * @description 返回所有已选择行数据集
         */
        getSelectedAllData(){
            return this.allSeletedRowData
        },
        /**
         * @description 表格选中某行
         * @param {Object,Object}
         */
        selectRow(selection,row) {

            this.currentRowData = row;
            this.allSeletedRowData = selection;
            this.$emit("onSelectRow",this.allSeletedRowData,this.currentRowData);
        },
        
        /**
         * @description 表格全选
         */
        selectAllRow(selection) {
            this.allSeletedRowData = selection;
            this.$emit("onSelectRow",this.allSeletedRowData);
        },
        onSelectCancel(selection,row){
            this.allSeletedRowData = selection;
        },
        /**
         * @description 表格功能按钮点击
         * @param {String} type 当前按钮类型
         * @param {Object} value    当前按钮返回的表单itemlist
         */
        ontableButtonClick(type,params){
            const tableEditFormList = this.makeTableEditFormData(params);
            this.$emit("ontableButtonClick",type,tableEditFormList);
            // this.randomButtonClick(type,params);
        },
        randomButtonClick(type,params){
            
        },
        /**
         * @description 编辑按钮点击
         * @param {Object} params    当前按钮返回的表单itemlist
         */
        edit (params) {
            const tableEditFormList = this.makeTableEditFormData(params);
            this.$emit("ontableButtonClick",'edit',tableEditFormList);
        },
        /**
         * @description 删除按钮点击
         * @param {Object} params    当前列的数据
         */
        remove (params) {
            this.$Modal.confirm({
                title: '',
                content: '您确定要删除这条数据吗',
                onOk: () => {
                    this.$emit("ontableButtonClick", 'delete' ,params);
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            })
        },
        /**
         * @description 生成modal组件所需的form表单数据
         */
        makeTableEditFormData(params){
            let tableEditModalForm = [];
            let tablecolumns = this.table.columns;
                  tablecolumns = tablecolumns.slice(2,tablecolumns.length-1);
            tablecolumns.forEach((o,i) => {
                tableEditModalForm.push({
						"label": o.title, //输入框前面的文字描述
						"type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
						"placeholder": `请输入${o.title}`, //框里面的默认提示性文字
						"width": "50px",
						"value": params.row[o.key],
						"fieldname": o.key //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
					})
            })
            return tableEditModalForm
        },
        fullDataByurl(urltype,url,params) {
            this.loading = true;
            if(urltype === "get" || urltype === "post"){
                const that = this;
                const urltype = this.table.urltype;
                params["pageNo"] = params["pageNo"] || 1;
                params["pageSize"] = this.pagesize;
                debugger
                this.$refs['pages'].currentPage = params["pageNo"] || 1;
                that.$http[urltype](url,{params: params}).then((res) => {
                    if(res.code == "0000"){
                        that.loading = false;
                        that.init(res);
                    }
                })
                .catch(function(error) {
                    that.loading = false;
                    that.$Message.error(error.message);
                });
            }
        },
        onswitchChange(status,params){
            this.$emit("onswitchChange",status,params);
        },
        onPageSize(pagesize){
            this.pagesize = pagesize;
            this.setInitPage(1);
        }
    },
    computed: {
        height () {
            return document.body.clientHeight - 360  //有统计
        }
    }
};
</script>

