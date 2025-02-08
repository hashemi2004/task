<template>
  <div id="app" class="bg-gray-100 font-vazirmatn">
    <div class="mb-16">
      <HeaderPart @navigate="handleNavigation"></HeaderPart>
    </div>

    <div class="relative">
      <RegisterForm
        v-show="currentView === 'RegisterForm'"
        @ValidateFormData="addData"
      >
      </RegisterForm>
      <MapPage
        v-show="currentView === 'MapPage'"
        :formData="valFormData"
        @navigate="handleNavigation"
      ></MapPage>
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
import MapPage from './register/MapPage.vue';
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
    MapPage,
    UsersLists,
    HeaderPart,
    RegisterIsDone,
  },
  methods: {
    addData(formData) {
      this.valFormData.push(formData);
      this.currentView = 'MapPage';
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
