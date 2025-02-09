<template>
  <div :class="['mb-4']">
    <label :for="inputId" class="block text-gray-700 text-xs font-bold mb-2">{{
      label
    }}</label>
    <div class="relative">
      <input
        type="text"
        v-model.trim="inputValue"
        :id="inputId"
        :placeholder="placeholder"
        :class="[
          'appearance-none border-2 text-sm rounded-md w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline',
          formError ? 'border-Secondary' : 'focus:border focus:border-Primary',
        ]"
      />
      <button
        v-if="inputValue"
        @click.prevent="clearValue"
        class="absolute bg-gray-200 rounded-full w-5 h-5 top-1/2 left-3 transform -translate-y-1/2 text-white font-extrabold hover:text-white text-center"
      >
        &times;
      </button>
    </div>
    <p v-if="formError" class="text-Secondary text-xs mt-1">
      {{ formError }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'RegisterFormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Enter text...',
    },
    value: {
      type: String,
      default: '',
    },
    formErrors: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    formError() {
      return this.formErrors[this.inputId] || '';
    },
  },
  methods: {
    clearValue() {
      this.inputValue = '';
    },
  },
};
</script>
