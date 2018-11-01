<style lang="less" scoped>
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <!-- <template>
            <BackTop :height="10"></BackTop>
        </template> -->
        <div class="button">
            <div class="btnlist">
                <Button @click="back">返回</Button>
                <Button type="primary">保存</Button>
                <Button type="primary">提交</Button>
            </div>
        </div>
        
        <Tabs :animated="false">
            <TabPane label="基本信息" name="name1">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name" style="width:30%"></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="Enter your e-mail" style="width:30%"></Input>
                    </FormItem>
                    <FormItem label="City" prop="city">
                        <Select v-model="formValidate.city" placeholder="Select your city" style="width:30%">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Date">
                        <Row>
                            <Col span="3">
                                <FormItem prop="date">
                                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="1" style="text-align: center">-</Col>
                            <Col span="3">
                                <FormItem prop="time">
                                    <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="Gender" prop="gender">
                        <RadioGroup v-model="formValidate.gender">
                            <Radio label="male">Male</Radio>
                            <Radio label="female">Female</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="Hobby" prop="interest">
                        <CheckboxGroup v-model="formValidate.interest">
                            <Checkbox label="Eat"></Checkbox>
                            <Checkbox label="Sleep"></Checkbox>
                            <Checkbox label="Run"></Checkbox>
                            <Checkbox label="Movie"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="Desc" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." style="width:80%"></Input>
                    </FormItem>
                   

                    <FormItem label="Img">
                        <div class="demo-upload-list" v-for="item in uploadList" >
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemoveImg(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                </Form>
            </TabPane>

            <TabPane label="详细信息" name="name2">
                 <Form ref="formDynamic" :model="formDynamic" :rules="ruleValidate" :label-width="90">
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'Item ' + item.index"
                            :prop="'items.' + index + '.value'"
                            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                        <Row>
                            <Col span="6">
                                <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                            </Col>
                            <Col span="2" offset="1" v-if="formDynamic.items.length>1">
                                <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="2">
                                <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label='城市选择' prop='choosecity'>
                        <al-selector v-model="resDefault" level="3" auto/>
                    </FormItem>
                    <FormItem label='每份成人数' prop="people">
                        <InputNumber v-model="formValidate.people" :max="10" :min="1"></InputNumber>
                    </FormItem>
                    <FormItem label='所占比重'>
                        <InputNumber :max="100" v-model="value10" :formatter="value => `${value}%`"  :parser="value => value.replace('%', '')"></InputNumber>
                     </FormItem>   
                </Form>
            </TabPane>
        </Tabs>
        
    </div>
</template>

<script>
import alSelector from './components/al-selector.vue';

export default {
     components: {
        alSelector
    },
    name: 'showpage',
     data () {
            return {
                resDefault: ['河北省', '张家口市', '怀来县', '沙城镇'],
                showRes: [],
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                     people: [
                        { required: true, type: 'number', message: 'Please select time', trigger: 'change' }
                    ],
                },
                 index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ],
                    people:1
                },
                 defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                value1: [],
                value10: 100
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (indexs) { 
                if(this.formDynamic.items.length<=1){return}
                this.index = this.formDynamic.items.length -1;
                this.formDynamic.items.splice(indexs,1);
                for(var i = 0;i < this.formDynamic.items.length ;i++){
                    this.formDynamic.items[i].index = i+1;
                }
               
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemoveImg (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            back(){
                this.$router.push({name: 'editable-table'});
            }
        },
        created () {
         
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        watch: {
            resDefault (val) {
                this.showRes = val;
            }
        }
};
</script>
<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
 
    .btnlist{
         float:right;
    }
    .button{
        zoom: 1;
    }
    .button:after{
        display: block;
        visibility: hidden;
        clear: both;
        height: 0;
        content: '';
    }
</style>
