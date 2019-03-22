<template>
  <div class="staff-list">
    <h1 class="text-center">员工列表</h1>
    <section class="filter-cont fx fx-x-between">
      <div class="w300 fx">
        <el-input placeholder="请输入搜索关键词" v-model="input2"></el-input>
        <el-button type="primary" @click="handleSearch" class="m-l-10">搜索</el-button>
      </div>
    </section>
    <el-table :data="staffList.list" border style="width: 100%">
      <el-table-column prop="staffId" label="工号"></el-table-column>
      <el-table-column prop="staffName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatSex"></el-table-column>
      <el-table-column prop="company" label="所属公司"></el-table-column>
      <el-table-column prop="office" label="办公地点"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="text" size="small">名片</el-button>
          <el-button @click="handleGetStaffInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="handleEditStaff(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="add-cont fx fx-y-center fx-x-between">
      <el-button type="primary" @click="handleAddStaff(null)">添加员工</el-button>
      <el-pagination v-show="staffList.total > params.limit" @current-change="handleCurrentChange" :page-size="params.limit" :background="true" layout="prev, pager, next, jumper" :total="staffList.total">
      </el-pagination>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'list',
  data() {
    return {
      // tableData: [{
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   sex: '男',
      //   company: '神州优车集团',
      //   office: '武汉研发中心',
      //   phone: '18571769976',
      //   email: 'qqqqq@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }],
      input2: '',
      params: {
        limit: 10,
        offset: 0
      }
    }
  },
  title() {
    return 'list'
  },
  mounted() {
    // this.handleGetStaffList()
  },
  computed: {
    ...mapState({
      staffList: state => state.staff.rows
    })
  },
  methods: {
    ...mapActions(['getStaffList', 'getStaffInfo', 'deleteStaff']),

    //性别显示转换
    formatSex(row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
    },

    // 获取员工列表
    handleGetStaffList() {
      console.log("发起获取员工列表请求")
      this.getStaffList(this.params).then(() => {
        console.log('获取员工列表数据成功')
      }, () => {

      })
    },
    // 获取单个员工信息
    handleGetStaffInfo(id) {
      console.log("获取员工信息id = " + id);
      this.$router.push({
        name: 'StaffDetails',
        params: {
          id: id
        }
      })
    },
    // 添加员工
    handleAddStaff(id) {
      console.log("添加员工信息")
      this.$router.push({
        name: 'AddStaff',
        params: {
          id: id
        }
      })
    },
    // 更新员工
    handleEditStaff(id) {
      console.log("更新员工信息id = " + id);
      this.$router.push({
        name: 'UpdateStaff',
        params: {
          id: id
        }
      })
    },
    // 删除员工
    handleDelete(index, id) {
      this.$confirm('确认删除该员工吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteStaff(id).then((data) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          console.log('删除成功')
          this.handleGetStaffList()
        })
      }).catch(() => { })
    },

    // 改变页码
    handleCurrentChange(val) {
      console.log("当前页" + val)
      this.params.offset = (val - 1) * this.params.limit
      this.handleGetStaffList()
    },
    handleSearch() {

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("beforeRouteEnter---list")
      vm.handleGetStaffList()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/common.scss";
.staff-list {
  background: $color-white;
  h1 {
    font-size: 20px;
    padding: 16px 0;
    border-bottom: 1px solid $color-border;
  }
  .add-cont {
    padding: 16px;
  }
}
</style>
