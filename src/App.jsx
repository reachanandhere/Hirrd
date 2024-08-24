import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import AppLayout from "./layouts/app-layout";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/job-listing";
import Job from "./pages/job";
import PostJob from "./pages/post-job";
import SavedJobs from "./pages/saved-jobs";
import MyJobs from "./pages/myjobs";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <ProtectedRoute><Onboarding /></ProtectedRoute> ,
      },
      {
        path: "/jobs",
        element: <ProtectedRoute><JobListing /></ProtectedRoute> ,
      },
      {
        path: "/jobs/:id",
        element: <ProtectedRoute><Job /></ProtectedRoute> ,
      },
      {
        path: "/post-job",
        element: <ProtectedRoute><PostJob /></ProtectedRoute>,
      },
      {
        path: "/saved-jobs",
        element: <ProtectedRoute><SavedJobs /></ProtectedRoute>,
      },
      {
        path: "/my-jobs",
        element: <ProtectedRoute><MyJobs /></ProtectedRoute>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
