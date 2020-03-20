<template>
  <div class="content-main">
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import { getShipList as getList } from "@/api/Analysis";
import Detils from "./Detils";
export default {
  components: {
    Detils
  },
  data() {
    return {
      listColums: [
        {
          title: "订单编码",
          key: "orderCode"
        },
        {
          title: "入库单号",
          key: "referenceNo"
        },
        {
          title: "添加时间",
          key: "addTime"
        },
        {
          title: "预计时间",
          key: "expectedDate"
        },
        {
          title: "用户",
          key: "userAccount"
        },
        {
          title: "仓库",
          key: "warehouse"
        },
        {
          title: "目标仓库",
          key: "toWarehouse"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.viewDetils(params);
                    }
                  }
                },
                "详细"
              )
            ]);
          }
        }
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 10,
      tableLoading: false,
      detilsRow: {},
      modelDetils: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      _this.tableLoading = true;
      getList(data).then(res => {
        _this.tableLoading = false;
        console.log(res);
        let resData = res.data;
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
      });
    },
    viewDetils(params) {
      let _this = this;
      console.log(params);
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
    changePage() {},
    changePageSize() {}
  },
  mounted() {
    this.loadData();
  }
};
</script>