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
      <AddressLists
        v-show="currentView === 'AddressLists'"
        :formData="valFormData"
      ></AddressLists>
      <RegisterResult
        v-show="currentView === 'RegisterResult'"
        @navigate="handleNavigation"
      ></RegisterResult>
    </div>
  </div>
</template>

<script>
import HeaderPart from './components/HeaderPart.vue';
import MapPage from './register/MapPage.vue';
import RegisterForm from './register/RegisterForm.vue';
import RegisterResult from './register/RegisterResult.vue';
import AddressLists from './addresses/AddressLists.vue';

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
    AddressLists,
    HeaderPart,
    RegisterResult,
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
