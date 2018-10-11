import Vue from 'vue'
import Router from 'vue-router';


/// App components
import UsersComponent from './components/UsersComponent';
import AboutUs from './components/AboutUsComponent';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "users",
            component: UsersComponent
        },
        {
            path: "/Aboutus",
            name: "aboutus",
            component: AboutUs
        }
    ]
})