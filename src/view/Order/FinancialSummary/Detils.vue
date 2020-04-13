<template>
  <div>
    <Row class="info-warp">
      <Col span="11">
        <Card dis-hover :bordered="false">
          <Row class="info-item">
            <Col class="info-title" :span="6">备注:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.orderDesc }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">付款时间:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.datePaidPlatform }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">付款方式:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.fkWay }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">发货时间:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.dateWarehouseShipping }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">收货时间:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shDate }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">订单状态:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.status }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">销售单号:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.saleOrderCode }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">参考单号:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.refNo}}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">仓库单号:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.wareHouseOrderCode }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">订单类型:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.orderType }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">仓库位置:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.wareCountryName }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">发货仓库:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.wareHouseDesc }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">产品信息:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.productSku }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">亚马逊商品sku:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amazonSKU }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">商品成本:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.spUnitPrice }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">商品总成本:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.zSpUnitPrice }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">东恒成本价:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.dhCost }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">产品重量(净重):</Col>
            <Col :offset="1" :span="6">{{ rowInfo.productNetWeight }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">产品重量(总重量净重):</Col>
            <Col :offset="1" :span="6">{{ rowInfo.zproductNetWeight }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">产品条数:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.qty }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">公司:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.company }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">平台:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.plateform }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">店铺:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.storeName }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">交易ID:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.paypalTransactionId }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">币种:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.currency }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">放款状态:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.loanType }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">放款时间:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.loandate }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">paypal状态:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.paypalType }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">订单总金额:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amountpaid }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">订单总金额拆分:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amountpaidItem }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">价格(公司未折扣前价格):</Col>
            <Col :offset="1" :span="6">{{ rowInfo.companyAmount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">折扣金额:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.discountAmount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">店铺佣金/手续费:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.finalvaluefeeTotal }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">店铺佣金/手续费(拆分):</Col>
            <Col :offset="1" :span="6">{{ rowInfo.finalvaluefeeTotalItem }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">联盟佣金:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.allianceCommission }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">联盟佣金(拆分):</Col>
            <Col :offset="1" :span="6">{{ rowInfo.allianceCommissionItem }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">税:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.tax }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">实收物流费用:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shipFee }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">paypal手续费:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.platformFeeTotal }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">paypal手续费拆分:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.platformFee }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">productSales:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.productSales }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">shippingCredits:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shippingCredits }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">sellingFees:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.sellingFees }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">promotionalRebates:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.promotionalRebates}}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">fbaFees:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.fbaFees }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">salesTaxCollected:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.salesTaxCollected }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">otherTransactionFees:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.otherTransactionFees }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">giftWrapCredits:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.giftWrapCredits }}</Col>
          </Row>
        </Card>
      </Col>
      <Col span="11" offset="2">
        <Card dis-hover :bordered="false">
          <Row class="info-item">
            <Col class="info-title" :span="6">marketplaceFacilitatorTax:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.marketplaceFacilitatorTax }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">other:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.other }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">收款金额:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.receamount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">收款金额拆分:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.receamountitem }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">退款金额:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amountRefund }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">补偿金额:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.makeAmount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">物流方式:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shipChannel }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">物流费用:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.costShipFee }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">物流费用币种:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shipCurrency }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">快递单号:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shippingMethodNo }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">buyerName:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.buyerName }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">phone:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.phone }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">countryName:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.countryName }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">state:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.state }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">name:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.name }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">adress:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.adress }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">buyerMail:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.buyerMail }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否为E贸易数据:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isE }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">设计师:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.personDevelopname }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">采购员:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.personSellername }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否为复购客户:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isFg }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否对应上汇款信息:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isHk }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否是外购产品:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isWg }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否成本占比异常:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isCb }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">头程关税:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.headTariff }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">补发类型:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.bfType }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">补发原因:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.bfMemo }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">小产品是否单独销售:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isSm }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">亚马逊索赔收入:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amazonClaim }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">亚马逊索赔成本:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amazonClaimCost }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">亚马逊索赔编号:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.amazonClaimNo }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">成本占比:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.costRatio}}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">运费占比:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.shipRatio }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">净重占比:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.netweightRatio }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">paypal是否争议:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.paypalArgue }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">补差价:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.bcAmount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">退差价:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.tcAmount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">补运费:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.byAamount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">退运费:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.tyAamount }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">销售类型:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.saleType }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">是否发货:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.isFh }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">品类:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.procutCategoryName }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">品类1:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.procutCategoryName1 }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">品类2:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.procutCategoryName2 }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">品类3:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.procutCategoryName3 }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">毛利:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.gross }}</Col>
          </Row>
          <Row class="info-item">
            <Col class="info-title" :span="6">毛利率:</Col>
            <Col :offset="1" :span="6">{{ rowInfo.grossRate }}</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {}
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.rowInfo = Object.assign({}, newVal);
    }
  },
  methods: {}
};
</script>

<style lang="less" scope>
.info-warp {
  .info-item {
    font-size: 14px;
    line-height: 32px;
    .info-title {
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
