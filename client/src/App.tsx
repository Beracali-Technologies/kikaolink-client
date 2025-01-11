import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './Routes/routes';
import Layout from './components/Layout/Layout';

function App() {


  return (
    <Router>
          <Layout>
                <Routes>
                              {routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element} />
                              ))}
                </Routes>
          </Layout>
    </Router>
  )
}

export default App
