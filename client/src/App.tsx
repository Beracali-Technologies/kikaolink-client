import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './Routes/routes';
import Layout from './components/Layout/Layout';

function App() {


  return (
    <Router>
          <Routes>
                <Route path="/" element={<Layout />}>
                        {routes.map((route, index) => (
                              <Route key={index} path={route.path} element={route.element} />
                        ))}
                </Route>
          </Routes>
    </Router>
  )
}

export default App
