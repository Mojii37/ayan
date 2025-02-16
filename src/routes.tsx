import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Articles from './pages/Articles';
import Tutorials from './pages/Tutorials';
import Registration from './pages/Registration';
import Collaboration from './pages/Collaboration';
import TaxCalculator from './pages/TaxCalculator';
import MiniBook from './pages/MiniBook';
import Survey from './pages/Survey';
import ConsultationRequest from './pages/ConsultationRequest';
import TaxCalendarPage from './pages/TaxCalendar';
import PaymentVerification from './pages/PaymentVerification';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="videos" element={<Videos />} />
        <Route path="articles" element={<Articles />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="register" element={<Registration />} />
        <Route path="collaboration" element={<Collaboration />} />
        <Route path="tax-calculator" element={<TaxCalculator />} />
        <Route path="mini-book" element={<MiniBook />} />
        <Route path="survey" element={<Survey />} />
        <Route path="consultation" element={<ConsultationRequest />} />
        <Route path="tax-calendar" element={<TaxCalendarPage />} />
        <Route path="payment/verify" element={<PaymentVerification />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
