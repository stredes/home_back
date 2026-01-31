import { AuthProvider } from './auth/auth.context';
import AppRoutes from './routes/App';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
