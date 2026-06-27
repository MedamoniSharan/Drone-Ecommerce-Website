import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/account/SignInPage';
import SignUpPage from '@/pages/account/SignUpPage';
import LogoutPage from '@/pages/account/LogoutPage';
import SocialDevShimPage from '@/pages/account/SocialDevShimPage';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/signin" element={<SignInPage />} />
        <Route path="/account/signup" element={<SignUpPage />} />
        <Route path="/account/logout" element={<LogoutPage />} />
        <Route path="/account/social-dev-shim" element={<SocialDevShimPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}
