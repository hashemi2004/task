<template>
  <div>
    <button @click="fetchData" class="p-4 mt-10 text-gray-600 text-xl">
      آدرس ها و مشخصات
    </button>

    <PageLoader v-if="loading" class="p-6"></PageLoader>
    <div v-if="error" class="p-6 text-red-500">{{ error }}</div>

    <div v-if="addresses.length">
      <div v-for="address in addresses" v-bind:key="address.id">
        <ListItems v-bind:addressItems="address"></ListItems>
      </div>
    </div>
  </div>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue';
import ListItems from './UserLists-Items.vue';

export default {
  data() {
    return {
      addresses: [],
      loading: false,
      error: null,
    };
  },
  components: {
    ListItems,
    PageLoader,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = process.env.VUE_APP_API_URL;
      const authCode = process.env.VUE_APP_AUTH_CODE;

      this.loading = true;
      this.error = null;
      if (this.loading) console.log('fetching data');

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: authCode,
          },
        });
        if (!res.ok) {
          throw new Error('Response from server was not ok: ' + res.statusText);
        }
        const data = await res.json();
        console.log('server response is ok', data);

        this.addresses = data.slice(10, 15);
      } catch (error) {
        console.error('Error', error);
        this.error = 'خطا در دریافت اطلاعات';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
