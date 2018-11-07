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
    name: "trip",
    data () {
        return {
			titleOptions: {
                text: '标题',
                isicon: true,
                imgname: 'ionic',
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
				itemlist:[			//筛选条件
                    {
                        "label": "名称", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入名称", //框里面的默认提示性文字
                        "value": "",
                        "width": "50px",
                        "fieldname": "name" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                    },
                    		//筛选条件
                    {
                        "label": "年龄", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入名称", //框里面的默认提示性文字
                        "value": "",
                        "fieldname": "age" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                    },
					{
                        "label": "地址",
                        "type": "select",
                        "placeholder": "请选择地址",
                        "options": [ //下拉选项
                            // {
                            //     value: 'beijing',
                            //     label: '北京'
                            // }
                        ],
                        "labelInvalue": true,
                        "filterable": true, //开启搜索模式
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "address",
                        "url": "/public/test/address1.json",
                        "urltype": 'get',
                    },
                    {
                        "label": "地址2",
                        "type": "select",
                        "placeholder": "请选择地址",
                        "options": [ //下拉选项
                            
                        ],
                        "labelInvalue": true,
                        "filterable": true, //是否支持搜索
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "address2",
                        "url": "/public/test/address2.json",
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
						title: '姓名',
						align: 'center',
						key: 'name',
					},
					{
						title: '性别',
						align: 'center',
						key: 'sex'
					},
					{
						title: '岗位1',
						align: 'center',
                        key: 'work',
                        wordbook: ['前端开发','java']
					},
					{
						title: '开关',
						align: 'center',
                        key: 'switch',
                        switch : true
					},
					{
						title: '操作',
						align: 'center',
						key: 'handle',
						handle: [{text: '编辑',type: 'primary',value: 'edit'},{text: '删除',type: 'error',value: 'delete'}]
					}
                ],
                initUrl: "/public/test/table.json",
                urltype: 'get',
                data: [],
                footeData: {
                    isHeader:false,
                    colums: ["类型","汽车票","火车票","门票","周边游"],
                    data: ["售票量","3421","223","312","42"]
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
                this.$router.push({ name: 'createpage'});  
				// this.$refs.createmodal.Show()
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
            if(name === 'search'){
                this.$refs.tablelist.fullDataByurl("get","/public/test/table.json",val);
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
.fl{
    float: left;
}
.fr{
    float: right;
}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}
.titlestyle{
	color: #000;
	font-size: 16px;
}
</style>


