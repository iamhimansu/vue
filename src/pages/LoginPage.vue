<script>
export default {
  name: "LoginPage",
  data() {
    return {
      passwordTypeMap: {false: 'text', true: 'password'},
      passwordEyeIconMap: {false: 'bi bi-eye-slash', true: 'bi bi-eye'},
      toggle: true,
      passwordType: 'password',
      passwordIcon: 'bi bi-eye'
    }
  },
  methods: {
    setPasswordType(toggle) {
      this.passwordType = this.passwordTypeMap[toggle];
      this.passwordIcon = this.passwordEyeIconMap[toggle];
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
          Login
        </h1>
        <h4 class="text-xs font-bold mb-3">
          Hi, Welcome back 👋
        </h4>
      </div>
      <div class="social-login w-full mt-3 mb-3">
        <button class="w-full border p-2 text-[10px] rounded font-bold hover:bg-gray-100">Login with Google</button>
      </div>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="email">Email</label>
        <div class="rounded-md shadow-sm">
          <input id="email"
                 class="block w-full text-sm rounded-md border ring-0 outline-0 py-1.5 pl-5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                 name="email"
                 placeholder="E.g. johndoe@email.com"
                 type="text">
        </div>
      </div>
      <div class="w-full mb-3">
        <label class="block text-xs font-medium leading-6 text-gray-900" for="password">Password</label>
        <div class="relative rounded-md shadow-sm">
          <input id="password"
                 :type="passwordType"
                 class="block w-full rounded-md border outline-0 py-1.5 pl-5 pr-20 text-gray-900 ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-sm"
                 name="password"
                 placeholder="Enter your password">
          <div class="absolute inset-y-0 right-0 flex items-center">
            <label class="sr-only">View</label>
            <button class="w-10 h-full" @click="setPasswordType(toggle=!toggle)"><i :class="passwordIcon"></i></button>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row place-content-between mb-3">
        <div class="relative flex flex-row place-items-center">
          <div class="place-items-center h-4 flex">
            <input id="remember-me" aria-describedby="remember-me-description" class="w-2.5 rounded h-2.5"
                   name="remember-me"
                   type="checkbox"></div>
          <div class="leading-6 text-sm ml-1">
            <label class="font-medium text-xs" for="remember-me">
              Remember me
            </label>
          </div>
        </div>
        <div>
          <router-link class="text-xs font-bold" to="/forgot">Forgot Password?</router-link>
        </div>
      </div>
      <div class="w-full mb-3">
        <button class="bg-gray-800 text-xs h-10 text-white rounded w-full p-2 text-center hover:bg-gray-700">Login
        </button>
      </div>
      <div class="w-full mt-2 mb-3 text-center text-xs">
        Not registered yet?
        <router-link class="text-black font-bold" to="/register">Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>