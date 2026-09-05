import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppWidget from "./sections/WhatsAppWidget/WhatsAppWidget";
import { AuthProvider } from "./admin/context/AuthContext";
import { CartProvider } from "./context/CartContext";
import RequireAuth from "./admin/components/RequireAuth";
import AdminLayout from "./admin/components/AdminLayout";

// Route-based code splitting: each page ships as its own chunk instead of
// one giant bundle — keeps the public site's Lighthouse score intact even
// as the admin dashboard grows.
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Services = lazy(() => import("./pages/Services/Services"));
const ServiceSingle = lazy(() => import("./pages/ServiceSingle/ServiceSingle"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const OrderTracking = lazy(() => import("./pages/OrderTracking/OrderTracking"));
const AdminLogin = lazy(() => import("./admin/pages/Login/Login"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard/Dashboard"));
const AdminOrders = lazy(() => import("./admin/pages/Orders/Orders"));
const AdminOrderDetail = lazy(() => import("./admin/pages/OrderDetail/OrderDetail"));
const AdminProducts = lazy(() => import("./admin/pages/Products/Products"));

function PublicSite() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceSingle />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<OrderTracking />} />
            <Route path="/orders/:id" element={<OrderTracking />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppWidget />
    </CartProvider>
  );
}

function AdminSite() {
  return (
    <AuthProvider>
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminSite />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
