
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './Routes/routes';
import Layout from './components/Layout/Layout';

function App() {


  return (
    <Router>

                <Routes>
                              {routes.map((route, index) => (
                                    <Route
                                     key={index}
                                    path={route.path}
                                    element={
                                      route.path == "/hero" ? (
                                      route.element)
                                          :
                                      (<Layout>{route.element}</Layout>
                                      )
                                    }
                                      />
                              ))}
                </Routes>

    </Router>
  )
}

export default App
