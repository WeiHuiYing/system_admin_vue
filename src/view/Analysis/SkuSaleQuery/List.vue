<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="23">
          <Form ref="formInline" label-position="right" :label-width="85" inline>
            <FormItem prop="sku" label="SKU">
              <Input style="width:200px" v-model="filters.sku" placeholder="请输入搜索的sku"></Input>
            </FormItem>
            <FormItem prop="refNo" label="参考单号">
              <Input style="width:200px" v-model="filters.refNo" placeholder="请输入搜索的参考单号"></Input>
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
      <Form ref="formInline" label-position="right" :label-width="85" inline>
        <FormItem prop="sku" label="SKU">
          <Input style="width:200px" v-model="filters.sku" placeholder="请输入搜索的sku"></Input>
        </FormItem>
        <FormItem prop="refNo" label="参考单号">
          <Input style="width:200px" v-model="filters.refNo" placeholder="请输入搜索的参考单号"></Input>
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
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
            @on-change="changePlate"
            clearable
            style="width:200px"
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
            style="width:200px"
            multiple
          >
            <Option
              v-for="(item,index) in shopList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
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
  SkuSaleQuery as getList,
  ExportSkuSaleQuery as exportOrder
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        refNo: "",
        storeName: "",
        warehouseCode: "",
        startTime: "",
        endTime: "",
        sku: "",
        plateform: ""
      },
      listData: [],
      listColumns: [
        {
          title: "店铺",
          key: "storeName"
        },
        {
          title: "子sku",
          key: "sku"
        },
        {
          title: "参考单号",
          key: "refNo"
        },
        {
          title: "数量",
          key: "qty"
        }
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      plateList: [],
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
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.loadData();
    },
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      let filterCreate = _this.filtersDate(
        "createdDate",
        _this.filters.startTime,
        _this.filters.endTime
      );
      if (_this.filters.storeName && _this.filters.storeName.length > 0) {
        let storeName = "";
        _this.filters.storeName.forEach((item, index) => {
          if (index == _this.filters.storeName.length - 1) {
            storeName += "'" + item + "'";
          } else {
            storeName += "'" + item + "'" + ",";
          }
        });
        let storeObj = {
          key: "storeName",
          binaryop: "eq",
          value: storeName,
          andorop: "and"
        };
        filterQuery.push(storeObj);
      }
      if (_this.filters.sku && _this.filters.sku != "") {
        let skuObj = {
          key: "sku",
          binaryop: "eq",
          value: _this.filters.sku,
          andorop: "and"
        };
        filterQuery.push(skuObj);
      }
      if (_this.filters.refNo && _this.filters.refNo != "") {
        let refNoObj = {
          key: "refNo",
          binaryop: "eq",
          value: _this.filters.refNo,
          andorop: "and"
        };
        filterQuery.push(refNoObj);
      }
      if (filterCreate.length > 0) {
        filterQuery = filterQuery.concat(filterCreate);
      }
      console.log(filterQuery);
      return filterQuery;
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
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then(res => {
        _this.plateList = res.data;
      });
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
        const fileName = "SKU销售明细报表.xlsx";
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