import Vue from 'vue';
import VueRouter from 'vue-router';
import CustomerList from "./components/CustomerList";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import AdminRegister from "./components/admin/AdminRegister";
import Welcome from "./components/Welcome";

Vue.use(VueRouter);

export default new VueRouter({
    routes :[
        {
            name: 'customer',
            path:'/customer' ,
            component : CustomerList
        },
        {
            name: 'AdminDashboard',
            path:'/user-dashboard' ,
            component : AdminDashboard
        },
        {
            name: 'AdminRegister',
            path:'/admin-register' ,
            component : AdminRegister,
        },
        {
            name: 'Welcome',
            path:'/' ,
            component : Welcome,
        },
    ],

    mode:'history'
});
