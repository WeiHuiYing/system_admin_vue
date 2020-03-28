<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="18">
        <Form ref="formInline" label-position="right" :label-width="60" inline>
          <FormItem label="时间范围">
            <DatePicker
              v-model="filters.dateMerange"
              type="datetimerange"
              placeholder="请选择时间范围"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
          <FormItem label="商品款式">
            <Select v-model="filters.type" style="width:200px">
              <Option value="发帘">发帘</Option>
              <Option value="发块">发块</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="6">
        <Dropdown v-if="selectionList.length > 0" placement="bottom-start" @on-click="handleMenu">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="export">导出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :span-method="handleSpan"
      :border="true"
      show-summary
      :summary-method="handleSummary"
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import { GetWeavingBlock as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        dateMerange: [],
        type: "发帘"
      },
      tableLoading: false,
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "尺寸",
          key: "size"
        },
        {
          title: "总销量",
          key: "total"
        },
        {
          title: "单尺寸销量",
          key: "sizeTotal"
        },
        {
          title: "尺寸总占比",
          key: "sizeTotalRatio"
        },
        {
          title: "速卖通|销量",
          key: "aliSizeTotal"
        },
        {
          title: "速卖通|占比",
          key: "aliSizeTotalRatio"
        },
        {
          title: "亚马逊|销量",
          key: "amazSizeTotal"
        },
        {
          title: "亚马逊|占比",
          key: "amazSizeTotalRatio"
        },
        {
          title: "自营站|销量",
          key: "magentoSizeTotal"
        },
        {
          title: "自营站|占比",
          key: "magentoSizeTotalRatio"
        },
        {
          title: "SHOPIFY|销量",
          key: "shopifySizeTotal"
        },
        {
          title: "SHOPIFY|占比",
          key: "shopifySizeTotalRatio"
        },
        {
          title: "ebay平台|销量",
          key: "ebaySizeTotal"
        },
        {
          title: "ebay平台|占比",
          key: "ebaySizeTotalRatio"
        }
      ],
      selectionList: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let startTime = "";
      let endTime = "";
      let data = {
        type: _this.filters.type
      };
      if (_this.filters.dateMerange.length > 0) {
        if (_this.filters.dateMerange[0] !== "") {
          startTime = dayjs(_this.filters.dateMerange[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          data.startTime = startTime;
        }
        if (_this.filters.dateMerange[1] !== "") {
          endTime = dayjs(_this.filters.dateMerange[1]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          data.endTime = endTime;
        }
      }
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
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
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   console.log({ row, column, rowIndex, columnIndex });
      if (columnIndex === 2) {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    // 合计
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "总计"
          };
          return;
        } else if (index === 1) {
          sums[key] = {
            key,
            value: "/"
          };
          return;
        } else if (index === 2) {
          sums[key] = {
            key,
            value: "/"
          };
          return;
        }
        const values = data.map(item => {
          let value = JSON.stringify(item[key]);
          value = value.replace("%", "");
          value = JSON.parse(value);
          return Number(value);
        });
        if (!values.every(value => isNaN(value))) {
          let IntReg = /^[0-9]*[1-9][0-9]*$/;
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (!IntReg.test(val)) {
            val = parseFloat(val).toFixed(2) + "%";
          }
          sums[key] = {
            key,
            value: val
          };
        } else {
          sums[key] = {
            key,
            value: "/"
          };
        }
      });
      console.log(sums);
      return sums;
    },
    tableSelect(selection) {
      this.selectionList = selection;
    },
    handleMenu(name) {
      if (name == "export") {
        this.exportList();
      }
    },
    exportList() {
      let _this = this;
      let titleArr = _this.listColums
        .filter((item, index) => {
          return index != 0;
        })
        .map(item => {
          return item.title;
        });
      let keyArr = _this.listColums
        .filter((item, index) => {
          return index != 0;
        })
        .map(item => {
          return item.key;
        });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.selectionList,
        autoWidth: true,
        filename: "发帘发块分产品尺寸销售占比报表"
      };
      excel.export_array_to_excel(params);
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
