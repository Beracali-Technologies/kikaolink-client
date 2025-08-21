import { lazy, FC } from 'react';
import { Route } from 'react-router-dom';

const HeroPage = lazy(() => import('../Features/Landing/HeroPage/HeroPage'));
const Login = lazy(() => import('../Features/Auth/Login/Login'));
const Signup = lazy(() => import('../Features/Auth/Signup/Signup'));
//... import other public pages

const PublicRoutes: FC = () => (
  <>
    {/* Use "index" for the true root path "/" */}
    <Route index element={<HeroPage />} />

    {/* These paths are now RELATIVE (no leading "/") */}
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    {/* Example: <Route path="contact" element={<ContactPage />} /> */}
  </>
);

export default PublicRoutes;
