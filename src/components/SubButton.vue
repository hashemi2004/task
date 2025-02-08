<template>
  <div
    class="w-screen h-16 bottom-0 right-0 z-30 left-0 fixed bg-white flex justify-center"
  >
    <button
      :type="type"
      @click="handleClick"
      class="bg-Primary bottom-2 fixed hover:bg-Primary text-white font-bold py-3 px-32 rounded focus:outline-none focus:shadow-outline"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: 'SubmitButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    click: {
      type: Function,
    },
  },
  methods: {
    handleClick(event) {
      this.click(event);
    },
  },
};
</script>
