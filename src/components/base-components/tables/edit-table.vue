<style lang="less">
    @import '../../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
		<Row>
			<Col span="24">
				 <can-edit-table v-contbtm-resize="-220" v-model="table.data" :hover-show="true" :edit-incell="true" :columns-list="table.columns"></can-edit-table>
			</Col>
		</Row>
		<Page :total="total" :page-size="pagesize" show-total @on-change="setInitPage" style="text-align:center;"></Page>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
export default {
    name: 'edit-table',
    components: {
        canEditTable
    },
	props: ["table"],
    data () {
        return {
            tableData: [],
            editIncellColumns: [],
            editIncellData: [],
            total:0,
            pagesize:5,
            ajaxHistoryData:[],
            csvData:[],
        };
    },
    methods: {
        getData () {
            this.tableData = tableData.table1Data;
            this.editIncellColumns = tableData.editIncellColumns;
            this.editIncellData = tableData.editIncellData;
            this.total = this.editIncellData.length;
            this.ajaxHistoryData = this.tableData;
            if(this.editIncellData.length < this.pagesize){
                this.csvData = this.ajaxHistoryData;
            }else{
                this.csvData = this.ajaxHistoryData.slice(0,this.pagesize);
            }  
        },
        setInitPage(index){
            var startdata = ( index - 1 ) * this.pagesize;
            var enddata = index * this.pagesize;
            this.csvData = this.ajaxHistoryData.slice(startdata,enddata);
        }
    },
    created () {
        this.getData();
    }
};
</script>
