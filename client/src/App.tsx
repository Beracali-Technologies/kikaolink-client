
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Layouts/DashboardLayout/DashboardLayout';
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import { publicRoutes, privateRoutes } from './Routes/routes';
import { Suspense } from 'react';
import NotFound from './Features/NotFound/NotFound';


function App() {
  return (

          //Suspense is needed for lazy loading components
          <Suspense fallback={<div>Loading....</div>}>
                <Router>
                        <Routes>
                                  {/* Public Routes */}
                                        <Route element={<PublicLayout />}>
                                            {publicRoutes.map(({ path, element }) => (
                                                <Route key={path} path={path} element={element} />
                                            ))}
                                        </Route>

                                  {/* Private Dashboard Routes */}
                                          <Route path="/dashboard" element={<DashboardLayout />}>
                                                {privateRoutes.map(({ path, element }) => (
                                                    <Route key={path} path={path} element={element} />
                                                ))}
                                               {/* Redirect /dashboard to /dashboard/events by default */}
                                              <Route index element={<Navigate to="/dashboard/events" replace />} />
                                          </Route>

                                  {/* 404 Not Found Page */}
                                        <Route path="*" element={<NotFound />} />
                          </Routes>
                </Router>
        </Suspense>
  )
}

export default App
