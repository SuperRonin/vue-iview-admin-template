<template>
    <div  v-cont-resize class="container">
       <Row>
            <Col span="24">
                <Card v-cont-resize>
                     <Row slot="title" class="clearfix">
						<titleTxt class="fl" :titleOptions="titleOptions"></titleTxt>
                        <headerButton class="fr" @onHeaderButtonClick="onHeaderButtonClick" :headerButton="headerButton"></headerButton>
                     </Row>
                     <filters
                        ref="filters"
                        :filter="filter" 
                        @onFilterMenuClick="onFilterMenuClick"
                        @onSelectQueryChange="onSelectQueryChange"
                        @onSelectClear="onSelectClear"
                        @onSelectChange="onSelectChange"
                        @onInputChange = "onInputChange"
                        @getFilterFormData = "getFilterFormData"
                     ></filters>
                     
                     <!-- 表格编辑弹出框 -->
                     <tablemodal
                        ref="tableEditModal"
                        @onTableModalOk = "onTableModalOk"
                     ></tablemodal>

                     <!-- 新建按钮弹出框 -->
					 <createmodal
                        ref="createmodal"
                        @onCreateModalOk = "onCreateModalOk"
                        >
                     </createmodal>

                    <!-- 表格 -->
                     <tableList 
                        ref = "tablelist"
                        :pagesize = 5
                        :table="table"
                        @onSelectRow = "onSelectRow"
                        @ontableButtonClick = "ontableButtonClick"
                        @onswitchChange = "onswitchChange"
                        @getRowData = "getRowData"
                        @getCurrentRowData = "getCurrentRowData"
                        @getSelectedAllData = "getSelectedAllData"
                     >
                     </tableList>
                </Card>
            </Col> 
        </Row>
    </div> 
</template>

<script>
import headerButton from "../components/base-components/buttons/header-button.vue"
import filters from "../components/base-components/form/filters.vue"
import tableList from "../components/base-components/tables/table.vue"
import createmodal from "./trip-create-modal.vue"
import tablemodal from "./trip-table-modal.vue"
import titleTxt from "../components/base-components/title.vue"

export default {
    name: "MENU9901031133",
    data () {
        return {
			titleOptions: {
                text: '标题',
                isicon: true,
			},
            headerButton:{
				list: [ 
				{
					text: "新建",
                    name:"create",
                    icon: 'plus'
				},
				{
					text: "编辑",
					value:"edit"
				},
				{
					text: "移除",
					value:"remove",
					//disabled:true
				},
				{
					text: "开启监控",
					value:"monitorswitch"
                },
                {
					text: "关闭监控",
					value:"monitorswitch"
                },
                {
					text: "充值",
					value:"recharge"
                },
                {
					text: "调整账户余额",
					value:"recharge"
                }
                ,
                {
					text: "账户余额明细",
					value:"accountDetail"
				}
                ]
			},
			//过滤项
            filter:	{
				rule:{
					name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    place: [
                        { required: true, message: '请选择场所', trigger: 'blur' }
                    ]
                },
                multiColum:2,
				itemlist:[	
                    {
                        "label": "账户",
                        "type": "select",
                        "placeholder": "请选择账户",
                        "filterable": true, //开启搜索模式
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "account",
                        "options": [ //下拉选项
                            
                        ],
                        "url": "/queryAllAccount",
                        "urltype": 'get',
                    },		//筛选条件
                    {
                        "label": "机构ID", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入机构ID", //框里面的默认提示性文字
                        "value": "",
                        "width": "50px",
                        "fieldname": "distributorCode" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                    },
                    		//筛选条件
                    {
                        "label": "机构名称", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入机构名称", //框里面的默认提示性文字
                        "value": "",
                        "fieldname": "distributorName" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                    },
					{
                        "label": "状态",
                        "type": "select",
                        "placeholder": "请选择状态",
                        "options": [ //下拉选项
                             {
                                 key: '',
                                 text: '全部'
                             },
                             {
                                 key: '1',
                                 text: '开启'
                             },
                             {
                                 key: '0',
                                 text: '关闭'
                             }
                        ],
                        "filterable": true, //开启搜索模式
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "status",
                        "urltype": 'get',
                    }
                ],
                menuButton: {
                    searchButton: true,
                    exportButton: true,
                    exportButtonItemlist: [
                        {
                            text: 'excel',
                            value: 'excel'
                        },
                        {
                            text: 'word',
                            value: 'word'
                        }
                    ]
                }
            },
			//表格
			table:{
                border: true,
                size: "small",
                showSizer: true, //可切换每页显示的数量
				columns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
					{
						title: '序号',
						type: 'num',
						width: 80,
                        align: 'center'
					},
					{
						title: '预付款账户',
						align: 'center',
						key: 'account',
					},
					{
						title: '状态',
						align: 'center',
						key: 'status',
                        wordbook: ['开启','关闭']
                    },
                    {
						title: '账户余额',
						align: 'center',
						key: 'accountbalance'
					}
                ],
                initUrl: "/listDistributorAccount?isAll=true",
                urltype: 'get',
                // params: {},
                data: [],
                footeData: {
                    //isHeader:false,
                    //colums: ["类型","汽车票","火车票","门票","周边游"],
                    //data: ["售票量","3421","223","312","42"]
                }
			}
        }
    },
    created(){

    },
	methods: {
        /**
         * @description 顶部按钮点击
         */
		onHeaderButtonClick (name){
            this.$Notice.open({
                title: '发生了点击事件',
                desc: `当前点击的按钮是"${name}"`
            });
			if (name=="create")
			{   
                //this.$router.push({ name: 'createpage'});  
				 this.$refs.createmodal.Show()
			}
			if (name=="edit"){
				this.headerButton.list[2].disabled=!this.headerButton.list[2].disabled
			}
        },
        /**
         * 获取表单数据
         */
        getFilterFormData(val)  {
            console.log(val)
        },
        /**
         * @description 搜索条件按钮点击
         * @param {String} name 按钮别名
         * @param {Object} val 表单数据  {name: '张三,address: 'beijing'}
         */
        onFilterMenuClick (name,val) {
            debugger
            if(name === 'search'){
                this.$refs.tablelist.fullDataByurl("get","/listDistributorAccount?isAll=true",val.filterFormData);
            }
            this.$Notice.open({
                title: '发生了查询事件',
                desc: `触发的按钮是"${name}",获取到的form数据为${JSON.stringify(val)}`
            });
        },
        /**
         * @description 输入框失去焦点并且值发生了变化,会触发此事件
         */
        onInputChange(name){
            debugger
            this.$Notice.open({
                title: '发生了失去焦点事件',
                desc: `失去焦点的输入框是"${name}"`
            });
            // 发起网络请求
            if (name=="name"){
                this.$refs.filters.fullDataByurl("get","/public/test/mock.json","address");
            }
        },
        /**
         * @description 选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性
         * @returns {String} value
         * @returns {Obkect} value
         */
        onSelectChange(name,val) {
            console.log(val)
        },
        /**
         * @description 搜索词改变时触发
         * @returns {String} query
         */
        onSelectQueryChange(name,val) {
            console.log(val)
        },
        /**
         * @description 点击清空按钮时触发
         * @returns 
         */
        onSelectClear(name) {
            
        },
        /**
         * 新建按钮弹窗确认
         */
        onCreateModalOk (val) {
            this.$Notice.open({
                title: '新建按钮弹窗确认操作',
                desc: `得到的数据为${JSON.stringify(val)}`
            });
        },
        /**
         * 表格按钮弹窗确认
         */
        onTableModalOk (val){

        },
        /**
         * @description 表格选中行
         * @param {Object} allselect    选中行数据集
         * @param {Object} curselect    当前选中行数据
         */
        onSelectRow(allselect,curselect) {
            this.$Notice.open({
                title: '选中了一行',
                desc: `选中的所有数据为"${JSON.stringify(allselect)}"       
                            当前行的数据为${JSON.stringify(curselect)}`
            });
        },
        /**
         * @description 表格中按钮点击事件
         * @param {String} name     当前按钮类型
         * @param {Object} val    当前行的数据
         */
        ontableButtonClick (name,val) {
            if(name == 'edit'){
                this.$refs.tableEditModal.tableEditModalForm.form.itemlist = val;
                // 显示编辑弹框
                this.$refs.tableEditModal.Show()
            }else if(name == 'delete'){
                this.$Notice.open({
                    title: '删除操作',
                });
            }
        },
        /**
         * @desc 表格switch按钮开关切换
         * @param {Boolean} status 按钮状态
         * @param {Object} params   当前行数据
         */
        onswitchChange(status,params) {
            this.$Notice.open({
                title: '表格switch开关',
                desc: `当前状态"${status}"       
                            当前行的数据为${JSON.stringify(params)}`
            });
        },
        getRowData(){},
        getCurrentRowData(){},
        getSelectedAllData(){},

	},
    components: { filters, tableList, headerButton,createmodal, titleTxt, tablemodal }
}
</script>

<style lang="less">
.titlestyle{
	color: #000;
	font-size: 16px;
}
</style>


