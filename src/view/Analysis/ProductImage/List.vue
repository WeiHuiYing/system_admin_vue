<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Upload
        action="/api/FinancialStatement/productTrans"
        name="excelFile"
        :headers="upHeaders"
        accept=".xls, .xlsx"
        :show-upload-list="false"
        :on-success="handleSuccess"
      >
        <Button :loading="uploadLoading">导入SKU</Button>
      </Upload>
      <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
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
  </div>
</template>

<script>
import store from '@/store'

export default {
  data () {
    return {
      listColums: [
        {
          title: '图片',
          key: 'image',
          render: (h, params) => {
            return h(
              'img',
              {
                props: {
                  src: params.row.image
                }
              }
            )
          }
        },
        {
          title: 'sku',
          key: 'sku'
        }
      ],
      uploadLoading: false,
      upHeaders: {
        Authorization: 'Bearer ' + store.state.user.token
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 10,
      listData: [],
      fileUrl: ''
    }
  },
  methods: {
    changePage (val) {
      let _this = this
      _this.pageCurrent = val
    },
    changePageSize (size) {
      let _this = this
      _this.pageSize = size
    },
    handleSuccess (response, file, fileList) {
      if (response.code == 200) {
        let _this = this
        _this.listData = response.data
        _this.fileUrl = response.url
        this.$Message.info({
          content: '上传成功',
          duration: 10,
          closable: true
        })
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true
        })
      }
    }
  }
}
</script>

<style lang="less"></style>
