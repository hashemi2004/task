<template>
  <div class="h-full flex justify-center items-center md:h-screen">
    <div
      class="bg-white w-full py-7 px-5 mt-10 mb-20 rounded-sm shadow-md max-w-sm md:max-w-4xl md:m-5"
    >
      <p class="text-sm font-semibold mb-4 text-gray-700 md:text-base">
        لطفا مشخصات و آدرس خود را وارد کنید
      </p>
      <form
        @submit.prevent="onSubmit"
        class="md:grid md:grid-rows-3 md:grid-cols-3 md:gap-6"
      >
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-xs font-bold mb-2"
            >نام</label
          >
          <div class="relative">
            <input
              type="text"
              v-model.trim="formData.name"
              id="name"
              placeholder="مثال : محمد"
              class="appearance-none border-2 text-sm rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-Primary"
            />
            <button
              v-if="formData.name"
              @click.prevent="formData.name = ''"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p v-if="formErrors.name" class="text-Secondary text-xs mt-1">
            {{ formErrors.name }}
          </p>
        </div>

        <div class="mb-4">
          <label
            for="familyName"
            class="block text-gray-700 text-xs font-bold mb-2"
            >نام خانوادگی</label
          >

          <div class="relative">
            <input
              type="text"
              id="familyName"
              v-model.trim="formData.familyName"
              placeholder="مثال : رضایی"
              class="appearance-none border-2 text-sm rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-Primary"
            />

            <button
              v-if="formData.familyName"
              @click.prevent="formData.familyName = ''"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p v-if="formErrors.familyName" class="text-Secondary text-xs mt-1">
            {{ formErrors.familyName }}
          </p>
        </div>

        <div class="mb-4">
          <label
            for="mobileNumber"
            class="block text-gray-700 text-xs font-bold mb-2"
            >تلفن همراه</label
          >
          <div class="relative">
            <input
              type="text"
              id="mobileNumber"
              v-model.trim="formData.mobileNumber"
              placeholder="مثال : 09122001252"
              class="appearance-none border-2 text-sm rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-Primary"
            />
            <button
              v-if="formData.mobileNumber"
              @click.prevent="formData.mobileNumber = ''"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p v-if="formErrors.mobileNumber" class="text-Secondary text-xs mt-1">
            {{ formErrors.mobileNumber }}
          </p>
        </div>

        <div class="mb-4">
          <label
            for="phoneNumber"
            class="block text-gray-700 text-xs font-bold mb-2"
            >شماره تلفن ثابت (اختیاری)</label
          >

          <div class="relative">
            <input
              type="text"
              id="phoneNumber"
              v-model.trim="formData.phoneNumber"
              placeholder="مثال : 026361004565"
              class="appearance-none border-2 text-sm rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-Primary"
            />
            <button
              v-if="formData.phoneNumber"
              @click.prevent="formData.phoneNumber = ''"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p v-if="formErrors.phoneNumber" class="text-Secondary text-xs mt-1">
            {{ formErrors.phoneNumber }}
          </p>
        </div>

        <div class="mb-6 col-span-2">
          <label
            for="address"
            class="block text-gray-700 text-xs font-bold mb-2"
            >آدرس</label
          >
          <div class="relative">
            <input
              id="address"
              v-model.trim="formData.address"
              class="appearance-none border-2 rounded-md w-full py-7 px-3 md:py-3 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-Primary"
            />
            <button
              v-if="formData.address"
              @click.prevent="formData.address = ''"
              class="absolute top-6 left-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p v-if="formErrors.address" class="text-Secondary text-xs mt-1">
            {{ formErrors.address }}
          </p>
        </div>

        <div class="mb-6 flex items-start col-span-1 md:gap-6">
          <label class="block text-gray-700 text-xs font-bold mb-2"
            >جنسیت</label
          >
          <div class="flex items-center gap-4">
            <label class="inline-flex items-center mr-4">
              <input
                id="male"
                type="radio"
                value="male"
                v-model="formData.gender"
                class="text-Primary focus:ring-Primary"
              />
              <span class="mr-2 text-gray-700">آقا</span>
            </label>
            <label class="inline-flex items-center">
              <input
                id="female"
                type="radio"
                value="female"
                v-model="formData.gender"
                class="bg-Primary text-Primary focus:ring-Primary"
              />
              <span class="mr-2 text-gray-700">خانم</span>
            </label>
          </div>
          <p v-if="formErrors.gender" class="text-Secondary text-xs mr-3 mt-1">
            {{ formErrors.gender }}
          </p>
        </div>

        <SubButton type="submit" :click="onSubmit">ثبت و ادامه </SubButton>
      </form>
    </div>
  </div>
</template>

<script>
import SubButton from '@/components/SubButton.vue';

export default {
  data() {
    return {
      formData: {
        name: '',
        familyName: '',
        mobileNumber: '',
        phoneNumber: '',
        address: '',
        gender: '',
        registered: false,
      },
      formErrors: {},
    };
  },
  components: {
    SubButton,
  },
  methods: {
    validateForm() {
      this.formErrors = {};

      if (this.formData.name.length < 3) {
        this.formErrors.name = 'نام باید حداقل 3 حرف باشد.';
      }

      if (this.formData.familyName.length < 3) {
        this.formErrors.familyName = 'نام خانوادگی باید حداقل 3 حرف باشد.';
      }

      const mobileRegex = /^09\d{9}$/;
      if (!mobileRegex.test(this.formData.mobileNumber)) {
        this.formErrors.mobileNumber =
          'شماره تلفن همراه باید 11 رقم و با 09 شروع شود.';
      }

      if (this.formData.phoneNumber) {
        const phoneRegex = /^0\d{10}$/;
        if (!phoneRegex.test(this.formData.phoneNumber)) {
          this.formErrors.phoneNumber =
            'شماره تلفن ثابت باید 11 رقم و با 0 شروع شود.';
        }
      }

      if (this.formData.address.length < 10) {
        this.formErrors.address = 'آدرس باید حداقل 10 حرف باشد.';
      }

      if (!this.formData.gender) {
        this.formErrors.gender = 'لطفا جنسیت را مشخص کنید.';
      }

      return Object.keys(this.formErrors).length === 0;
    },
    onSubmit() {
      if (this.validateForm()) {
        this.formData.registered = true;
        this.$emit('ValidateFormData', this.formData);
      } else {
        console.log('validation error');
      }
    },
  },
};
</script>
