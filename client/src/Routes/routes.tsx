import { lazy } from 'react';
import { Navigate } from 'react-router-dom';


const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const Signup = lazy(() => import('../Features/Auth/Signup/Signup'));
const PublicRegistrationForm = lazy(() => import('../Features/Landing/PublicRegistrationForm/PublicRegistrationForm'));

const EventList = lazy(() => import('../Features/Dashboard/EventList/EventList'));
const NoEvent = lazy(() => import('../Features/Dashboard/Components/NoEventState/NoEventState'));
const EventSettingsLayout = lazy(() => import('../Layouts/EventSettingsLayout/EventSettingsLayout'));
const EditEventInfo = lazy(() => import('../Features/Dashboard/EditEventInfo/EditEventInfo'));
const RegistrationFormEditor = lazy(() => import('../Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor'));
const CreateEvent = lazy(() => import('../Features/Dashboard/CreateEvent/CreateEvent'));
const ContactPage = lazy(() => import('../Features/Landing/ContactPage/ContactPage'));
      /*Defining routes before nesting the routes */


export const publicRoutes = [
    { path: "/", element: <HeroPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },  //organizers joining the platform
    { path: "/contact", element: <ContactPage /> },
    { path: "/events/:eventId/register", element: <PublicRegistrationForm fields={[]} /> }, //public form attendes joining specific event
    //{ path: "/pricing", element: <PricingPage /> },
];

export const privateRoutes = [
    { path: "events", element: <EventList /> },
    { path: "no-event", element: <NoEvent /> },
    { path: "events/create", element: <CreateEvent /> },


    {
        path: "settings",
        element: <EventSettingsLayout />,
        // 3. Children routes that render inside the EventSettingsLayout's <Outlet />
        children: [

          { path: "edit-event-info", element: <EditEventInfo /> },
          { path: "registration-form-editor", element: <RegistrationFormEditor /> },

          // Default child route to redirect to 'info'
          { index: true, element: <Navigate to="edit-event-info" replace /> }
        ]
      },
];
