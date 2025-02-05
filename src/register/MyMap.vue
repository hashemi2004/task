<template>
  <div class="absolute">
    <div id="map" style="height: 80vh; width: 100vw; z-index: 1"></div>

    <button @click="getUserLocation">Get My Location</button>

    <SubButton :click="sendToServer" type="submit">ثبت و ادامه</SubButton>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import SubButton from '../components/SubButton.vue';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,
      userLocation: {
        lat: null,
        lng: null,
      },
      marker: null,
      formDataR: {},
    };
  },
  props: {
    formData: {
      type: Array,
      required: true,
    },
  },
  components: {
    SubButton,
  },
  mounted() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    // Initialize Leaflet map
    this.map = L.map('map').setView([35.70528275624457, 51.35043249897096], 16); // Set initial view

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Handle map click
    this.map.on('click', this.handleMapClick);
  },
  methods: {
    sendToServer() {
      const url = 'https://stage.achareh.ir/api/karfarmas/address';
      const authCode = 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4';
      console.log(this.formData);
      const data = this.formData.map((form) => ({
        first_name: form.name,
        last_name: form.familyName,
        coordinate_mobile: form.mobileNumber,
        coordinate_phone_number: form.phoneNumber,
        address: form.address,
        region: 1,
        lat: this.userLocation.lat,
        lng: this.userLocation.lng,
        gender: form.gender,
      }));
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authCode,
        },
        body: JSON.stringify(data[0]),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              'Response from server was not ok: ' + res.statusText
            );
          }
          this.$emit('navigate', 'RegisterIsDone');
          return res.json();
        })
        .then((data) => console.log('Server response:', data))
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    handleMapClick(e) {
      const { lat, lng } = e.latlng;

      this.userLocation.lat = lat;
      this.userLocation.lng = lng;

      console.log(this.userLocation);
      // Move or create a marker at the clicked position
      if (this.marker) {
        this.marker.setLatLng([lat, lng]); // Move existing marker
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map); // Create new marker
      }

      this.map.setView([lat, lng], 16);

      console.log(this.userLocation);
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            this.userLocation = { lat: latitude, lng: longitude };

            console.log(this.userLocation);
            // Optionally, pan the map to the user's location
            this.map.setView([latitude, longitude], 16);
            if (this.marker) {
              this.marker.setLatLng([latitude, longitude]); // Move marker to user location
            } else {
              this.marker = L.marker([latitude, longitude])
                .addTo(this.map)
                .bindPopup('You are here!')
                .openPopup();
            }
          },
          (error) => {
            console.error(
              'Error occurred while fetching user location: ',
              error
            );
            alert(
              'Unable to retrieve your location. Please allow location access.'
            );
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
  },
};
</script>
