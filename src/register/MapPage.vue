<!-- <template>
  <div class="container w-full md:mx-auto md:px-4 md:py-6 h-screen">
    <div class="rounded-lg shadow-md max-w-4xl mx-auto">
      <div class="relative">
        <div class="grid grid-cols-3">
          <button
            @click="$emit('navigate', 'RegisterForm')"
            class="text-gray-600"
          >
            <img
              src="../assets/backIcon.svg"
              class="w-6 h-6 my-4 text-gray-600"
            />
          </button>
          <p class="text-center my-4">انتخاب موقعیت</p>
        </div>
        <div id="map" class="w-full h-screen rounded-sm z-10"></div>

        <button
          @click="getUserLocation"
          class="right-7 bottom-10 absolute z-20 text-gray-400 w-12 h-12 flex justify-center items-center bg-white rounded-full"
        >
          <img src="../assets/locationIcon.svg" />
        </button>
      </div>

      <SubButton :click="sendToServer" type="submit">ثبت و ادامه</SubButton>
    </div>
  </div>
</template> -->

<template>
  <div class="md:max-w-3xl md:px-2 md:py-10 md:mx-auto relative h-screen">
    <div class="h-full md:max-h-96">
      <div
        class="z-20 grid grid-cols-3 w-full h-12 p-4 bg-gray-300 bg-opacity-80"
      >
        <button
          @click="$emit('navigate', 'RegisterForm')"
          class="flex justify-start text-gray-600"
        >
          <img src="../assets/backIcon.svg" class="w-6 h-6 text-gray-600" />
        </button>
        <span class="flex justify-center">انتخاب موقعیت</span>
      </div>

      <div id="map" class="w-full h-full z-0 relative"></div>
      <button
        @click="getUserLocation"
        class="right-7 bottom-10 md:bottom-60 z-20 w-12 absolute h-12 flex justify-center items-center bg-white rounded-full"
      >
        <img src="../assets/locationIcon.svg" />
      </button>
    </div>

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
    this.map = L.map('map').setView([35.70528275624457, 51.35043249897096], 16);

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
      const url = process.env.VUE_APP_API_URL;
      const authCode = process.env.VUE_APP_AUTH_CODE;
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
