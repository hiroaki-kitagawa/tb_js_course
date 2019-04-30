<template>
  <div id="app" class="wrapper">
      <h3>ホテル詳細</h3>
      <section>
      <div class="photo">
        <img :href="imageurl">
      </div>
      <div class="info">
        <ul>
          <li>{{ hotelInfo[0].hotel[0].hotelBasicInfo.hotelName }}</li>
          <li>{{ this.separate(hotelInfo[0].hotel[0].hotelBasicInfo.hotelMinCharge) }}円</li>
          <li>{{ hotelInfo[0].hotel[0].hotelBasicInfo.reviewAverage }}</li>
          <!-- <li>ホテル画像: {{ hotelInfo[0].hotel[0].hotelBasicInfo.hotelImageUrl }}</li> -->
          <li>{{ hotelInfo[0].hotel[0].hotelBasicInfo.hotelSpecial }}</li>
          <li>{{ hotelInfo[0].hotel[0].hotelBasicInfo.access }}</li>
          <li>{{ hotelInfo[0].hotel[0].hotelBasicInfo.userReview }}</li>
        </ul>
      </div>
  </section>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "app",
    data() {
          return {
            loading: false,
            post: null,
            error: null,
            rakuten_apikey: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?',
            rakuten_api: {
              format: 'json',
              applicationId: '1023196580476476311',
            },
            hotelInfo: [],
            imageurl: ''
          }
        },
        created() {
          this.fetchData()
        },
        watch: {
          '$route': 'fetchData'
        },
        methods: {
          fetchData() {
            var self = this;
            var url = self.rakuten_apikey + 'format=' + self.rakuten_api.format + '&hotelNo=' + self.$route.params.id + '&applicationId=' + self.rakuten_api.applicationId;

            console.log(url);
            axios.
              get(url)
              .then(function (res) {
                self.hotelInfo = res.data.hotels;
                console.log(self.hotelInfo);
                self.imageurl = self.hotelInfo[0].hotel[0].hotelBasicInfo.hotelImageUrl;
              })
              .catch(function (err) {
                console.log(err);
              })
          },
          // 数値を３桁区切りにする
          separate(num){
              return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            }
        }
  }
</script>

<style>
  .photo {
    width: 200px; float: left;
  }
  .info {
    width: 70%; float: right;
  }
  .info ul {
    list-style: none;
  }
</style>
