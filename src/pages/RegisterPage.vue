<script>
import RegisterUser from "@/pages/js/RegisterUser";
import ErrorSummary from "@/components/ErrorSummary.vue";
import {mapGetters} from "vuex";

export default {
  name: "RegisterPage",
  components: {ErrorSummary},
  computed:{
    ...mapGetters(['getDB'])
  },
  data() {
    return {
      passwordType: 'password',
      passwordIcon: 'bi bi-eye',
      name: '',
      password: '',
      passwordConfirm: '',
      email: '',
      errors: []
    }
  },
  methods: {
    setPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
      this.passwordIcon = this.passwordIcon === 'bi bi-eye' ? 'bi bi-eye-slash' : 'bi bi-eye';
    },
    register() {
      const User = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      };
      const Register = new RegisterUser(User, this.getDB);
      this.errors = Register.collectErrors();
      Register.save();
    }
  }
}
</script>

<template>
  <div class="my-3 p-2 py-4 md:p-8">
    <div
        class="p-8 flex flex-col w-full md:w-96 place-items-start md:border border-gray-100 md:shadow-xl md:rounded mx-auto">
      <div class="header">
        <h1 class="text-2xl font-bold mb-2">
          Register
        </h1>
        <h4 class="text-xs font-bold mb-3">
          Hi, please register
        </h4>
      </div>
      <div class="social-login w-full mt-3 mb-3">
        <button class="w-full border p-2 text-[10px] rounded font-bold hover:bg-gray-100">Login with Google</button>
      </div>
      <error-summary :errors="errors"></error-summary>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="name">Name</label>
        <div class="rounded-md shadow-sm">
          <input id="name" v-model="name"
                 class="block w-full text-sm rounded-md border ring-0 outline-0 py-1.5 pl-5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                 name="name"
                 placeholder="Name"
                 type="text">
        </div>
      </div>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="email">Email</label>
        <div class="rounded-md shadow-sm">
          <input id="email" v-model="email"
                 class="block w-full text-sm rounded-md border ring-0 outline-0 py-1.5 pl-5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                 name="email"
                 placeholder="E.g. johndoe@email.com"
                 type="email">
        </div>
      </div>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="password">Password</label>
        <div class="relative rounded-md shadow-sm">
          <input id="password" v-model="password"
                 :type="passwordType"
                 class="block w-full rounded-md border outline-0 py-1.5 pl-5 pr-20 text-gray-900 ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-sm"
                 name="password"
                 placeholder="Enter your password">
          <div class="absolute inset-y-0 right-0 flex items-center">
            <label class="sr-only">View</label>
            <button class="w-10 h-full" @click="setPasswordType"><i :class="passwordIcon"></i></button>
          </div>
        </div>
      </div>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="re-password">Re-enter Password</label>
        <div class="relative rounded-md shadow-sm">
          <input id="re-password" v-model="passwordConfirm"
                 :type="passwordType"
                 class="block w-full rounded-md border outline-0 py-1.5 pl-5 pr-20 text-gray-900 ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-sm"
                 name="password"
                 placeholder="Confirm your password">
        </div>
      </div>
      <div class="w-full mb-3">
        <button class="bg-gray-800 text-xs h-10 text-white rounded w-full p-2 text-center hover:bg-gray-700"
                @click="register()">Register
        </button>
      </div>
      <div class="w-full mt-2 mb-3 text-center text-xs">
        Have an account?
        <router-link class="text-black font-bold" to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>