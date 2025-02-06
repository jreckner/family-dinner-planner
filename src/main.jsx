import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google"
import {AuthProvider} from "./providers/AuthProvider.jsx";
import {RecipesProvider} from "./providers/RecipesProvider.jsx";
import App from "./components/App.jsx";
import {BrowserRouter} from "react-router-dom";

const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <RecipesProvider>
                        <App />
                    </RecipesProvider>
                </AuthProvider>
            </BrowserRouter>
        </StrictMode>
    </GoogleOAuthProvider>,
)
