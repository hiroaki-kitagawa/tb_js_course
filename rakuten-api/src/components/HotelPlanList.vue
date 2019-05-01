<template>
    <div slot="header" class="clearfix">
      <h3>宿泊プラン</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="planName" label="プラン名" width="360"></el-table-column>
        <el-table-column prop="roomName" label="部屋情報" width="180"></el-table-column>
        <el-table-column prop="totalCharge" label="宿泊料金" width="100"></el-table-column>
        <el-table-column label="予約">
          <template slot-scope="scope">
            <a :href=scope.row.reserve target="_blank"><el-button size="mini" type="primary">予約</el-button></a>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: "plan-list",
    props: ['hotelInfo'],
    data() {
      return {
        tableData: [],
      }
    },
    created() {
      this.listup()
    },
    methods: {
      listup() {
        var self = this;

        for (var i = 0; i < (self.hotelInfo[0].hotel.length - 1); i++) {
          self.tableData[i] = Array([]);
          self.tableData[i].reserve = self.hotelInfo[0].hotel[i + 1].roomInfo[0].roomBasicInfo.reserveUrl;
          self.tableData[i].planName = self.hotelInfo[0].hotel[i + 1].roomInfo[0].roomBasicInfo.planName;
          self.tableData[i].roomName = self.hotelInfo[0].hotel[i + 1].roomInfo[0].roomBasicInfo.roomName;
          self.tableData[i].totalCharge = self.separate(self.hotelInfo[0].hotel[i + 1].roomInfo[1].dailyCharge.total);
        }
        console.log(self.tableData);

      },
      // 数値を３桁区切りにする
      separate(num) {
        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      },
      handleEdit(row) {
        console.log(row);
      },
    }

  }
</script>
