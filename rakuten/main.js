new Vue({
  el: "#app",
  data: {
    searchFormData: {
      placeName: '',
      checkInDate: '',
      checkOutDate: '',
    },
    address: "東京都新宿区西新宿2-8-1",
    lat: '',
    lng: ''
  },
  methods: {
    search() {
      // var address = this.searchFormData.placeName; //住所を指定
      // var address = "東京都新宿区西新宿2-8-1";//住所を指定
      // var target = document.getElementById('map');
      var map = new google.maps.Map(document.getElementById('map'));
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: this.searchFormData.placeName}, function (results, status) {
        if (status === 'OK' && results[0]) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          // console.log(this.lat);
          // console.log(this.lng);
          // rakuten(this.lat, this.lng);

        } else {
          //住所が存在しない場合の処理
          alert('住所が正しくないか存在しません。');

        }

      });

      
    },
    rakuten: function () {
      this.initMap();
      axios.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426', { params: this.params })
        .then(function (res) {
          self.results = res.data.items;
        })
        .catch(function (err) {
          // エラー
          console.log(err);
        })
      }
  }
})
