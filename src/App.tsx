import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Main } from './components/main/Main';
import UncontrolledForm from './components/main/uncontrolled/UncontrolledForm';
import ControlledForm from './components/main/controlled/ControlledForm';

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
