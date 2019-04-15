<template>
  <div id="app">

    <form>
      <el-form ref="searchFormData" :model="searchFormData" label-width="120px">
        <el-form-item label="Activity place">
          <el-input v-model="searchFormData.placeName"></el-input>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Pick a date" v-model="searchFormData.checkInDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Pick a date" v-model="searchFormData.checkOutDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </form>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      searchFormData: {
        placeName: '',
        checkInDate: '',
        checkOutDate: ''
      }
    }
  },
  methods: function() {
    const axios = require('axios');

    axios.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?format=json&applicationId=1045443135407692478',{
      params: {
        format: json,
        ID: 1045443135407692478
      }
    })
      .then(function (res) {
        
      })
      .catch(function (err) {
        // エラー
        console.log(err);
      })
  }
}


</script>

<style>

</style>
