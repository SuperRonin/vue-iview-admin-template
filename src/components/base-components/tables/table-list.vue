<style lang="less" scoped>
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <!-- <p slot="title">
                    <Icon type="mouse"></Icon>
                    点击搜索进行搜索
                </p> -->
                <Row style="margin-bottom:10px">
                    <Input v-model="searchConName" placeholder="请输入姓名搜搜..." style="width: 200px" />
                    <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                </Row>
                <Row>
                    <Col span="24">
                        <Table v-contbtm-resize="300" :columns="columnsCsv" :data="csvData" size="small" ref="tableCsv"></Table>
                    </Col>
                </Row>
            </Card>
            <Page :total="total" :page-size="pagesize" show-total @on-change="setInitPage" style="text-align:center;margin:30px 0"></Page>
        </Row>
        
    </div>
</template>

<script>
import {table2csvData, csvColumns} from './data/table2csv.js';
export default {
    name: 'table-list',
    data () {
        return {
            columnsCsv: csvColumns,
            csvData: [],//table2csvData
            fontSize: 16,
            ajaxHistoryData:[],
            total:0,
            pagesize:5,
            searchConName: '',
        };
    },
    methods: {
        handleListApproveHistory(){
            this.total = table2csvData.length;
            // 保存取到的所有数据
            this.ajaxHistoryData = table2csvData
            if(table2csvData.length < this.pagesize){
                this.csvData = this.ajaxHistoryData;
            }else{
                this.csvData = this.ajaxHistoryData.slice(0,this.pagesize);
            }    
        },
        setInitPage(index){
            var startdata = ( index - 1 ) * this.pagesize;
            var enddata = index * this.pagesize;
            this.csvData = this.ajaxHistoryData.slice(startdata,enddata);
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch () {
            this.csvData = table2csvData;
            var sourceData =[];
            sourceData = this.search(this.csvData, {name: this.searchConName});
            this.ajaxHistoryData = sourceData; 
            this.total = sourceData.length;
            if(this.ajaxHistoryData.length < this.pagesize){
                this.csvData = this.ajaxHistoryData;
            }else{
                this.csvData = this.ajaxHistoryData.slice(0,this.pagesize);
            } 
        },
    },
    created () {
        this.handleListApproveHistory()
    }
};
</script>