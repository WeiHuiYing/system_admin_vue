<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="23">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem prop="startTime" label="创建开始时间">
              <DatePicker
                v-model="filters.startTime"
                type="datetime"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="endTime" label="创建结束时间">
              <DatePicker
                v-model="filters.endTime"
                type="datetime"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
              <Button @click="filtersData()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;更多筛选
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="1">
          <Button @click="exportAll()" class="search-btn" type="primary">导出</Button>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form ref="formInline" label-position="right" :label-width="100" inline>
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
            @on-change="changePlate"
            clearable
            style="width:150px"
          >
            <Option
              v-for="(item,index) in plateList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="storeName" label="店铺">
          <Select
            :disabled="filters.plateform == ''? true : false"
            v-model="filters.storeName"
            clearable
            style="width:150px"
          >
            <Option
              v-for="(item,index) in shopList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="warehouseCode" label="发货仓库">
          <Select v-model="filters.warehouseCode" clearable style="width:150px">
            <Option
              v-for="(item,index) in wareList"
              :key="index"
              :label="item.warehouseCode"
              :value="item.warehouseCode"
            >{{item.warehouseCode}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="startTime" label="创建开始时间">
          <DatePicker
            v-model="filters.startTime"
            type="datetime"
            placeholder="请选择开始时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem prop="endTime" label="创建结束时间">
          <DatePicker
            v-model="filters.endTime"
            type="datetime"
            placeholder="请选择结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <div style="text-align:right;">
          <Button @click="filtersLoad()" class="search-btn" type="primary">搜索</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { GetPlateform, GetShop } from "@/api/Order";
import {
  OrderCostTotal as getList,
  ExportOrderCostTotal as exportOrder
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        plateform: "",
        storeName: "",
        warehouseCode: "",
        startTime: "",
        endTime: ""
      },
      listData: [],
      listColumns: [
        {
          title: "平台",
          key: "plateform",
          width: "200"
        },
        {
          title: "店铺",
          key: "storeName",
          width: "200"
        },
        {
          title: "货币类型",
          key: "currency",
          width: "200"
        },
        {
          title: "订单数量",
          key: "orderQty",
          width: "200"
        },
        {
          title: "商品数量",
          key: "productQty",
          width: "200"
        },
        {
          title: "订单总运费",
          key: "shipFee",
          width: "200"
        },
        {
          title: "订单总金额",
          key: "total",
          width: "200"
        },
        {
          title: "订单总成本",
          key: "cost",
          width: "200"
        },
        {
          title: "订单状态",
          key: "status_text",
          width: "200"
        },
        {
          title: "发货仓库",
          key: "warehouseeCode",
          width: "200"
        },
        {
          title: "订单毛利率",
          key: "grossmargin",
          width: "200"
        }
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      plateList: [],
      wareList: [],
      shopList: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            resData.data.forEach(item => {
              this.$store.state.orderStatus.forEach(order => {
                if (order.label == item.status) {
                  item.status_text = order.value;
                }
              });
            });
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      let filterCreate = _this.filtersDate(
        "createDate",
        _this.filters.startTime,
        _this.filters.endTime
      );
      if (_this.filters.plateform && _this.filters.plateform != "") {
        let plateObj = {
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and"
        };
        filterQuery.push(plateObj);
      }
      if (_this.filters.warehouseCode && _this.filters.warehouseCode != "") {
        let wareObj = {
          key: "warehouseCode",
          binaryop: "eq",
          value: _this.filters.warehouseCode,
          andorop: "and"
        };
        filterQuery.push(wareObj);
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        let storeObj = {
          key: "storeName",
          binaryop: "eq",
          value: _this.filters.storeName,
          andorop: "and"
        };
        filterQuery.push(storeObj);
      }
      return filterQuery;
    },
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then(res => {
        _this.plateList = res.data;
      });
      getWare(data).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.wareList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
      });
    },
    filtersDate(keyString, startTime, endTime) {
      let filterQuery = [];
      if (startTime != "" && endTime != "") {
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          let Start = {
            key: keyString,
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          };
          let End = {
            key: keyString,
            binaryop: "lte",
            value: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          };
          filterQuery.push(Start);
          filterQuery.push(End);
        }
      }
      return filterQuery;
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then(res => {
          _this.shopList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.loadData();
    },
    exportAll() {
      let data = {};
      let _this = this;
      this.$Spin.show();
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery
      };
      exportOrder(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "财务订单合计报表.xlsx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放 URL对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        this.$Spin.hide();
      });
    }
  },
  mounted() {
    this.loadData();
    this.selectLoad();
  }
};
</script>

<style lang="less" scoped>
</style>