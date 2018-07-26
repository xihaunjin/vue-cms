<template>
  <div class="staff-list">
    <h1 class="text-center">员工列表</h1>
    <section class="filter-cont fx fx-x-between">
      <div>
        <!--<el-select v-model="value4" clearable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-select v-model="value4" clearable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>-->
      </div>
      <div class="w300 fx">
        <el-input placeholder="请输入搜索关键词"
          v-model="input2"></el-input>
        <el-button type="primary"
          @click="handleIconClick"
          class="m-l-10">搜索</el-button>
      </div>
    </section>
    <el-table :data="staffList"
      border
      style="width: 100%">
      <el-table-column prop="staffName"
        label="姓名"></el-table-column>
      <el-table-column prop="sex"
        label="性别"
        :formatter="formatSex"></el-table-column>
      <el-table-column prop="company"
        label="所属公司"></el-table-column>
      <el-table-column prop="office"
        label="职位"></el-table-column>
      <el-table-column prop="phone"
        label="手机"></el-table-column>
      <el-table-column prop="email"
        label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEditCard(scope.row.id)"
            type="text"
            size="small">名片</el-button>
          <el-button @click="handleGetStaffInfo(scope.row.id)"
            type="text"
            size="small">查看</el-button>
          <el-button @click="handleEdit(scope.row.id)"
            type="text"
            size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row.id)"
            type="text"
            size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="add-cont fx fx-y-center fx-x-between">
      <el-button type="primary"
        @click="handleEdit('')">添加员工</el-button>
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="100">
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        sex: '男',
        company: '神州优车集团',
        office: '武汉研发中心',
        phone: '18571769976',
        email: 'qqqqq@qq.com',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        sex: '男',
        company: '神州优车集团',
        office: '武汉研发中心',
        phone: '18571769976',
        email: 'qqqqq@qq.com',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        sex: '男',
        company: '神州优车集团',
        office: '武汉研发中心',
        phone: '18571769976',
        email: 'qqqqq@qq.com',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        sex: '男',
        company: '神州优车集团',
        office: '武汉研发中心',
        phone: '18571769976',
        email: 'qqqqq@qq.com',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      input2: '',
      params: {
        // count: 10,
        // offset: 0,
        // search: ''
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
      staffList: state => state.staff.list
    })
  },
  methods: {
    ...mapActions(['getStaffList', 'getStaffInfo']),

    //性别显示转换
    formatSex(row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
    },

    // 获取员工列表
    handleGetStaffList() {
      console.log("aa")
      this.getStaffList(this.params).then(() => {
        console.log('获取数据成功')
      }, () => {

      })
    },
    // 获取单个员工信息
    handleGetStaffInfo(id) {
      console.log(id);
      this.$router.push({
        name: 'StaffDetails',
        query: {
          id: id
        }
      })
    },
    // 改变页码
    handleCurrentChange(val) {
      console.log(val)
      // this.params.offset = (val - 1) * 10
      // this.handleGetStaffList()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("hello")
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