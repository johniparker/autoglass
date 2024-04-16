import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import QuoteListPage from './screens/QuoteListPage';
import NewQuotePage from './screens/NewQuotePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuoteListPage/>,
  },
  {
    path: "/new-quote",
    element: <NewQuotePage/>,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
