<template>
  <div>
    <el-table :data="arrs" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="text" label="文本" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <el-button type="primary" @click="add">添加用户</el-button>
    <span>{{this.$store.state.count}}</span>
    <!--  -->
    <!-- 对话框 -->
    <el-dialog
      :title="i == 1 ? '添加用户' : '编辑'"
      :visible.sync="dialogTableVisible"
    >
      <el-form :model="tableData">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="tableData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文本" :label-width="formLabelWidth">
          <el-input v-model="tableData.text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
import instance from "../../api/index";
export default {
  name: "HomeIndex",
  data() {
    return {
      arrs: null,
      dialogTableVisible: false,
      tableData: {
        id: 0,
        name: "tom",
        text: "水电费",
      },
      formLabelWidth: "120px",
      i: 0,
    };
  },
  methods: {
    add() {
      this.i = 1;
      this.tableData.name = "";
      this.tableData.text = "";
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    sure() {
      this.dialogTableVisible = false;
      if(this.i==1)return this.getpost();
      this.getedit();
    },
    // 编辑
    handleEdit(a, b) {
      // console.log(a, b);
      this.i = 0;
      this.dialogTableVisible = !this.dialogTableVisible;
      this.tableData.name = b.name;
      this.tableData.text = b.text;
      this.tableData.id = b.id;
    },
    // 删除
    handleDelete(a, b) {
      // console.log(a, b);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(a),
            this.$message({
              type: "success",
              message: "删除成功!",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async gethomeindex() {
      let { data } = await instance.get("/homeindex");
      // console.log(data);
      this.arrs = data;
    },
    // 修改
    async getedit() {
      let name = this.tableData.name;
      let text = this.tableData.text;
      let id = this.tableData.id;
      let { data } = await instance.put("/homeindex/edit/" + id, {
        name,
        text,
      });
      // console.log(data);
      this.gethomeindex();
    },
    // 删除
    async del(index) {
      let { data } = await instance.delete("/homeindex/del/" + index);
      // console.log(data);
      this.gethomeindex();
    },
    // 添加
    async getpost() {
      let name = this.tableData.name;
      let text = this.tableData.text;
      let { data } = await instance.post("/homeindex/add", { name, text });
      // console.log(data);
      this.gethomeindex();
    },
  },
  created() {
    this.gethomeindex();
  },
};
</script>

<style scoped>
</style>