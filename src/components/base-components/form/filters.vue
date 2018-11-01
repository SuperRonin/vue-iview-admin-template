<template>
    <div class="searchList">
        <!-- 筛选条件 -->
        <Form :model="filterData" class="searchSelect" ref="filterForm" :label-width="80" :rules="filter.rule" :class="filter.center?'divCenter':''">
                <!-- .slice(0,4) -->
                <template v-for="item in filter.itemlist">
                    <div class="item"  :style="item.multiColum?styles[item.multiColum]:styles[3]" :key="item.label">
                        <FormItem :label="item.label" :prop="item.fieldname">
                            <Input
                            :element-id="item.fieldname"
                            v-if="item.type == 'input'" 
                            v-model="filterData[item.fieldname]" 
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            @on-change="inputChange"
                            @on-focus="inputFocus"
                            @on-blur="onInputChange($event)"
                            />
                            <Select  
                         
                            v-if="item.type == 'select'"
                            :filterable = "item.filterable"
                            :multiple = "item.multiple"
                            :remote = "item.remote"
                            v-model="filterData[item.fieldname]" 
                            :label-in-value="item.labelInvalue"
                            :placeholder="item.placeholder"
                            @on-change="onSelectChange($event,item.fieldname)"
                            @on-query-change="onSelectQueryChange($event,item.fieldname)"
                            @on-clear="selectClear($event,item.fieldname)"
                            >
                                <Option v-for="item in item.options" 
                                :value="item.key"
                                :disabled="item.disabled" 
                                :key="item.value"
                                >
                                {{ item.text }}
                                </Option>
                            </Select>
                            <DatePicker  v-if="item.type == 'date'" :type="item.range ? 'daterange': 'date'" v-model="filterData[item.fieldname]"  :placeholder="item.placeholder"></DatePicker>
                            <Input v-if="item.type =='textarea'" :type = item.type v-model="filterData[item.fieldname]" :disabled="item.disabled" :autosize="{minRows: item.minRows?item.minRows:5,maxRows: item.maxRows?item.maxRows:10}" :placeholder="item.placeholder"/>
                        </FormItem>
                    </div>
                </template>
           
        </Form>

        <div class="common-use-btn" v-if="filter.menuButton">
            <Button v-if="filter.menuButton.searchButton"  type="warning"  @click="onFilterMenuClick($event)">
                <Icon type="search" />
                <span>查询</span>
            </Button>
            <Dropdown v-if="filter.menuButton.exportButton" trigger="click" @on-click="onDropdownClick">
                <Button type="primary">
                    <span>导出</span>
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list" >
                    <template v-for="item in filter.menuButton.exportButtonItemlist">
                        <DropdownItem  :disabled="item.disabled" :key="item.value" :name="item.text">{{item.text}}</DropdownItem>
                    </template>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import './css/filter.less';
</style>


<script>
import $http from "@/assets/http"
export default {
    name: "filterpanel",
    data() {
        return {
            styles: ['','width: 8.333333%','width: 16.666667%','width: 25%','width: 33.333333%','width: 41.666667%','width: 50%','width: 58.333333%','width: 66.666667%','width: 75%','width: 83.333333%','width: 91.666667%','width: 100%'],
            filterData: {},
            inputContentChange: false,
            initDataForms: [] //需要进行初始化的表单项
        }
    },
    props: ["filter"],
    created () {
        const that = this;
        // 生成条件筛选form表单model
        let forms = this.filter.itemlist;
        forms.forEach((item) => {
            that.filterData[item.fieldname] = item.value
            if(item.url){
                that.initDataByUrl(item.fieldname,item.urltype,item.url)
                // initDataForms.push({
                //     "fieldname": item.fieldname,
                //     "url": item.url
                // })
            }
        })

        //过滤出需要进行初始化的表单项  例如select

        console.log(that.filterData);
    },
    methods: {
        /**
         * @description 搜索、导出按钮点击
         * @returns {Object} 表单数据
         */
        onFilterMenuClick (e) {
           const filterData = this.makeFormData();
           this.$emit("onFilterMenuClick",'search',filterData);
            
        },
        /**
         * 获取表单数据
         */
        getFilterFormData() {
            return this.filterData
        },
        /**
         * @desc 校验表单必填项是否已填
         * @returns {Bollean}
         */
        formValidate (){  //表单相关数据
            const that = this;
            console.log('============')
            console.log(this.filterData)
            console.log('============')
            let isValidate = false;
            // 表单提交
            this.$refs.filterForm.validate((valid) => {
                if(valid) isValidate = true
            });
            return isValidate
        },
        /**
         * @description 生成表单数据
         */
        makeFormData(){
            debugger
            if(this.formValidate()){
                let filterData = {
                    filterFormData: this.filterData
                };
                return filterData
            }
        },
        /**
         * 导出按钮下拉
         */
        onDropdownClick(name){
            const filterData = this.makeFormData();
            console.log(name)
            if(filterData){
                this.$emit("onFilterMenuClick",name,filterData);
            }
        },
        /**
         * @description 选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性
         * @returns {String} value
         * @returns {Obkect} value
         */
        onSelectChange(value,name) {
            this.$emit("onSelectChange",name,value);
        },
        /**
         * @description 搜索词改变时触发 
         * @returns {String} query
         */
        onSelectQueryChange(value,name) {
            this.$emit("onSelectQueryChange",name,value);
        },
        /**
         * @description 点击清空按钮时触发
         * @returns 
         */
        onSelectClear(name) {
            this.$emit("onSelectClear",name);
        },
        inputChange(value,name){
            this.inputContentChange = true;
        },
        onInputChange (e) {
            const name = e.currentTarget.id;
            if(this.inputContentChange){
                this.$emit("onInputChange",name);
            }
        },
        inputFocus() {
            this.inputContentChange = false
        },
        //初始化数据
        initDataByUrl(name,urltype,url) {
            if(urltype === "get" || urltype === "post"){
                const that = this;
                that.$http[urltype](url,{}).then((res) => {
                    const itemlist = that.filter.itemlist;
                    itemlist.forEach((o,i) => {
                        //更新对应name的option值
                        if(o.fieldname == name){
                            o.options = res;
                        }
                    })
                })
                .catch(function(error) {
                    that.$Message.error(error.message);
                });
            }
        },
        // 触发实时搜索
        fullDataByurl(urltype,url,name) {
            if(urltype === "get" || urltype === "post"){
                const that = this;
                that.$http[urltype](url,{}).then((res) => {
                    const itemlist = that.filter.itemlist;
                    itemlist.forEach((o,i) => {
                        //更新对应name的option值
                        if(o.fieldname == name){
                            o.options = res;
                        }
                    })
                })
                .catch(function(error) {
                    that.$Message.error(error.message);
                });
            }
        }
    }
}
</script>

