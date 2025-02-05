<template>
  <div
    class="bg-transparent flex flex-col items-center justify-center h-screen py-5 mx-4"
  >
    <div
      class="text-gray-700 text-3xl mb-4 text-center border rounded-full w-10 h-10 border-gray-700"
    >
      <span>&#10003;</span>
    </div>
    <h1 class="text-center font-bold text-gray-700 text-lg- mb-14">
      اطلاعات شما با موفقیت ثبت شد
    </h1>
    <button
      @click="gotoaddreses"
      class="py-2 px-5 border-2 rounded-md w-full border-Primary font-bold text-Primary"
    >
      مشاهده اطلاعات
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    gotoaddreses() {
      this.$emit('navigate', 'UsersLists');
      console.log('going to the list');
    },
  },
};
</script>
