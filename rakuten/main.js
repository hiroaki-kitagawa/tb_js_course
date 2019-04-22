new Vue({
  el: "#app",
  data() {
    return {
      searchFormData: {
        placeName: '',
        checkInDate: '',
        checkOutDate: '',
      },
      results: null,
      lat: '',
      lng: ''
    }
  },
  methods: {
    search() {
      var address = this.searchFormData.placeName; //住所を指定
      // var address = "東京都新宿区西新宿2-8-1";//住所を指定
      // var target = document.getElementById('map');
      var map = new google.maps.Map(document.getElementById('map'));
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: address }, function (results, status) {
        if (status === 'OK' && results[0]) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log(this.checkinDate);
          console.log(this.searchFormData.checkoutDate);
          // console.log(this.lat);
          // console.log(this.lng);
          // rakuten(this.lat, this.lng);
        } else {
          alert('住所が正しくないか存在しません。');
        }
      });

      axios.get('https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?', {
        params: {
          applicationId: 1023196580476476311,
          format: 'JSON',
          checkinDate: this.searchFormData.checkInDate,
          checkoutDate: this.searchFormData.checkoutDate,
          latitude: this.lat,
          longitude: this.lng,
          searchRadius: 1
        }
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          // エラー
          console.log(err);
        })



    },
  }
})
