<template>
    <div class="admin-main">
        <el-card>
          <el-row>
            <el-col>
              <el-button type="primary" @click="addCate">添加类别</el-button>
            </el-col>
          </el-row>
          <br>
          <el-table
            ref="multipleTable"
            :data="tableData"
            row-key="goodsCategory.id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            border stripe
            lazy
            :load="load"
            >
            <el-table-column
              prop="goodsCategory.id"
              label="分类id"
              with="180"
            >
            </el-table-column>
            <el-table-column
              prop="goodsCategory.categoryName"
              label="分类名称"
              with="180"
            >
            </el-table-column>
            <el-table-column
              prop="goodsCategory.updateTime"
              :formatter="dateFormat"
              label="更新时间"
              with="180"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              with="100"
            >
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCate(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCate(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-dialog :title="formDialogTitle" :visible.sync="dialogAddCate">
          <el-form :model="form">
            <el-form-item label="类别名称" :label-width="formLabelWidth">
              <el-input v-model="form.categoryName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="父级类型ID" :label-width="formLabelWidth">
              <el-input v-model="form.parentId" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddCate = false">取 消</el-button>
            <el-button type="primary" @click="addCateSubmit">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<style>

</style>
<script>
    import {listGoodsCategory, addGoodsCategory, editGoodsCategory, delGoodsCategory} from '@/network/goods'
    import {parseTime} from '@/utils/date'
    import { Message } from 'element-ui';
    export default {
      data() {
        return {  
          tableData:[],
          dialogAddCate: false,
          formDialogTitle: '添加类别',
          formLabelWidth: '120px',
          form: {
            categoryName: '',
            parentId: 0
          },
          formId: 0,
          dataMap: new Map(),
        }
      },
      methods:{   
        goodsCategory(storeRoot) {
          listGoodsCategory()
          .then( res => {
            let content = res.data.content
            this.tableData = content
          })
        },
        dateFormat(row, column, cellVal) {
          return parseTime(cellVal, '{y}-{m}-{d}')
        },
        addCate() {
          this.dialogAddCate = true
          this.formDialogTitle = '添加类别'
          this.formId = 0
        },
        editCate(row) {
          this.dialogAddCate = true
          this.formDialogTitle = '编辑类别'
          this.formId = row.goodsCategory.id
          this.form.categoryName = row.goodsCategory.categoryName
          this.form.parentId = row.goodsCategory.parentId
        },
        addCateSubmit() {
          if (this.formId != undefined && this.formId != 0) {
            let param = this.form
            param.id = this.formId
            editGoodsCategory(param)
            .then(res => {
              Message({
                message: '修改品类成功',
                type: 'info'
              })
              if (param.parentId == 0) {
                this.goodsCategory()
              } else {
                this.refreshTable(param.parentId)
              }
              
            })
          } else {
            let param = this.form
            addGoodsCategory(param)
            .then(res => {
              Message({
                message: '新增品类成功',
                type: 'info'
              })
              let resParentId = res.data.addedParentId
              if ( resParentId && resParentId != 0) {
                  this.refreshTable(resParentId) 
              } else {
                  this.goodsCategory()
              }
            })
          }
          this.dialogAddCate = false
        },  
        load(tree, treeNode, resolve) {
          this.dataMap.set(tree.goodsCategory.id, {tree, treeNode, resolve})
          this.loadTree(tree, treeNode, resolve)
        },
        loadTree(tree, treeNode, resolve) {
          let param = {}
          param.parentId = tree.goodsCategory.id
          listGoodsCategory(param)
          .then( res => {
            let content = res.data.content
            resolve(content)
          })
        },
        refreshTable(parentId) {
          const storeData = this.dataMap.get(parentId)
          if (storeData == undefined) {
            return undefined
          }
          const {tree, treeNode, resolve} = storeData
          this.$set(this.$refs.multipleTable.store.states.lazyTreeNodeMap, parentId, [])
          if (tree) {
            this.load(tree, treeNode, resolve)
            return tree
          }
        },
        removeCate(row) {
          let dataId = row.goodsCategory.id

          this.$confirm('确定删除此类别吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delGoodsCategory(dataId)
            .then(res => {
              let parentId = row.goodsCategory.parentId
              if (parentId == 0) {
                this.goodsCategory()
              } else {
                this.refreshTable(row.goodsCategory.parentId)
              }
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }
      },
      mounted: function() {
        this.goodsCategory()
      }
    };
</script>