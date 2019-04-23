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

  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'app',
    data() {
      return {
        searchFormData: {
          placeName: '',
          checkInDate: '',
          checkOutDate: '',
        },
        results: null,
        map: null,
        geocoder: {},
        lat: '',
        lng: '',
        apikey: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?',
        format: 'JSON',
        datumType: 1,
        searchRadius: 1,
        applicationId: '1023196580476476311',
        vacantHotelData: []
      }
    },
    methods: {
      search: function () {
        this.map = new this.VueGoogleMaps.Map(document.getElementById('map'));
        this.geocoder = new this.VueGoogleMaps.Geocoder();
        this.geocoder.geocode({ address: this.searchFormData.placeName }, function (results, status) {
          if (status === 'OK' && results[0]) {
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();

            var url = this.apikey + 'format=' + this.format + '&checkinDate=' + this.checkInDate + '&checkoutDate=' + this.checkOutDate + '&latitude=' + this.lat + '&longitude=' + this.lng + '&datumType=' + this.datumType + '&searchRadius=' + this.searchRadius + '&applicationId=' + this.applicationId;


            axios.
              get(url)
              .then(res => {
                this.vacantHotelData = res.data.hotels;
                // eslint-disable-next-line
                console.log(this.vacantHotelData);
              })
              .catch(err => {
                // エラー
                // eslint-disable-next-line
                console.log(err);
              })
          } else {
            //住所が存在しない場合の処理
            alert('住所が正しくないか存在しません。');
          }
        })
      }
    }
  }
</script>
