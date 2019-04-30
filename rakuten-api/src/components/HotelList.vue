<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>検索結果</span>
    <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
  </div>
  <div v-for="(hotel,index) in vacantHotelData" v-bind:key="index">
    <a v-bind:href=vacantHotelData[index].hotel[0].hotelBasicInfo.hotelInformationUrl target="_blank">{{ vacantHotelData[index].hotel[0].hotelBasicInfo.hotelName }}</a>
  </div>
</el-card>
</template>

<script>
  export default {
    name: "hotel-list",
    props: ['vacantHotelData']
  }
</script>
