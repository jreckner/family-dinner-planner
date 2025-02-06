import {GoogleLogin} from "@react-oauth/google";
import {useAuthContext} from "../../providers/AuthProvider.jsx";

const GoogleLoginProfile = () => {
    const { user, login, logout } = useAuthContext();

    return (
        <>
            {user
                ? (<img src={user.picture} alt="User profile" className="rounded-full w-12 cursor-pointer" onClick={logout}/>)
                : (<GoogleLogin size="large" text="continue_with" shape="pill" onSuccess={login} useOneTap auto_select />)
            }
        </>
    )
}

export default GoogleLoginProfile;
