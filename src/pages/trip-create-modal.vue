<template>
    <modal 
	:modalForm="createModalForm" 
	ref="basemodal" 
	@onCance="onCance" 
	@onSure="onSure"
    @onInputChange = "onInputChange"
	>
    </modal>
</template> 

<script>
import modal from "@/components/base-components/form/modalform.vue"
export default {
	name: "trip-create-modal",
	props: [],
    data () {
        return {
            //新建按钮弹出框
            createModalForm: {
                title: '新建按钮弹出框',
                leftText: '显示',
                rightText: '隐藏',
                form: {
                    multiColum: true,//单列还是多列
                    itemlist: [ //界面
                        {
                            "label": "名称", //输入框前面的文字描述
                            "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                            "placeholder": "请输入名称", //框里面的默认提示性文字
                            "width": "50px",
                            "value": "",
                            "fieldname": "name" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        },
                        {
                            "label": "名称1", //输入框前面的文字描述
                            "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                            "placeholder": "aa请输入名称", //框里面的默认提示性文字
                            "width": "50px",
                            "value": "",
                            "fieldname": "name1" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        },
                        {
                            "label": "名称2", //输入框前面的文字描述
                            "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                            "placeholder": "请输入名称", //框里面的默认提示性文字
                            "width": "50px",
                            "value": "",
                            "fieldname": "name2" //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        },
                        {
                            "label": "地址",
                            "type": "select",
                            "placeholder": "请选择地址",
                            "options": [ //下拉选项
                                
                            ],
                            "filterable": true, //是否开启autocomplete
                            "multiple": false, //是否是多选条件
                            "value": "",
                            "fieldname": "address",
                            "url": "/public/test/address1.json",
                            "urltype": 'get',
                        }
                    ]
                },
                rule:{
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    name2: [
                        { required: true, message: '请选择场所', trigger: 'blur' }
                    ]
                },
            },
		}
    },
    created(){
       
    },
	methods: {
       Show(){
			this.$refs.basemodal.Show()
	   },
	   onCance() {
		   alert('close')
	   },
	   onSure(formData) {
		   alert('sure')
		   console.log(formData)
		   this.$emit("onCreateModalOk",formData)
       },
       onInputChange(name){
           this.$Notice.open({
                title: '发生了失去焦点事件',
                desc: `失去焦点的输入框是"${name}"`
            });
            // 发起网络请求
            if (name=="name"){
                this.$refs.basemodal.fullDataByurl("get","/public/test/mock.json","address");
            }
       },
        /**
         * @description 获取表格弹出框表单数据
         */
        getCreateFormData(val) {
            return this.$refs.basemodal.getModalFormData();
        },
	},
    components: { modal }
}
</script>

