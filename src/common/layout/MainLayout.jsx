import { Outlet } from "react-router-dom";
import Header from "../component/header/Header";

const MainLayout = ({ name, children }) => {
    return (
        <div className="max-w-full overflow-y-auto wrapper">
            <Header name={name} />
            <div className="container max-w-full bg-bgBk">
                {children || <Outlet />}
            </div>
        </div>
    );
};

export default MainLayout;