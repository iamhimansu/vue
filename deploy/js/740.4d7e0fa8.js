"use strict";(self["webpackChunkpersonal"]=self["webpackChunkpersonal"]||[]).push([[740],{740:function(e,s,l){l.r(s),l.d(s,{default:function(){return v}});var t=l(9199);const a={class:"my-3 p-2 py-4 md:p-8"},o={class:"p-8 flex flex-col w-full md:w-96 place-items-start md:border border-gray-100 md:shadow-xl md:rounded mx-auto"},r=(0,t.uE)('<div class="header"><h1 class="text-2xl font-bold mb-2"> Login </h1><h4 class="text-xs font-bold mb-3"> Hi, Welcome back 👋 </h4></div><div class="social-login w-full mt-3 mb-3"><button class="w-full border p-2 text-[10px] rounded font-bold hover:bg-gray-100">Login with Google</button></div><div class="w-full mb-3"><label class="block text-xs font-medium leading-6 text-gray-900" for="email">Email</label><div class="rounded-md shadow-sm"><input id="email" class="block w-full text-sm rounded-md border ring-0 outline-0 py-1.5 pl-5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" name="email" placeholder="E.g. johndoe@email.com" type="text"></div></div>',3),d={class:"w-full mb-3"},i=(0,t._)("label",{class:"block text-xs font-medium leading-6 text-gray-900",for:"password"},"Password",-1),n={class:"relative rounded-md shadow-sm"},c=["type"],m={class:"absolute inset-y-0 right-0 flex items-center"},p=(0,t._)("label",{class:"sr-only"},"View",-1),u={class:"w-full flex flex-row place-content-between mb-3"},b=(0,t.uE)('<div class="relative flex flex-row place-items-center"><div class="place-items-center h-4 flex"><input id="remember-me" aria-describedby="remember-me-description" class="w-2.5 rounded h-2.5" name="remember-me" type="checkbox"></div><div class="leading-6 text-sm ml-1"><label class="font-medium text-xs" for="remember-me"> Remember me </label></div></div>',1),w=(0,t._)("div",{class:"w-full mb-3"},[(0,t._)("button",{class:"bg-gray-800 text-xs h-10 text-white rounded w-full p-2 text-center hover:bg-gray-700"},"Login ")],-1),x={class:"w-full mt-2 mb-3 text-center text-xs"};function f(e,s,l,f,g,y){const h=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)("div",a,[(0,t._)("div",o,[r,(0,t._)("div",d,[i,(0,t._)("div",n,[(0,t._)("input",{id:"password",type:g.passwordType,class:"block w-full rounded-md border outline-0 py-1.5 pl-5 pr-20 text-gray-900 ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-sm",name:"password",placeholder:"Enter your password"},null,8,c),(0,t._)("div",m,[p,(0,t._)("button",{class:"w-10 h-full",onClick:s[0]||(s[0]=e=>y.setPasswordType(g.toggle=!g.toggle))},[(0,t._)("i",{class:(0,t.C_)(g.passwordIcon)},null,2)])])])]),(0,t._)("div",u,[b,(0,t._)("div",null,[(0,t.Wm)(h,{class:"text-xs font-bold",to:"/forgot"},{default:(0,t.w5)((()=>[(0,t.Uk)("Forgot Password?")])),_:1})])]),w,(0,t._)("div",x,[(0,t.Uk)(" Not registered yet? "),(0,t.Wm)(h,{class:"text-black font-bold",to:"/register"},{default:(0,t.w5)((()=>[(0,t.Uk)("Create an account")])),_:1})])])])}var g={name:"LoginPage",data(){return{passwordTypeMap:{false:"text",true:"password"},passwordEyeIconMap:{false:"bi bi-eye-slash",true:"bi bi-eye"},toggle:!0,passwordType:"password",passwordIcon:"bi bi-eye"}},methods:{setPasswordType(e){this.passwordType=this.passwordTypeMap[e],this.passwordIcon=this.passwordEyeIconMap[e]}}},y=l(89);const h=(0,y.Z)(g,[["render",f]]);var v=h}}]);