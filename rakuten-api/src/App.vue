<template>
  <div id="app">

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
          <el-button type="primary" v-on:click="initMap">Submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </form>

    <div id="map"></div>

    <!-- 確認用 -->
    <p>住所: {{ searchFormData.placeName }}</p>
    <p>チェックイン: {{ searchFormData.checkInDate }}</p>
    <p>チェックアウト: {{ searchFormData.checkOutDate }}</p>
    <!-- <p>{{ apikey }}</p> -->
    <p>緯度: {{mapData.lat}}</p>
    <p>経度: {{mapData.lng}}</p>

  </div>
</template>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=process.env.VUE_APP_GOOGLE_MAP_API_KEY&callback=initMap">
</script>
<script>
  export default {
    name: 'app',
    data() {
      return {
        apikey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
        searchFormData: {
          placeName: '',
          checkInDate: '',
          checkOutDate: '',
        },
        mapData: {
          address: '',
          lat: '',
          lng: ''
        }
      }
    },
    methods: {
        initMap: function() {
          var address = this.placeName ; //住所を指定

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode({ address: mapData.address }, function (results, status) {
            if (status === 'OK' && results[0]) {

              // console.log(results[0].geometry.location);

              mapData.lat = results[0].geometry.location.lat();
              mapData.lng = results[0].geometry.location.lng();

            } else {
              //住所が存在しない場合の処理
              alert('住所が正しくないか存在しません。');
              target.style.display = 'none';
            }

        });
      }
    }
  }

</script>
