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
          <el-button type="primary" v-on:click="googleMap">Submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </form>

    <!-- 緯度•経度の確認用 -->
    <p>緯度: {{searchFormData.lat}}</p>
    <p>経度: {{searchFormData.lng}}</p>

  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=process.env.VUE_APP_GOOGLE_MAP_API_KEY&callback=initMap" async defer></script>
<script>
  export default {
    name: 'app',
    mounted() {
          this.geocoder = new google.maps.Geocoder();
        },
    data() {
      return {
        geocoder: {},
        searchFormData: {
          placeName: '',
          checkInDate: '',
          checkOutDate: '',
        },
        results: null,
        keyword: '',
        params: {
          format: 'json',
          checkinDate: searchFormData.checkInDate,
          checkoutDate: searchFormData.checkOutDate,
          latitude: searchFormData.lat,
          longitude: searchFormData.lng,
          applicationId: 1045443135407692478
        }
      }
    },
    methods: {
      mapSearch() {
        geocoder.geocode({ address: searchFormData.placeName }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location);

            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();


          } else {
            alert('住所が正しくないか存在しません');
            target.style.display = 'none';
          }
        });
      },
      rakuten: function() {
        var self = this;
        axios.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426', {params: this.params})
          .then(function (res) {
            self.results = res.data.items;
          })
          .catch(function (err) {
            // エラー
            console.log(err);
          })
      }
  }
}
// googleMap()
// rakuten()
</script>

<style>

</style>
