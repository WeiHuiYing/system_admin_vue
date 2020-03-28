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
            <Select @on-change="filtersStyle" v-model="filters.type" multiple style="width:200px">
              <Option v-for="(item,index) in styleList" :key="index" :value="item">{{item}}</Option>
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
      height="700"
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
import {
  GetDensity as getList,
  GetDensityStyle as getStyle
} from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        dateMerange: [],
        type: []
      },
      tableLoading: false,
      totalData: [],
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品款式",
          key: "style",
          width: 100
        },
        {
          title: "总销量",
          key: "total",
          width: 100
        },
        {
          title: "13*4",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density134130Total",
              align: "center",
              width: 150
            },
            {
              title: "150%销量",
              key: "density134150Total",
              align: "center",
              width: 150
            },
            {
              title: "180%销量",
              key: "density134180Total",
              align: "center",
              width: 150
            }
          ]
        },
        {
          title: "13*6",
          align: "center",
          children: [
            {
              title: "150%销量",
              key: "density136150Total",
              align: "center",
              width: 150
            },
            {
              title: "180%销量",
              key: "density136180Total",
              align: "center",
              width: 150
            },
            {
              title: "250%销量",
              key: "density136250Total",
              align: "center",
              width: 150
            }
          ]
        },
        {
          title: "360",
          align: "center",
          children: [
            {
              title: "150%销量",
              key: "density360150Total",
              align: "center",
              width: 150
            },
            {
              title: "180%销量",
              key: "density360180Total",
              align: "center",
              width: 150
            }
          ]
        },
        {
          title: "全手织",
          align: "center",
          children: [
            {
              title: "150%销量",
              key: "densityHand150Total",
              align: "center",
              width: 150
            },
            {
              title: "180%销量",
              key: "densityHand180Total",
              align: "center",
              width: 150
            }
          ]
        },
        {
          title: "4*4",
          align: "center",
          children: [
            {
              title: "150%销量",
              key: "density44150Total",
              align: "center",
              width: 150
            },
            {
              title: "180%销量",
              key: "density44180Total",
              align: "center",
              width: 150
            }
          ]
        },
        {
          title: "机制",
          align: "center",
          children: [
            {
              title: "销量",
              key: "densityMachineTotal",
              align: "center",
              width: 150
            },
            {
              title: "130%销量",
              key: "densityMachine130Total",
              align: "center",
              width: 150
            }
          ]
        }
      ],
      selectionList: [],
      styleList: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let startTime = "";
      let endTime = "";
      let data = {};
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
            _this.totalData = resData.data;
            _this.listData = _this.totalData;
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
    styleLoad() {
      let _this = this;
      getStyle()
        .then(res => {
          if (res.status == 200) {
            _this.styleList = res.data;
          } else {
            this.$Message.error({
              content: res.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filtersStyle() {
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.type.length > 0) {
          _this.listData = _this.totalData.filter(item => {
            for (let i = 0; i < _this.filters.type.length; i++) {
              if (item.style == _this.filters.type[i]) {
                return item;
              }
            }
          });
          console.log(_this.listData);
        } else {
          _this.listData = _this.totalData;
        }
      }
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
        }
        const values = data.map(item => {
          return Number(item[key]);
        });
        let totalVal;
        if (!values.every(value => isNaN(value))) {
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (key === "total") {
            sums[key] = {
              key,
              value: val
            };
          } else {
            totalVal = sums["total"].value;
            sums[key] = {
              key,
              value:
                val +
                "（" +
                parseFloat((val / totalVal) * 100).toFixed(2) +
                "%）"
            };
          }
        } else {
          sums[key] = {
            key,
            value: "/"
          };
        }
      });
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
        filename: "头套产品销售明细"
      };
      excel.export_array_to_excel(params);
    }
  },
  mounted() {
    this.loadData();
    this.styleLoad();
  }
};
</script>
