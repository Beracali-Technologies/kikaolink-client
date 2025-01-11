import Hero from '../components/Pages/HeroPage/Hero';
import EventList from '../components/Pages/EventList/EventList';
import NoEvent from '../components/Pages/EventList/NoEvent';
import Login from '../components/Pages/Auth/Login/Login';
import Signup from '../components/Pages/Auth/Signup/Signup';
import NotFound from '../components/Pages/NotFound/NotFound';


/*Before nesting the routes */

export default [
    { path: "/", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/eventlist", element: <EventList /> },
    { path: "/noevent", element: <NoEvent /> },
    {path: "*", element: <NotFound /> }
];
