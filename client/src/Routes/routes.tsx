import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));
const EventList = lazy(() => import('../Features/Dashboard/EventList/EventList'));
const NoEvent = lazy(() => import('../Features/Dashboard/EventList/NoEvent'));
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const Signup = lazy(() => import('../Features/Auth/Signup/Signup'));
const EventSettingsLayout = lazy(() => import('../Layouts/EventSettingsLayout/EventSettingsLayout'));
const EditEventInfo = lazy(() => import('../Features/Dashboard/EditEventInfo/EditEventInfo'));
const RegistrationFormEditor = lazy(() => import('../Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor'));
const CreateEvent = lazy(() => import('../Features/Dashboard/CreateEvent/CreateEvent'));

      /*Defining routes before nesting the routes */


export const publicRoutes = [
    { path: "/", element: <HeroPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    //{ path: "/pricing", element: <PricingPage /> },
];

export const privateRoutes = [
    { path: "events", element: <EventList /> },
    { path: "events/create", element: <CreateEvent /> },
    {
        path: "events/:eventId",
        element: <EventSettingsLayout />,
        // 3. Children routes that render inside the EventSettingsLayout's <Outlet />
        children: [
          { path: "edit-event-info", element: <EditEventInfo /> },
          { path: "registration-form-editor", element: <RegistrationFormEditor /> },
          // Default child route to redirect to 'info'
          { index: true, element: <Navigate to="events" replace /> }
        ]
      },
];
