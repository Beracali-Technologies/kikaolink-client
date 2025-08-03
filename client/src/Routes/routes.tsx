import { lazy } from 'react';


const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));
const EventList = lazy(() => import('../Features/Dashboard/EventList/EventList'));
//const NoEvent = lazy(() => import('../components/Pages/EventList/NoEvent'));
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const Signup = lazy(() => import('../Features/Auth/Signup/Signup'));




      /*Defining routes before nesting the routes */


export const publicRoutes = [
    { path: "/", element: <HeroPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    //{ path: "/pricing", element: <PricingPage /> },
];

export const privateRoutes = [
    { path: "/dashboard/events", element: <EventList /> },
  //  { path: "/dashboard/events/create", element: <CreateEventPage /> },
  //  { path: "/dashboard/settings", element: <SettingsPage /> },
  // { path: "events/create", element: lazy(() => import('../features/dashboard/CreateEvent')) },
    // { path: "form-editor", element: lazy(() => import('../features/dashboard/FormEditor')) },
];
