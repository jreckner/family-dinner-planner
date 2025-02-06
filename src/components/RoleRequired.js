/* eslint react/prop-types: 0 */
import { useAuthContext } from "../providers/AuthProvider.jsx";

const RoleRequired = ({ requiredRoles, children }) => {
    const { roles } = useAuthContext();

    if (requiredRoles.filter(role => roles.includes(role)).length > 0) {
        return children;
    } else {
        return null;
    }
};

export default RoleRequired;