import { lazy } from 'react';


const Hero = lazy(() => import('../components/Pages/HeroPage/Hero'));
const EventList = lazy(() => import('../components/Pages/EventList/EventList'));
const NoEvent = lazy(() => import('../components/Pages/EventList/NoEvent'));
const Login = lazy(() => import('../components/Pages/Auth/Login/Login'));
const Signup = lazy(() => import('../components/Pages/Auth/Signup/Signup'));
const NotFound = lazy(() => import('../components/Pages/NotFound/NotFound'));



      /*Before nesting the routes */

export default [
    { path: "/hero", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/eventlist", element: <EventList /> },
    { path: "/noevent", element: <NoEvent />},
    { path: "*", element: <NotFound /> }
];
