import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

// --- LAYOUTS (for route definitions) ---
import PublicLayout from '../Layouts/PublicLayout/PublicLayout';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import LandingLayout from '../Layouts/LandingLayout/LandingLayout';
import EventSettingsLayout from '../Layouts/EventSettingsLayout/EventSettingsLayout';
import ProtectedRoute from './ProtectedRoute';

// --- LAZY-LOADED PAGE COMPONENTS ---
const LandingPage = lazy(() => import('../Features/Landing/LandingPage'));
const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const Signup = lazy(() => import('../Features/Auth/Signup/Signup'));
const EventDashboard = lazy(() => import('../Features/Dashboard/Events/EventDashboard/EventDashboard'));
const EventList = lazy(() => import('../Features/Dashboard/Events/EventList/EventList'));
const CreateEvent = lazy(() => import('../Features/Dashboard/Events/CreateEvent/CreateEvent'));
const CheckinPage = lazy(() => import('../Features/Dashboard/Checkin/CheckinPage'));
const EditEvent = lazy(() => import('../Features/Dashboard/Events/EditEvent/EditEvent'));

const EmailConfirmation = lazy(() => import('../Features/Dashboard/EventSettings/EmailConfirmation/EmailConfirmation'))
const TicketsAndPricing = lazy(() => import('../Features/Dashboard/TicketsAndPricing/TicketsAndPricing'));
const RegistrationFormEditor = lazy(() => import('../Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor'));
const EventWebsite = lazy(() => import('../Features/Dashboard/Events/EventWebsite/EventWebsite'));
const AttendeeRegistrationPage = lazy(() => import('../Features/Registration/pages/AttendeeRegistrationPage/AttendeeRegistrationPage'));
const RegistrationSuccessPage = lazy(() => import('../Features/Registration/pages/RegistrationSuccessPage/RegistrationSuccessPage')) ;

const CommunicationsLayout = lazy(() => import('../Layouts/CommunicationsLayout/CommunicationsLayout'));
const CommunicationsOverviewPage = lazy(() => import('../Features/Communications/CommunicationsOverviewPage'))
const SmsCommunicationPage = lazy(() => import('../Features/Communications/SmsCommunication/SmsCommunicationPage'));
const EmailCommunicationPage = lazy(() => import('../Features/Communications/EmailCommunication/EmailCommunicationPage'));
// --- THE DEFINITIVE ROUTE CONFIGURATION ARRAY ---
export const routes: RouteObject[] = [
    // --- Public Routes ---
    {
        element: <PublicLayout />, // All children get the PublicLayout
        children: [
            { path: '/', element: <HeroPage /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },

            { path: '/events/:eventSlug', element: <EventWebsite /> },
            { path: '/register-attendee/:eventSlug/:eventId', element: <AttendeeRegistrationPage /> },
            { path: '/registration-success/:eventSlug', element: <RegistrationSuccessPage /> },
        ]
    },

    // --- Private Dashboard Routes ---
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
    { index: true, element: <Navigate to="home" replace /> },

    { path: 'home', element: <EventDashboard /> },
    { path: 'events', element: <EventList /> },
    { path: 'events/create', element: <CreateEvent /> },
    { path: 'checkin', element: <CheckinPage /> },

    // Communications routes (not inside EventSettingsLayout)
    {
      path: 'events/:eventId/communications',
      element: <CommunicationsLayout />,
      children: [
        { index: true, element: <CommunicationsOverviewPage /> },
        { path: 'sms', element: <SmsCommunicationPage /> },
        { path: 'email', element: <EmailCommunicationPage /> },
      ],
    },

    // Event settings routes
    {
      path: 'events/:eventId',
      element: <EventSettingsLayout />,
      children: [
        { index: true, element: <Navigate to="info" replace /> },
        { path: 'info', element: <EditEvent /> },
        { path: 'registration-form', element: <RegistrationFormEditor /> },
        { path: 'tickets', element: <TicketsAndPricing /> },
        { path: 'email', element: <EmailConfirmation /> },
      ],
    },
  ],

    },

    // --- Landing Page (No Sidebar) ---
 {
     path: '/dashboard/landing',
     element: (
         <ProtectedRoute>
             <LandingLayout />
         </ProtectedRoute>
     ),
     children: [
         { index: true, element: <LandingPage /> },
     ],
 },
    // Add a catch-all 404 at the top level if desired
];
