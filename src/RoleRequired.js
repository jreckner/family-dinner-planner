/* eslint react/prop-types: 0 */
import { useAuth } from "./AuthProvider.jsx";

const RoleRequired = ({ requiredRoles, children }) => {
    const { roles } = useAuth();

    if (requiredRoles.filter(role => roles.includes(role)).length > 0) {
        return children;
    } else {
        return null;
    }
};

export default RoleRequired;