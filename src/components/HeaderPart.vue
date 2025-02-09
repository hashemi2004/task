<template>
  <header class="bg-white w-full shadow-md p-4 fixed top-0 z-30">
    <nav class="relative flex items-center justify-between mx-10">
      <img
        src="../assets/achareLogo.svg"
        alt="آچاره"
        class="h-6 w-11 rounded-md cursor-pointer md:w-16 md:h-10"
        @click="$emit('navigate', 'RegisterForm')"
      />
      <div class="text-sm mx-2 md:mx-8">
        <a
          @click="$emit('navigate', 'RegisterForm')"
          class="hover:text-Primary cursor-pointer ml-3"
        >
          ثبت آدرس
        </a>
        <a
          @click="$emit('navigate', 'AddressLists')"
          class="hover:text-Primary cursor-pointer focus:text-Primary"
        >
          مشاهده آدرس ها
        </a>
      </div>
    </nav>
  </header>
</template>
