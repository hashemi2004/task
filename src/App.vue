<template>
  <div id="app" class="bg-gray-100">
    <div class="mb-16">
      <HeaderPart @navigate="handleNavigation"></HeaderPart>
    </div>

    <div class="relative">
      <RegisterForm
        v-show="currentView === 'RegisterForm'"
        @ValidateFormData="addData"
      ></RegisterForm>
      <MyMap
        v-show="currentView === 'MyMap'"
        :formData="valFormData"
        @navigate="handleNavigation"
      ></MyMap>
      <UsersLists
        v-show="currentView === 'UsersLists'"
        :formData="valFormData"
      ></UsersLists>
      <RegisterIsDone
        v-show="currentView === 'RegisterIsDone'"
        @navigate="handleNavigation"
      ></RegisterIsDone>
    </div>
  </div>
</template>

<script>
import HeaderPart from './components/HeaderPart.vue';
import MyMap from './register/MyMap.vue';
import UsersLists from './lists/UsersLists.vue';
import RegisterForm from './register/RegisterForm.vue';
import RegisterIsDone from './register/RegisterIsDone.vue';

export default {
  name: 'App',
  data() {
    return {
      valFormData: [],
      currentView: 'RegisterForm',
    };
  },
  components: {
    RegisterForm,
    MyMap,
    UsersLists,
    HeaderPart,
    RegisterIsDone,
  },
  methods: {
    addData(formData) {
      this.valFormData.push(formData);
      this.currentView = 'MyMap';
    },
    handleNavigation(view) {
      if (view === 'ShowLists' && this.valFormData.length === 0) {
        alert('هنوز اطلاعاتی وارد نکردید ، لطفا اطلاعات خود را وارد کنید');
        this.currentView = 'RegisterForm';
      } else {
        this.currentView = view;
      }
    },
  },
};
</script>
