<template>
  <div id="app" class="wrapper">
    <div id="content">
      <form style="width: 460px;">
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
            <el-button type="primary" v-on:click="search">Submit</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </form>
    </div>

    <div id="map"></div>
    <!-- 確認用 -->
    <p>住所: {{ searchFormData.placeName }}</p>
    <p>チェックイン: {{ searchFormData.checkInDate }}</p>
    <p>チェックアウト: {{ searchFormData.checkOutDate }}</p>
    <p>hotel:{{ vacantHotelData }}</p>

  </div>

</template>

<script>
  import axios from 'axios'
  import GoogleMapsApiLoader from 'google-maps-api-loader'
  export default {
    name: 'app',
    async mounted() {
          const gmapapi = await GoogleMapsApiLoader({
            apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY
          })
          this.google = gmapapi
          this.map = new this.google.maps.Map(document.getElementById('map'));
          this.geocoder = new this.google.maps.Geocoder();
    },
    data() {
      return {
        searchFormData: {
          placeName: '',
          checkInDate: '',
          checkOutDate: '',
        },
        results: null,
        geocoder: {},
        lat: '',
        lng: '',
        rakuten_apikey: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?',
        rakute_url: '',
        params: {
          format: 'json',
          datumType: 1,
          searchRadius: 1,
          applicationId: '1023196580476476311',
          checkInDate: '',
          checkOutDate: ''
        },
        vacantHotelData: []
      }
    },
    methods: {
      search: function () {
        var self = this; // thisの使い方

        this.geocoder.geocode({ address: this.searchFormData.placeName }, function (results, status) {
          if (status === 'OK' && results[0]) {
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();

            self.params.checkInDate = self.searchFormData.checkInDate.getFullYear() + '-' + (self.searchFormData.checkInDate.getMonth() + 1) + '-' + self.searchFormData.checkInDate.getDate();
            self.params.checkOutDate = self.searchFormData.checkOutDate.getFullYear() + '-' + (self.searchFormData.checkOutDate.getMonth() + 1) + '-' + self.searchFormData.checkOutDate.getDate();

            var url = self.rakuten_apikey + 'format=' + self.params.format + '&checkinDate=' + self.params.checkInDate + '&checkoutDate=' + self.params.checkOutDate + '&latitude=' + this.lat + '&longitude=' + this.lng + '&datumType=' + self.params.datumType + '&searchRadius=' + self.params.searchRadius + '&applicationId=' + self.params.applicationId;

            console.log(url);
            axios.
              get(url)
              .then(function(res) {
                self.vacantHotelData = res.data.hotels;
                console.log(self.vacantHotelData);
              })
              .catch(function(err) {
                console.log(err);
              })
          } else {
            alert('住所が正しくないか存在しません。');
          }
        })
      }
    }
  }
</script>
