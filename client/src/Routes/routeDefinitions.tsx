import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// --- LAZY-LOADED COMPONENTS ---

// Public Pages (e.g., Login, Signup...)
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));

// Top-Level Dashboard Pages
const EventList = lazy(() => import('../Features/Dashboard/EventList/EventList'));
const CreateEventPage = lazy(() => import('../Features/Dashboard/CreateEvent/CreateEvent'));

// --- The Main Layout for the Settings Section ---
const EventSettingsLayout = lazy(() => import('../Layouts/EventSettingsLayout/EventSettingsLayout'));

// --- Components that render INSIDE EventSettingsLayout ---
const EventForm = lazy(() => import('../Features/Dashboard/EventForm/EventForm'));
const RegistrationFormEditor = lazy(() => import('../Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor'));
const TicketsAndPricing = lazy(() => import('../Features/Dashboard/TicketsAndPricing/TicketsAndPricing'));


// --- ROUTE DEFINITIONS ---

export const publicRoutes = [
    { path: "/", element: <HeroPage /> },
    { path: "/login", element: <Login /> },
    // ... add your other public routes
];

export const privateRoutes = [
    // Default redirect for "/dashboard" goes to the event list
    {
        index: true,
        element: <Navigate to="/dashboard/events" replace />
    },
    {
        path: "events",
        element: <EventList />
    },
    {
        // A clean page just for starting the event creation process
        path: "events/create",
        element: <CreateEventPage />
    },
    {
        // THIS IS THE CORE OF YOUR SETTINGS UI
        // It defines the parent route for managing any single event.
        // URLs like /dashboard/events/123/... will match this.
        path: "events/:eventId",
        element: <EventSettingsLayout />, // This component has the nested sidebar
        children: [
            // The default page is the event info/edit form
            { index: true, element: <Navigate to="info" replace /> },

            // These routes render inside the <Outlet/> of EventSettingsLayout
            {
                path: "info",
                element: <EventForm mode="edit" />
            },
            {
                // This is the route you wanted. It now works.
                path: "registration-form",
                element: <RegistrationFormEditor />
            },
            {
                path: "tickets",
                element: <TicketsAndPricing />
            },
        ]
    },
];
