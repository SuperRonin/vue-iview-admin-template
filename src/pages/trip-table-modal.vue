<template>
    <!-- 表格编辑按钮弹出框 -->
        <modal
            :modalForm="tableEditModalForm"
            ref="basemodal"
            @filterMenuClick="filterMenuClick"
            @selectChange="selectChange"
            @selectQueryChange="selectQueryChange"
            @selectClear="selectClear"
            @inputChange = "inputChange" 
            @onCance="onCance" 
            @onSure="onSure"
            @getModalFormData = "getCreateFormData"
        >
        </modal>

        
</template>

<script>
import modal from "@/components/base-components/form/modalform.vue"
export default {
    name: "trip-table-modal",
    props: [],
    components: { modal },
    data () {
        return {
            // 表格编辑弹出框
            tableEditModalForm: {
                title: '表格编辑弹出框',
                form: {
                    multiColum: 3,//单列还是多列
                    itemlist: []
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
    created() {
        console.log(this.tableEditModalForm)
    },
    methods: {
       Show(){
			this.$refs.basemodal.Show()
	   },
        filterMenuClick (name,val) {
            this.$Notice.open({
                title: '发生了查询事件',
                desc: `触发的条件域为"${name}",获取到的form数据为${JSON.stringify(val)}`
            });
        },
        /**
         * @description 输入框失去焦点并且值发生了变化,会触发此事件
         */
        inputChange(belong,name){
            this.$Notice.open({
                title: '发生了失去焦点事件',
                desc: `触发区域是"${belong}"     失去焦点的输入框是"${name}"`
            });
            // 发起网络请求
            if (name=="name" && belong == "filter"){
                this.$refs.filters.fullDataByurl("address","/public/test/mock.json");
            }else if(name=="name" && belong == "modal"){
                this.$refs.createmodal.fullDataByurl("address","/public/test/mock.json");
            }
        },
        /**
         * @description 选中的Option变化时触发，默认返回 val，如需返回 label，详见 label-in-val 属性
         * @returns {String} val
         * @returns {Obkect} val
         */
        selectChange(name,val) {
            console.log(val)
        },
        /**
         * @description 搜索词改变时触发
         * @returns {String} query
         */
        selectQueryChange(name,val) {
            console.log(val)
        },
        /**
         * @description 点击清空按钮时触发
         * @returns 
         */
        selectClear(name) {
            
        },
        onCance() {
            alert('close')
        },
        onSure(formData) {
            alert('sure')
            console.log(formData)
		   this.$emit("onTableModalOk",formData)
        },
        /**
         * @description 获取新建按钮弹出框表单数据
         */
        getCreateFormData(val) {
            return this.$refs.basemodal.getModalFormData();
        }
    }
}
</script>

