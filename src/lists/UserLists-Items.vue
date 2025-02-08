<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-white w-full max-w-sm px-1 md:max-w-4xl m-2 py-7 shadow-md rounded-sm border-1 border-Gray"
    >
      <div
        v-for="(address, index) in addresses"
        :key="index"
        class="mb-4 px-5 grid gap-6 grid-cols-1 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4 md:w-full md:px-7"
      >
        <div class="flex justify-between md:grid">
          <span class="text-Gray md:block md:mb-2">نام و نام خانوادگی</span>
          <span>{{ address.first_name }} {{ address.last_name }}</span>
        </div>
        <div class="flex justify-between md:grid">
          <span class="text-Gray md:block md:mb-2">جنسیت</span>
          <span>{{ address.gender === 'male' ? 'آقا' : 'خانم' }}</span>
        </div>
        <div class="flex justify-between md:grid">
          <span class="text-Gray md:block md:mb-2">شماره تلفن همراه</span>
          <span>{{ address.coordinate_mobile }}</span>
        </div>
        <div class="flex justify-between md:grid">
          <span class="text-Gray md:block md:mb-2">شماره تلفن ثابت</span>
          <span>{{ address.coordinate_phone_number || '-' }}</span>
        </div>
        <div class="grid grid-cols-1 md:grid gap-2">
          <span class="border-t-2 border-gray-400 md:border-0"></span>
          <span class="text-Gray md:mb-4 md:block">آدرس</span>
          <span>{{ address.address }}</span>
        </div>
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
