export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const table1Data = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 90,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        key: 'work',
        width: 150,
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editIncellColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 120,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 160,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const editIncellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineAndCellColumn = [
    {
        title: '序号',
        // type: 'index',
        width: 80,
        align: 'center',
        render: (h, params) => {
            return h('span', params.index + (localStorage.current - 1) * localStorage.pagesize + 1);
        }
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineAndCellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    },{
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员'
    },{
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '鼓励师'
    },{
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员'
    },{
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '男',
        work: '鼓励师'
    },{
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '男',
        work: '程序员'
    }
];

export const showCurrentColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    }
];

export const channelData = [{
    "orgid":"0001",
    "orgname":"机构1",
    "orgtype":"客运站",
    "orgstatus":"启用",
    "orgreward":"返佣",
    "orgstr":"80%",
    "hasaccount":"1"
},{
    "orgid":"0002",
    "orgname":"机构1",
    "orgtype":"客运站",
    "orgstatus":"停用",
    "orgreward":"返佣",
    "orgstr":"80%",
    "hasaccount":"1"
},{
    "orgid":"0003",
    "orgname":"机构1",
    "orgtype":"酒店",
    "orgstatus":"启用",
    "orgreward":"返佣",
    "orgstr":"80%",
},{
    "orgid":"0004",
    "orgname":"机构1",
    "orgtype":"旅行社",
    "orgstatus":"停用",
    "orgreward":"返佣",
    "orgstr":"80%",
},{
    "orgid":"0005",
    "orgname":"机构1",
    "orgtype":"客运站",
    "orgstatus":"启用",
    "orgreward":"返佣",
    "orgstr":"80%"
},{
    "orgid":"0006",
    "orgname":"机构1",
    "orgtype":"客运站",
    "orgstatus":"启用",
    "orgreward":"返佣",
    "orgstr":"80%"
},{
    "orgid":"0007",
    "orgname":"机构1",
    "orgtype":"个体商铺",
    "orgstatus":"停用",
    "orgreward":"返佣",
    "orgstr":"50%"
},{
    "orgid":"0008",
    "orgname":"机构11",
    "orgtype":"客运站",
    "orgstatus":"启用",
    "orgreward":"返佣",
    "orgstr":"80%"
},{
    "orgid":"0009",
    "orgname":"机构111",
    "orgtype":"其他",
    "orgstatus":"停用",
    "orgreward":"返佣",
    "orgstr":"80%"
}];

export const settleData = [{
    "orgdate":"2018-10-10",
    "orgid":"0001",
    "orgname":"公司1",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"是",
},{
    "orgdate":"2018-10-10",
    "orgid":"0001",
    "orgname":"公司2",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"否",
},{
    "orgdate":"2018-10-10",
    "orgid":"0001",
    "orgname":"公司3",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"是",
},{
    "orgdate":"2018-10-10",
    "orgid":"0001",
    "orgname":"公司4",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"是",
},{
    "orgdate":"2018-10-10",
    "orgid":"0005",
    "orgname":"公司5",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"否",
},{
    "orgdate":"2018-10-10",
    "orgid":"0005",
    "orgname":"公司5",
    "ordernum":"200",
    "paytotal":"20",
    "rewordtotal":"200",
    "refundnum":"20",
    "refundtotal":"10",
    "refundpay":"300",
    "readypay":"30",
    "orgstatus":"否",
}
]

const tableData = {
    table1Columns: table1Columns,
    table1Data: table1Data,
    editInlineColumns: editInlineColumns,
    editInlineData: editInlineData,
    editIncellColumns: editIncellColumns,
    editIncellData: editIncellData,
    editInlineAndCellColumn: editInlineAndCellColumn,
    editInlineAndCellData: editInlineAndCellData,
    showCurrentColumns: showCurrentColumns,
    channelData: channelData,
    settleData: settleData
};

export default tableData;
