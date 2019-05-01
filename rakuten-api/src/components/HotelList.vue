<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>検索結果</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
  </div>
  <el-row>
    <div v-for="(hotel,index) in vacantHotelData" v-bind:key="index" style="margin:10px 0px;">
      <a v-bind:href=vacantHotelData[index].hotel[0].hotelBasicInfo.hotelInformationUrl target="_blank">{{ vacantHotelData[index].hotel[0].hotelBasicInfo.hotelName }}</a>
      <el-tag type="info" size="small" style="margin-left:10px;"><router-link :to="{ name: 'hotel-detail', params: { id: vacantHotelData[index].hotel[0].hotelBasicInfo.hotelNo }}" target="_blank">詳細</router-link>
      </el-tag>
    </div>
  </el-row>
</el-card>

</template>

<script>
  export default {
    name: "hotel-list",
    props: ['vacantHotelData']
  }
</script>
