<template>
  <div class="h-full flex justify-center items-center md:h-screen">
    <div
      class="bg-white w-full py-7 px-5 mt-4 mb-20 rounded-sm shadow-md max-w-sm md:max-w-4xl md:mx-5"
    >
      <h1 class="text-sm font-semibold text-gray-700 md:text-base mb-10">
        لطفا مشخصات و آدرس خود را وارد کنید
      </h1>
      <form
        @submit.prevent="onSubmit"
        class="md:grid md:grid-rows-3 md:grid-cols-3 md:gap-6"
      >
        <RegisterFormInput
          v-model="formData.name"
          inputId="name"
          placeholder="مثال : محمد"
          label="نام"
          :formErrors="formErrors"
        ></RegisterFormInput>

        <RegisterFormInput
          v-model="formData.familyName"
          inputId="familyName"
          placeholder="مثال : رضایی"
          label="نام خانوادگی"
          :formErrors="formErrors"
        ></RegisterFormInput>

        <RegisterFormInput
          v-model="formData.mobileNumber"
          inputId="mobileNumber"
          placeholder="مثال : 09122001252"
          label="تلفن همراه"
          :formErrors="formErrors"
        ></RegisterFormInput>

        <RegisterFormInput
          v-model="formData.phoneNumber"
          inputId="phoneNumber"
          placeholder="مثال : 026361004565"
          label="شماره تلفن ثابت (اختیاری)"
          :formErrors="formErrors"
        ></RegisterFormInput>

        <RegisterFormInput
          v-model="formData.address"
          inputId="address"
          placeholder=" آدرس"
          label="آدرس"
          :formErrors="formErrors"
        ></RegisterFormInput>

        <div class="my-6 flex items-start col-span-1 md:gap-6">
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

        <SubButton type="submit" :click="onSubmit" :isLoading="this.isLoading"
          >ثبت و ادامه
        </SubButton>
      </form>
    </div>
  </div>
</template>

<script>
import SubButton from '@/components/SubButton.vue';
import RegisterFormInput from './RegisterFormInput.vue';

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
      isLoading: false,
    };
  },
  components: {
    SubButton,
    RegisterFormInput,
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
      this.isLoading = true;
      if (this.validateForm()) {
        this.formData.registered = true;
        this.$emit('ValidateFormData', this.formData);
      } else {
        this.isLoading = false;
        console.log('validation error');
      }
    },
  },
};
</script>
