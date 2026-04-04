import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/layouts/AppLayout";
import { LandingPage } from "@/pages/Landing";
import { HomePage } from "@/pages/Home";
import { SearchPage } from "@/pages/Search";
import { CreateEventPage } from "@/pages/events/CreateEvent";
import { EditEventPage } from "@/pages/events/EditEvent";
import { EventDetailsPage } from "@/pages/events/EventDetails";
import { MyEventsPage } from "@/pages/events/MyEvents";
import { ProfilePage } from "@/pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Navigate to="/landing" replace />} />
        <Route path="/register" element={<Navigate to="/landing" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/events/create" element={<CreateEventPage />} />
          <Route path="/events/:id/edit" element={<EditEventPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events" element={<MyEventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>

        {/* Protected routes with app layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/events/:id/edit" element={<EditEventPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events" element={<MyEventsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </AuthProvider>
  );
}
