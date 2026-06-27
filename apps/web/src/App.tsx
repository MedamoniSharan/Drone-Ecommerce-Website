import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/account/SignInPage';
import SignUpPage from '@/pages/account/SignUpPage';
import LogoutPage from '@/pages/account/LogoutPage';
import SocialDevShimPage from '@/pages/account/SocialDevShimPage';
import WhatsAppButton from '@/components/WhatsAppButton';
import CartDrawer from '@/components/CartDrawer';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:category" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/drones" element={<ProductsPage />} />
        <Route path="/gimbals" element={<ProductsPage />} />
        <Route path="/action" element={<ProductsPage />} />
        <Route path="/accessories" element={<ProductsPage />} />
        <Route path="/fpv" element={<ProductsPage />} />
        <Route path="/enterprise" element={<ProductsPage />} />
        <Route path="/new-arrivals" element={<ProductsPage />} />
        <Route path="/combos" element={<ProductsPage />} />
        <Route path="/account/signin" element={<SignInPage />} />
        <Route path="/account/signup" element={<SignUpPage />} />
        <Route path="/account/logout" element={<LogoutPage />} />
        <Route path="/account/social-dev-shim" element={<SocialDevShimPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppButton />
      <CartDrawer />
    </>
  );
}
