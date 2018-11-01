<template>
    <Modal 
	width = "600"
	class="additem"
	:title="modalReadyData.content.title"
	v-model="modalReadyData.showModal"
	:ok-text="modalReadyData.content.rightText"
	:cancel-text="modalReadyData.content.leftText"
	@on-cancel="onCancel"
	@on-ok="onSure" 
	>
        <Form :model="formData" ref="modalForm" :label-width="80" :rules="modalForm.rule">
			<template v-for="item in modalForm.form.itemlist">
				<div :class="modalForm.form.multiColum ? 'item' : ''"  :key="item.label">
					<FormItem  :label="item.label" :prop="item.fieldname">
						<Input
						:disabled="item.disabled"
                        :element-id="item.fieldname"
						:style="styles[modalForm.form.multiColum]"
						v-if="item.type == 'input'"
						v-model="formData[item.fieldname]"
						:placeholder="item.placeholder"
						@on-change="inputChange"
						@on-focus="inputFocus"
						@on-blur="onInputChange($event)"
						/>
						<Select
						:style="styles[modalForm.form.multiColum]"
						v-if="item.type == 'select'"
						v-model="formData[item.fieldname]"
						:filterable = "item.filterable"
						:multiple = "item.multiple"
						:placeholder="item.placeholder"
						:label-in-value="item.labelInvalue"
						@on-change="onSelectChange($event,item.fieldname)"
						@on-query-change="onSelectQueryChange($event,item.fieldname)"
						@on-clear="onSelectClear($event,item.fieldname)"
						>
							<Option v-for="item in item.options" :disabled="item.disabled" :value="item.value" :key="item.value">{{ item.text }}</Option>
						</Select>
						<DatePicker class="fl" style="width: 150px"  v-if="item.type == 'date'" :type="item.range ? 'daterange': 'date'" v-model="formData[item.fieldname]"  :placeholder="item.placeholder"></DatePicker>
					</FormItem>
				</div>
			</template>
        </Form>
		<div class="slot" v-if="modalForm.isslot">
			<div><slot name="header"></slot></div>
			<div><slot name="center"></slot></div>
			<div slot="footer">
				<slot name="bottom"></slot>
			</div>
		</div>
	</Modal>
</template>

<style lang="less" scoped>
	.fl{
		float: left;
	}
	.item{
		display: inline-block;
	}
    .button-box button{
        margin-right: 8px;
    }
</style>


<script>
import $http from "@/assets/http"
export default {
    name: "modalform",
	props: ["modalForm"],
	data(){
		return {
			styles: ['','width: 300px','width: 150px','width: 100px'],
			formData: {

			},
			modalReadyData: {
				content: {
					"title": this.modalForm.title,
					"leftText": this.modalForm.leftText,
					"rightText": this.modalForm.rightText
				},
				showModal: false,
			}
			
		}
	},
	methods: {
		//对外公开方法
		Show(){
			this.initForm();
			this.modalReadyData.showModal=true;
		},
		getModalFormData() {
			return this.formData
		},
		initForm(){
			const that = this;
			// 生成form表单model
			let forms = this.modalForm.form.itemlist;
			forms.forEach((item) => {
				that.formData[item.fieldname] = item.value
				if(item.url){
					that.initDataByUrl(item.fieldname,item.urltype,item.url)
					// initDataForms.push({
					//     "fieldname": item.fieldname,
					//     "url": item.url
					// })
				}
			})
		},
		//取消事件
		onCancel () {
			this.$emit("onCancel", this.formData);
		},
		onSure(){
			this.$emit("onSure", this.formData);
		},
        inputChange(value,name){
            this.inputContentChange = true;
        },
        onInputChange (e) {
			const name = e.currentTarget.id;
			debugger
            if(this.inputContentChange){
                this.$emit("onInputChange",name);
            }
        },
        inputFocus() {
            this.inputContentChange = false
        },
        /**
         * @description 选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性
         * @returns {String} value
         * @returns {Obkect} value
         */
        onSelectChange(value,name) {
            debugger
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
        //初始化数据
        initDataByUrl(name,urltype,url) {
			if(urltype === "get" || urltype === "post"){
                const that = this;
                that.$http[urltype](url,{}).then((res) => {
                    const itemlist = that.modalForm.form.itemlist;
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
					const itemlist = that.modalForm.form.itemlist;
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

