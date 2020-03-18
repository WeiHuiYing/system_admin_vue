<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="入库单号">
          <Input class="search-input" v-model="filters.omsReceivingCode" />
        </FormItem>
        <FormItem>
          <Button @click="loadData()" class="search-btn" type="primary"
            >搜索</Button
          >
        </FormItem>
      </Form>
    </div>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :loading="tableLoading"
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
  </div>
</template>

<script>
import { getList, getDetails } from "@/api/OmsAnsList";
import Detils from "./Detils";
export default {
  data() {
    return {
      filters: {
        omsReceivingCode: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 10,
      tableLoading: false,
      listData: [],
      listColums: [
        {
          title: "入库单号",
          key: "omsReceivingCode"
        },
        {
          title: "备注",
          key: "message"
        },
        {
          title: "创建日期",
          key: "createDate"
        },
        {
          title: "是否停止拉取",
          key: "stopFlag",
          render: (h, params) => {
            let stopFlag = params.row.stopFlag;
            let stopFlagText = "";
            if (stopFlag === true) {
              stopFlagText = "拉取中";
              return h(
                "Tag",
                {
                  props: {
                    color: "primary",
                    size: "small"
                  }
                },
                stopFlagText
              );
            } else if (stopFlag === false) {
              stopFlagText = "停止拉取";
              return h(
                "Tag",
                {
                  props: {
                    color: "error",
                    size: "small"
                  }
                },
                stopFlagText
              );
            }
          }
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            let state = params.row.state;
            let stateText = "";
            if (state === 1) {
              stateText = "已拉取";
            } else if (state === 0) {
              stateText = "未拉取";
            }
            return h(
              "Tag",
              {
                props: {
                  color: "primary",
                  size: "small"
                }
              },
              stateText
            );
          }
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
      detilsRow: {}
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: []
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          console.log(res);
          if (res.data.code == 200) {
            _this.listData = res.data.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    changePage() {},
    changePageSize() {},
    viewDetils(params) {
      let _this = this;
      _this.Row = params.row;
      getDetails(_this.Row.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
