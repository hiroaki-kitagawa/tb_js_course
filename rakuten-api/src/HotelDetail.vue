<template>
  <div id="app" class="wrapper">
    <h3>ホテル詳細</h3>
    <section class="clearfix">
      <div class="photo">
        <img :src=hotelInfo[0].hotel[0].hotelBasicInfo.hotelImageUrl>
      </div>
      <div class="info">
        <dl>
          <dt>ホテル名 : </dt><dd>{{ hotelInfo[0].hotel[0].hotelBasicInfo.hotelName }}</dd>
          <dt>最低宿泊料金 : </dt><dd>{{ this.separate(hotelInfo[0].hotel[0].hotelBasicInfo.hotelMinCharge) }}円</dd>
          <dt>レビュー平均点 : </dt><dd>{{ hotelInfo[0].hotel[0].hotelBasicInfo.reviewAverage }}</dd>
          <dt>特徴 : </dt><dd>{{ hotelInfo[0].hotel[0].hotelBasicInfo.hotelSpecial }}</dd>
          <dt>アクセス : </dt><dd>{{ hotelInfo[0].hotel[0].hotelBasicInfo.access }}</dd>
          <dt>レビュー : </dt><dd>{{ hotelInfo[0].hotel[0].hotelBasicInfo.userReview }}</dd>
        </dl>
      </div>
    </section>
    <section>
      <HotelPlanList :hotelInfo="hotelInfo"></HotelPlanList>
    </section>

  </div>
</template>

<script>
  import axios from 'axios'
  import HotelPlanList from './components/HotelPlanList.vue'
  export default {
    name: "app",
    components: { HotelPlanList },
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

            axios.
              get(url)
              .then(function (res) {
                self.hotelInfo = res.data.hotels;
                console.log(self.hotelInfo[0].hotel[0].hotelBasicInfo);
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
  .wrapper {
    width: 780px;
  }
  .photo {
    width: 230px; float: left;
  }
  .photo img {
    width: 100%;
  }
  .info {
    width: 70%; float: right;
  }
  .info dt {
    font-weight: bold;
  }
  .clearfix::after {
  content: "";
  display: block;
  clear: both;
  }
</style>
