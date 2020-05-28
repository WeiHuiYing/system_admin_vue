import axios from "@/libs/api.request";


// SingleSalesAnalysis 销售报表
export const getSales = data => {
  return axios.request({
    url: "api/SingleSalesAnalysis/GetPage/",
    method: "POST",
    data
  });
};

//BnsUsBaseInventory 美国仓仓底维护

// 获取列表
export const getUsBase = data => {
  return axios.request({
    url: "api/BnsUsBaseInventory/GetList/",
    method: "POST",
    data
  });
};

// 获取单个数据
export const getUsBaseInfo = data => {
  return axios.request({
    url: "api/BnsUsBaseInventory/Get",
    method: "POST",
    data
  });
};

// 类型列表 UsTagTypeInventory
// 获取列表
export const getUsInventoryList = data => {
  return axios.request({
    url: "api/UsTagTypeInventory/GetPage",
    method: "POST",
    data
  });
};

// ECShipBatch 头层出库单

// 获取列表
export const getShipList = data => {
  return axios.request({
    url: "api/ECShipBatch/getList",
    method: "POST",
    data
  });
};
// 头程出货单
export const GetECFbaHead = data => {
  return axios.request({
    url: "api/ECHeadTrip/GetECFbaHeadTripLinesPage",
    method: "POST",
    data
  });
};
// 头程出货单导出
export const ExportECFbaHead = data => {
  return axios.request({
    url: "api/ECHeadTrip/ExportECHeadTripLines",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 头程出货单 店铺筛选的店铺列表
export const ECGetShop = () => {
  return axios.request({
    url: "api/ECHeadTrip/GetShop",
    method: "GET",
  });
};


// 添加头层入库单
export const addShip = data => {
  return axios.request({
    url: "api/ECShipBatch/addShipBatch",
    method: "POST",
    data
  });
};

// 发帘发块分产品尺寸销售占比
export const GetWeavingBlock = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetWeavingBlock",
    method: "POST",
    data
  });
};


// 头套产品销售明细
export const GetDensity = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetDensity",
    method: "POST",
    data
  });
};
// 商品款式
export const GetDensityStyle = () => {
  return axios.request({
    url: "api/SaleOrderReport/GetDensityStyle",
    method: "Get"
  });
};


// 销售汇总报表
export const TotalSale = data => {
  return axios.request({
    url: "api/TotalSale",
    method: "POST",
    data,
  });
};

export const GetProductCategoryList = () => {
  return axios.request({
    url: "api/TotalSale/GetProductCategoryList",
    method: "POST"
  });
};

// 发帘发块分款式销售占比报表
export const HairWeftStyleSale = data => {
  return axios.request({
    url: "api/HairWeftStyleSale",
    method: "POST",
    data,
  });
};

// 单条订单与多条订单占比
export const GetOddMinusSale = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetOddMinusSale",
    method: "POST",
    data
  });
};


// 各店铺各等级产品销量汇总
export const ChannelLevelSalesCount = data => {
  return axios.request({
    url: "api/ChannelLevelSalesCount/index",
    method: "POST",
    data
  });
};


// 各店铺各等级产品销量汇总
export const UsUiceNomalSkuQty = data => {
  return axios.request({
    url: "api/UsUiceNomalSkuQty/GetList",
    method: "POST",
    data
  });
};


// 财务订单合计报表
export const OrderCostTotal = data => {
  return axios.request({
    url: "api/FinancialStatement/OrderCostTotal",
    method: "POST",
    data
  });
};


// 导出财务订单合计报表
export const ExportOrderCostTotal = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportOrderCostTotal",
    method: "POST",
    data,
    responseType: "blob"
  });
};


//  SKU销量明细报表
export const SkuSaleQuery = data => {
  return axios.request({
    url: "api/FinancialStatement/SkuSaleQuery",
    method: "POST",
    data
  });
};
//  导出SKU销量明细报表
export const ExportSkuSaleQuery = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportSkuSaleQuery",
    method: "POST",
    data,
    responseType: "blob"
  });
};
