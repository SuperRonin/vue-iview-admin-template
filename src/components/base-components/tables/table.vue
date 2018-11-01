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
                    :border="table.border"
                    :size="table.size"
                    :highlight-row="table.highlight" 
                    :stripe="table.stripe"
                    :height="height"
                    :class="table.footeData.isHeader ? 'overscroll' : 'hidden'"
                    :columns="table.columns"
                    :data="table.data"
                    @on-select="selectRow"
                    @on-select-all="selectAllRow"
                    >
                    <div slot="footer">
                       <table>
                            <thead v-if="table.footeData.isHeader">
                                <tr>
                                    <td width="100px" style="text-align: center;background: #eee;" v-for="item in table.footeData.colums" :key="item.index">{{item}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="100px" style="text-align: center" v-for="item in table.footeData.data" :key="item.index">{{item}}</td>
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
    
        <Page :total="total" :show-sizer=table.showSizer :page-size="Number(pagesize)" show-total @on-page-size-change="onPageSize" @on-change="setInitPage" style="text-align:center;margin:30px 0"></Page>
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
            totalTableData: []
        };
    },
    created() {
       // 获取表格数据
       this.getTableData();
    },
    methods: {
        init (){
            const that = this;
            that.totalTableData = res;
            that.table.data = res.slice(0,that.pagesize);
            that.total = res.length;
            that.current = 1;
            const tableColumns = this.table.columns;
            tableColumns.forEach((o,i) => {
                // 操作按钮
                if(o.key == 'handle'){
                    o['render'] = (h, params) => {
                            return h('div', this.initButton(h,o,params));
                    }
                }
                // 序号
                if(o.type == "num"){
                    o["render"] =  (h, params) => {
                        return h('span', params.index + (that.current - 1) * that.pagesize + 1);
                    }
                }
                // 字典表
                if(o.wordbook instanceof Array){
                    o["render"] =  (h, params) => {
                        const type= params.row.type || 0;
                        return h('span', o.wordbook[type]);
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
                                debugger
                                this.ontableButtonClick(v.value,params)
                            }
                        }
                }, v.text))
            })
            return ButtonArr
        },
        getTableData(){
            if(this.table.urltype === "get" || this.table.urltype === "post"){
                const that = this;
                const urltype = this.table.urltype;
                that.$http[urltype](that.table.initUrl,{}).then((res) => {
                    that.init(res);
                })
                .catch(function(error) {
                    that.$Message.error(error.message);
                });
            }
             
            // that.$http.get(that.table.initUrl,{
            //     params:{}
            // }).then(function(res){
            //     that.totalTableData = res;
            //     that.table.data = res.slice(0,that.pagesize);
            //     that.total = res.length;
            //     that.current = 1;
            // })
            // .catch(function(error) {
            //     that.$Message.error(error.message);
            // }); 
        },
        setInitPage(index){
            let startdata = ( index - 1 ) * this.pagesize;
            let enddata = index * this.pagesize;
            debugger
            this.table.data = this.totalTableData.slice(startdata,enddata);
            this.current = index;
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
                console.log(params.row[o.value])
                tableEditModalForm.push({
						"label": o.title, //输入框前面的文字描述
						"type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
						"placeholder": `请输入${o.title}`, //框里面的默认提示性文字
						"width": "50px",
						"value": params.row[o.key],
						"fieldname": o.key //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
					})
            })
            console.log(tableEditModalForm)
            return tableEditModalForm
        },
        fullDataByurl(urltype,url,params) {
            debugger
            if(urltype === "get" || urltype === "post"){
                const that = this;
                const urltype = this.table.urltype;
                that.$http[urltype](url,{params: params}).then((res) => {
                    that.totalTableData = res;
                    that.table.data = res.slice(0,that.pagesize);
                    that.total = res.length;
                })
                .catch(function(error) {
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
            // return document.body.clientHeight - 338  //无统计
            
            return document.body.clientHeight - 360  //有统计
        }
    }
};
</script>

