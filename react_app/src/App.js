import './App.css';
import AddNumbers from './components/AddNumbers';
import HomeScreen from './screens/HomeScreen.js';
import CreatePost from './screens/CreatePost.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);

function App() {
  return (
    <Provider store={store}> {/* Wrap your component tree with Provider */} 
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
