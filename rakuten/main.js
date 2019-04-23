const vm = new Vue({
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
      lng: '',
      apikey: 'https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?',
      format: 'JSON',
      datumType: 1,
      searchRadius: 1,
      applicationId: '1023196580476476311'
    }
  },
  methods: {
    search: function () {

      var address = this.searchFormData.placeName;
      const apikey = this.apikey;
      const format = this.format;
      const datumType = this.datumType;
      const searchRadius = this.searchRadius;
      const applicationId = this.applicationId;
      var checkInDate = this.searchFormData.checkInDate.getFullYear() + '-' + (this.searchFormData.checkInDate.getMonth() + 1) + '-' + this.searchFormData.checkInDate.getDate();
      var checkOutDate = this.searchFormData.checkOutDate.getFullYear() + '-' + (this.searchFormData.checkOutDate.getMonth() + 1) + '-' + this.searchFormData.checkOutDate.getDate();


      var map = new google.maps.Map(document.getElementById('map'));
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: address }, function (results, status) {
        if (status === 'OK' && results[0]) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();

          var url = apikey + 'format=' + format + '&checkinDate=' + checkInDate + '&checkoutDate=' + checkOutDate + '&latitude=' + this.lat + '&longitude=' + this.lng + '&datumType=' + datumType + '&searchRadius=' + searchRadius + '&applicationId=' + applicationId;
          console.log(url);

          axios.
            get(url)
            .then(function (res) {
              this.results = res.data;
              console.log(res.data);
            })
            .catch(function (err) {
              // エラー
              console.log(err);
            })
        } else {
          alert('住所が正しくないか存在しません。');
        }
      });

    }
  }
})
