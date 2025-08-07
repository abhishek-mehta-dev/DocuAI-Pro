import "./globals.css";
import AuthProvider from "@/context/store/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastListener from "@/context/store/ToastListener";
import SWRProvider from "@/lib/swrConfig";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata = {
  title: "DocuAI Pro",
  description:
    "AI-powered document automation and intelligence with DocuAI Pro.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SWRProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <AuthProvider>
              <ToastListener />
              <Header />
              {children}
              <Footer />
            </AuthProvider>
          </GoogleOAuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
