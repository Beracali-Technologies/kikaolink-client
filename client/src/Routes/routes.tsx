import Hero from '../components/HeroPage/Hero';
import EventList from '../components/EventList/EventList';
import NoEvent from '../components/EventList/NoEvent';
import Login from '../components/Auth/Login/Login';
import Signup from '../components/Auth/Signup/Signup';
import NotFound from '../components/NotFound/NotFound';


/*Before nesting the routes */

export default [
    { path: "/", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/eventlist", element: <EventList /> },
    { path: "/noevent", element: <NoEvent /> },
    {path: "*", element: <NotFound /> }
];
