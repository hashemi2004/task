<template>
  <div
    class="bg-transparent flex flex-col items-center justify-center h-screen py-5 mx-4"
  >
    <div
      class="text-gray-700 text-3xl mb-4 border text-center rounded-full p-1 w-10 h-10 border-gray-700"
    >
      <span class="">&#10003;</span>
    </div>
    <h1 class="text-center font-bold text-gray-700 text-lg- mb-14">
      اطلاعات شما با موفقیت ثبت شد
    </h1>
    <button
      @click="ShowAddresses"
      class="py-2 px-24 md:px-32 border-2 border-Primary rounded-mdborder-Primary font-bold text-Primary"
    >
      مشاهده اطلاعات
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    ShowAddresses() {
      this.$emit('navigate', 'AddressLists');
      console.log('going to the Addreses');
    },
  },
};
</script>
