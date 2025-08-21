import { lazy, FC } from 'react';
import { Route, Navigate } from 'react-router-dom';

// Import all necessary dashboard components
const EventList = lazy(() => import('../Features/Dashboard/EventList/EventList'));
const CreateEvent = lazy(() => import('../Features/Dashboard/CreateEvent/CreateEvent'));
const EventSettingsLayout = lazy(() => import('../Layouts/EventSettingsLayout/EventSettingsLayout'));
const EventForm = lazy(() => import('../Features/Dashboard/EventForm/EventForm'));
const RegistrationFormEditor = lazy(() => import('../Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor'));
const TicketsAndPricing = lazy(() => import('../Features/Dashboard/TicketsAndPricing/TicketsAndPricing'));

const PrivateRoutes: FC = () => (
  <>
    {/* Default page for "/dashboard" is the EventList */}
    <Route index element={<Navigate to="events" replace />} />

    <Route path="events" element={<EventList />} />
    <Route path="events/create" element={<CreateEvent />} />

    {/* Parent route for managing a single event */}
    <Route path="events/:eventId" element={<EventSettingsLayout />}>
      {/* Default sub-page is the "info" (edit) page */}
      <Route index element={<Navigate to="info" replace />} />
      <Route path="info" element={<EventForm mode="edit" />} />
      <Route path="registration-form" element={<RegistrationFormEditor />} />
      <Route path="tickets" element={<TicketsAndPricing />} />
    </Route>
  </>
);

export default PrivateRoutes;
