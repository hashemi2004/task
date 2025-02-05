<template>
  <header class="bg-white w-full shadow-md p-4 fixed top-0 z-30">
    <nav class="relative flex items-center justify-between mx-auto">
      <img
        src="@/assets/Achare-logo.png"
        alt="آچاره"
        class="h-9 w-20 rounded-md cursor-pointer"
        @click="$emit('navigate', 'RegisterForm')"
      />
      <div class="text-sm mx-2">
        <a
          @click="$emit('navigate', 'RegisterForm')"
          class="hover:text-Primary cursor-pointer ml-3"
        >
          ثبت آدرس
        </a>
        <a
          @click="$emit('navigate', 'UsersLists')"
          class="hover:text-Primary cursor-pointer"
        >
          مشاهده آدرس ها
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>
