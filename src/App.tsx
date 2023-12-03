import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Main } from './components/MainPage';
import UncontrolledForm from './components/uncontrolled/UncontrolledForm';
import ControlledForm from './components/controlled/ControlledForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div className="container">
          <Main />
        </div>
      }
    >
      <Route path="uncontrolled" element={<UncontrolledForm />} />
      <Route path="controlled" element={<ControlledForm />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
