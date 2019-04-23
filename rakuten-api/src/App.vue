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
    <!-- <p>{{ apikey }}</p> -->
    <p id="lat">緯度: {{ lat }}</p>
    <p id="lng">経度: {{ lng }}</p>

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
          checkOutDate: '',
        },
        results: null,
        map: null,
        mapPosition: { lat: 35.658034, lng: 139.701636 },
        geocoder: {},
        lat: '',
        lng: '',
        params: {
          applicationId: '1023196580476476311',
          format: 'JSON',
          latitude: this.lat,
          longitude: this.lng,
          searchRadius: '1'
        }
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
          } else {
            //住所が存在しない場合の処理
            alert('住所が正しくないか存在しません。');
          }
        })
      },
      // rakuten: function () {
      //   axios.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?', { params: this.params })
      //     .then(function (res) {
      //       // 処理
      //       console.log(res);
      //     })
      //     .catch(function (err) {
      //       // エラー
      //       console.log(err);
      //     })
      // }
    }
  }


</script>
