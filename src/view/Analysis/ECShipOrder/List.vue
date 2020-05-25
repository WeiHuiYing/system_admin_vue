<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="23">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="子SKU">
            <Input clearable class="search-input" v-model="filters.itemSku" />
          </FormItem>
          <FormItem prop="startTime" label="制单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="制单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="datetime"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="店铺">
            <Select v-model="filters.shopName" style="width:200px" clearable>
              <Option v-for="(item,index) in shopList" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="1">
        <Button @click="exportData()" class="search-btn" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { GetECFbaHead, ExportECFbaHead } from "@/api/Analysis";
import { GetShop as getShopList } from "@/api/Order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: {
        itemSku: "",
        shopName: "",
        startTime: "",
        endTime: ""
      },
      shopList: [],
      tableLoading: false,
      listData: [],
      listColums: [
        {
          title: "订单号",
          key: "ordercode",
          width: 150
        },
        {
          title: "服务商单号",
          key: "referenceNo",
          width: 150
        },
        {
          title: "制单日期",
          key: "addTime",
          width: 150
        },
        {
          title: " 预计到货日期",
          key: "expectedDate",
          width: 150
        },
        {
          title: "外部sku",
          key: "outSku",
          width: 150
        },
        {
          title: "子SKU",
          key: "itemSku",
          width: 150
        },
        {
          title: "店铺",
          key: "storeName",
          width: 150
        },
        {
          title: "公司简称",
          key: "companyName",
          width: 150
        },
        {
          title: "币种",
          key: "currery",
          width: 150
        },
        {
          title: "数量",
          key: "qty",
          width: 150
        },
        {
          title: "单价",
          key: "price",
          width: 150
        },
        {
          title: "总成本",
          key: "cost",
          width: 150
        },
        {
          title: "发货仓",
          key: "warehouse",
          width: 150
        },
        {
          title: "目的仓",
          key: "toWarehouse",
          width: 150
        },
        {
          title: "备注",
          key: "remark",
          width: 150
        }
      ],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = _this.filtersObj();
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      _this.tableLoading = true;
      GetECFbaHead(data)
        .then(res => {
          console.log(res);
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = res.data.totalCount;
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
      let filtersquery = [];
      if (_this.filters.startTime !== "" && _this.filters.endTime !== "") {
        if (
          !dayjs(_this.filters.endTime).isAfter(dayjs(_this.filters.startTime))
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          filtersquery.push({
            key: "addtime",
            binaryop: "gt",
            value: dayjs(_this.filters.startTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          });
          filtersquery.push({
            key: "addtime",
            binaryop: "lt",
            value: dayjs(_this.filters.endTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          });
        }
      }
      if (_this.filters.shopName !== "") {
        filtersquery.push({
          key: "storename",
          binaryop: "eq",
          value: _this.filters.shopName,
          andorop: "and"
        });
      }
      if (_this.filters.itemSku !== "") {
        filtersquery.push({
          key: "itemsku",
          binaryop: "like",
          value: _this.filters.itemSku,
          andorop: "and"
        });
      }
      return filtersquery;
    },
    loadShop() {
      let _this = this;
      getShopList()
        .then(res => {
          if (res.status == 200) {
            _this.shopList = res.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportData() {
      let data = {};
      let _this = this;
      this.$Spin.show();
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery
      };
      ExportECFbaHead(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "头程出货单.xlsx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          console.log(elink);
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
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
    this.loadShop();
  }
};
</script>
