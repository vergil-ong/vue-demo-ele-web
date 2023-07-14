<template>
    <div class="admin-main">
        <el-card>
          <el-row>
            <el-col>
              <el-button type="primary">添加类别</el-button>
            </el-col>
          </el-row>
          <br>
          <el-table
            :data="tableData"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            border stripe
            >
            <el-table-column
              prop="categoryName"
              label="分类名称"
              with="180"
            >
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              with="180"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              with="100"
            >
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-card>
    </div>
</template>
<style>

</style>
<script>
    export default {
      data() {
        return {  
          tableData:[
            {
              id: 1,
              categoryName: "类型1",
              updateTime: "2023-07-14"
            },
            {
              id: 2,
              categoryName: "类型2",
              updateTime: "2023-07-15"
            },
            {
              id: 3,
              categoryName: "类型3",
              updateTime: "2023-07-15",
              children:[
                {
                  id: 4,
                  categoryName: "类型4",
                  updateTime: "2023-07-15",
                },
                {
                  id: 5,
                  categoryName: "类型5",
                  updateTime: "2023-07-15",
                  children:[
                      {
                        id: 6,
                        categoryName: "类型4",
                        updateTime: "2023-07-15",
                      },
                      {
                        id: 7,
                        categoryName: "类型5",
                        updateTime: "2023-07-15",
                      }
                    ]
                }
              ]
            }
          ]
        }
      },
      methods:{      
      }
    };
</script>