import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from "./App.jsx";
import {AuthProvider} from "./AuthProvider.jsx";

const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </StrictMode>
    </GoogleOAuthProvider>,
)
