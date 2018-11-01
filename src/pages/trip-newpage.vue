<template>
    <div>
        <newpage :titleOptions=titleOptions :headerButton=headerButton :filter=filter></newpage>
    </div>
</template>

<script>
import newpage from "../common-page/create/create-page"
export default {
    name: "tripnewpage",
    data(){
        return{
            titleOptions: {
                text: '新建',
                imgname: 'channel.png',
                width: 20
            },
            headerButton:{
				list: [ 
				{
					text: "提交",
                    value:"submit",
                    // icon: 'plus'
				},
				{
					text: "返回",
                    value:"back",
                    type:"default"
				}
                ],
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
                center:true,
				itemlist:[			//筛选条件
                    {
                        "label": "一行_01", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入名称", //框里面的默认提示性文字
                        "value": "",
                        "width": "50px",
                        "fieldname": "name", //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        "multiColum":12,
                    },
                    		//筛选条件
                    {
                        "label": "一行_02", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入名称", //框里面的默认提示性文字
                        "value": "",
                        "fieldname": "desc", //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        "multiColum":12,
                   },
					{
                        "label": "默认_01",
                        "type": "select",
                        "placeholder": "请选择地址",
                        "options": [ //下拉选项
                        ],
                        "labelInvalue": true,
                        "filterable": true, //开启搜索模式
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "province",
                        "url": "/public/test/address1.json",
                        "urltype": 'get',
                    },
                    {
                        "label": "默认_02",
                        "type": "select",
                        "placeholder": "请选择地址",
                        "options": [ //下拉选项
                            
                        ],
                        "labelInvalue": true,
                        "filterable": true, //是否支持搜索
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "city",
                        "url": "/public/test/address2.json",
                        "urltype": 'get',
                    }, {
                        "label": "默认_03",
                        "type": "select",
                        "placeholder": "请选择地址",
                        "options": [ //下拉选项
                            
                        ],
                        "labelInvalue": true,
                        "filterable": true, //是否支持搜索
                        "multiple": false, //是否是多选条件
                        "value": "",
                        "fieldname": "county",
                        "url": "/public/test/address2.json",
                        "urltype": 'get',
                    },
                    		//筛选条件
                    {
                        "label": "默认_04", //输入框前面的文字描述
                        "type": "input", //当前form的类型(input:输入框,select:下拉选择,date: 日历)
                        "placeholder": "请输入地址", //框里面的默认提示性文字
                        "value": "",
                        "fieldname": "address", //接口需要的字段名，注意修改的是key值  eg: fieldname: "startCity",
                        "multiColum":3,
                  },
					{
                        "label": "半分_01",
                        "type": "input",
                        "placeholder": "请选择地址",
                        "value": "",
                        "fieldname": "goodsname",
                        "multiColum":6,
                    },
                    {
                        "label": "半分_02",
                        "type": "input",
                        "value": "",
                        "fieldname": "age",
                        "multiColum":6,
                    },
                    {
                        "label": "textarea",
                        "type": "textarea",
                        "placeholder": "请输入描述",
                        "value": "",
                        "fieldname": "textarea",
                        "minRows":3,
                        "multiColum":12,
                    }
                ],
            }
        }
    },
    components: {newpage}
}
</script>

