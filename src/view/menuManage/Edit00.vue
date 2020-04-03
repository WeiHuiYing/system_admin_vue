<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :rules="ruleMenu" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="组件" prop="component">
            <Input v-model="Row.component" readonly />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="名称" prop="name">
            <Select v-model="Row.name" clearable style="width:300px">
              <Option v-for="(item,index) in nameList" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="路由地址" prop="path">
            <Input v-model="Row.path" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="标题" prop="title">
            <Input v-model="Row.title" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="图标" prop="icon">
            <Select v-model="Row.icon" clearable style="width:200px">
              <Option v-for="(item,index) in iconList" :label="item" :value="item" :key="index">
                <Icon :type="item" />
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="button-top-warp">
      <Button class="search-btn" type="success" size="small" @click="handleAdd">
        <Icon type="md-add" />&nbsp;&nbsp;新增
      </Button>
    </div>
    <Table :columns="listColums" :data="Row.children" border></Table>
    <Row style="margin-top:10px">
      <Col span="24">
        <div style="text-align:center;">
          <Button @click="parent.modelEdit=false">取消</Button>
          <Button style="margin-left:20px;" type="primary" @click="save('formInline')">保存</Button>
        </div>
      </Col>
    </Row>
    <Modal
      title="编辑"
      :mask-closable="false"
      v-model="modelEdit"
      width="1200"
      scrollable
      footer-hide
    >
      <Form
        ref="childForm"
        label-position="right"
        :model="childRow"
        :rules="ruleMenu"
        :label-width="100"
      >
        <Row>
          <Col span="12">
            <FormItem label="组件" prop="component">
              <Select v-model="childRow.component" clearable style="width:300px">
                <Option v-for="(item,index) in commponentList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="名称" prop="name">
              <Select v-model="childRow.name" clearable style="width:300px">
                <Option v-for="(item,index) in nameList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="路由地址" prop="path">
              <Input v-model="childRow.path" clearable />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="标题" prop="title">
              <Input v-model="childRow.title" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="图标" prop="icon">
              <Select v-model="childRow.icon" clearable style="width:200px">
                <Option v-for="(item,index) in iconList" :label="item" :value="item" :key="index">
                  <Icon :type="item" />
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-top:10px">
          <Col span="24">
            <div style="text-align:center;">
              <Button @click="modelEdit=false">取消</Button>
              <Button style="margin-left:20px;" type="primary" @click="saveChild('childForm')">保存</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { componentList as sourceList } from "@/libs/componentsList.js";
import { iconList as sourceIcon } from "@/libs/componentsList.js";
import { addMenus, editMenus } from "@/api/ResMenus";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  components: {},
  data() {
    return {
      Row: {},
      ruleMenu: {
        component: [{ required: true, message: "组件必选", trigger: "change" }],
        name: [{ required: true, message: "名称必选", trigger: "change" }],
        path: [{ required: true, message: "路由地址必填", trigger: "blur" }],
        title: [{ required: true, message: "标题必填", trigger: "blur" }]
      },
      commponentList: [],
      nameList: [],
      iconList: [],
      listColums: [
        {
          title: "名称",
          key: "name",
          tree: true
        },
        {
          title: "路径",
          key: "path"
        },
        {
          title: "组件",
          key: "component"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      modelEdit: false,
      childRow: {},
      isAdd: false
    };
  },
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
      if (this.Row.meta) {
        this.Row.title = this.Row.meta.title;
        this.Row.icon = this.Row.meta.icon;
      }
    }
  },
  methods: {
    loadData() {
      let _this = this;
      sourceList.forEach(item => {
        if (item.component) {
          _this.commponentList.push(item.component);
        }
        if (item.name) {
          _this.nameList.push(item.name);
        }
      });
      _this.iconList = sourceIcon;
    },
    handleEdit(params) {
      let _this = this;
      _this.childRow = params.row;
      _this.childRow.title = _this.childRow.meta.title;
      _this.childRow.icon = _this.childRow.meta.icon;
      _this.modelEdit = true;
      _this.isAdd = false;
    },
    handleAdd() {
      let _this = this;
      _this.childRow = {};
      _this.modelEdit = true;
      _this.isAdd = true;
    },
    save() {
      if (this.parent.isAdd) {
        this.saveAdd();
      } else {
        this.saveEdit();
      }
    },
    saveAdd() {
      this.saveValidate().then(r => {
        if (r) {
          let data = JSON.parse(JSON.stringify(this.Row));
          delete data.meta;
          addMenus(data)
            .then(res => {
              const resData = res.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("添加成功");
                this.parent.modelEdit = false;
                this.parent.loadData();
              } else {
                this.$Message.error({
                  content: msg,
                  duration: 10,
                  closable: true
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    saveEdit() {
      this.saveValidate().then(r => {
        if (r) {
          let data = JSON.parse(JSON.stringify(this.Row));
          delete data.meta;
          console.log(data);
          editMenus(data)
            .then(res => {
              const resData = res.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("添加成功");
                this.parent.modelEdit = false;
                this.parent.loadData();
              } else {
                this.$Message.error({
                  content: msg,
                  duration: 10,
                  closable: true
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    saveValidate(name = "formInline") {
      return this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    },
    saveChild() {
      if (this.isAdd) {
        this.saveChildAdd();
      } else {
        this.saveChildEdit();
      }
    },
    saveChildAdd() {
      let _this = this;
      this.saveChildAValidate().then(r => {
        if (r) {
          let data = JSON.parse(JSON.stringify(this.childRow));
          data.meta = {
            title: data.title,
            icon: data.icon
          };
          delete data.title;
          delete data.icon;
          if (!_this.Row.children) {
            _this.Row.children = [];
          }
          console.log(data);
          _this.Row.children.push(data);
          _this.modelEdit = false;
        }
      });
    },
    saveChildEdit() {
      let _this = this;
      this.saveChildAValidate().then(r => {
        if (r) {
          _this.childRow.meta = {
            title: _this.childRow.title,
            icon: _this.childRow.icon
          };
          delete _this.childRow.title;
          delete _this.childRow.icon;
          _this.modelEdit = false;
        }
      });
    },
    saveChildAValidate(name = "childForm") {
      return this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

