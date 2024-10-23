import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPageLayout from './layouts/LandingPageLayout.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/userDashboard/Dashboard.jsx';
import ExamPage from './pages/examPage/ExamPage.jsx';
import AdminAuth from './Admin/pages/AdminAuth.jsx';
import VerfifyOTP from './Admin/pages/VerfifyOTP.jsx';
import AdminAuthLayout from './Admin/layouts/AdminAuthLayout.jsx';
import DashboardLayout from './Admin/layouts/DashboardLayout.jsx';
import AdmiDashboard from './Admin/pages/adminDashboard/AdmiDashboard.jsx';
import ManageCandidates from './Admin/pages/manageCandidates/ManageCandidates.jsx';
import ManageExams from './Admin/pages/manageExams/ManageExams.jsx';
import JobRolesPage from './Admin/pages/jobRoles/JobRolesPage.jsx';
import ResultsAnalyticsPage from './Admin/pages/resultAnalytics/home/ResultsAnalyticsPage.jsx';
import AddCandidates from './Admin/pages/manageCandidates/AddCandidates.jsx';
import AddExam from './Admin/pages/manageExams/AddExam.jsx';
import ViewExam from './Admin/pages/manageExams/viewExam/ViewExam.jsx';
import QuestionPaper from './Admin/pages/manageExams/viewExam/paperSet/QuestionPaper.jsx';
import AddPaperSet from './Admin/pages/manageExams/viewExam/AddPaperSet.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminProtectedRoute from '../src/Admin/components/AdminProtectedRoute.jsx'
import PageNotFound from './components/PageNotFound.jsx';
import ViewExamDetails from './Admin/pages/resultAnalytics/viewExamDetails/ViewExamDetails.jsx';
import CandidateScorecard from './Admin/pages/resultAnalytics/candidateScoreCard/CandidateScorecard.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/c/:id', // c means candidate and id means candidate ID
        element: <ProtectedRoute element={<Dashboard />} /> // Protect this route
      }
    ]
  },
  {
    path: '/c/:id/exam/:examid',
    element: <ProtectedRoute element={<ExamPage />} /> // Protect this route
  },
  {
    path: '/sb-admin',
    element: <AdminAuthLayout />,
    children: [
      {
        path: '',
        element: <AdminAuth />
      },
      {
        path: '/sb-admin/verify-otp',
        element: <VerfifyOTP />
      }
    ]
  },
  {
    path: '/admin/:id',
    element: <AdminProtectedRoute element={<DashboardLayout />} />, // Protect this route
    children: [
      {
        path: '/admin/:id/dashboard',
        element: <AdmiDashboard />
      },
      {
        path: '/admin/:id/manage-candidate',
        element: <ManageCandidates />
      },
      {
        path: '/admin/:id/manage-candidate/add',
        element: <AddCandidates />
      },
      {
        path: '/admin/:id/manage-exams',
        element: <ManageExams />
      },
      {
        path: '/admin/:id/manage-exams/add',
        element: <AddExam />
      },
      {
        path: '/admin/:id/manage-exams/view/:examid',
        element: <ViewExam />
      },
      {
        path: '/admin/:id/manage-exams/exam/:examid/add-paper-set',
        element: <AddPaperSet />
      },
      {
        path: '/admin/:id/manage-exams/:examid/view-paper-set/:papersetid',
        element: <QuestionPaper />
      },

      {
        path: '/admin/:id/job-roles',
        element: <JobRolesPage />
      },

      {
        path: '/admin/:id/results-analytics',
        element: <ResultsAnalyticsPage />
      },
      {
        path: '/admin/:id/results-analytics/view-exam-details/:examid',
        element: <ViewExamDetails />
      },
      {
        path: '/admin/:id/results-analytics/candidate/:cid/score-card',
        element: <CandidateScorecard />
      }


    ]
  },
  {
    path: '*', // Wildcard route for handling 404s
    element: <PageNotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
