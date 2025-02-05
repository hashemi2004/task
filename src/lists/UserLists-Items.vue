<template>
  <div
    class="font-sans bg-white px-6 m-4 py-8 shadow-md rounded-sm border-1 border-Gray"
  >
    <div v-for="(address, index) in addresses" :key="index" class="mb-10">
      <div class="flex justify-between mb-3">
        <span class="text-Gray">نام و نام خانوادگی</span>
        <span>{{ address.first_name }} {{ address.last_name }}</span>
      </div>
      <div class="flex justify-between mb-3">
        <span class="text-Gray">جنسیت</span>
        <span>{{ address.gender === 'male' ? 'آقا' : 'خانم' }}</span>
      </div>
      <div class="flex justify-between mb-3">
        <span class="text-Gray">شماره تلفن همراه</span>
        <span>{{ address.coordinate_mobile }}</span>
      </div>
      <div class="flex justify-between mb-3">
        <span class="text-Gray">شماره تلفن ثابت</span>
        <span>{{ address.coordinate_phone_number || '-' }}</span>
      </div>
      <div class="border-t-2 border-gray-600">
        <span class="text-Gray my-4 block">آدرس</span>
        <span>{{ address.address }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addresses: [this.addressItems],
    };
  },
  props: ['addressItems'],
};
</script>
