import AuthGuard from "../components/AuthGuard";
import Main from "../components/dashboard/Main";
import Navbar from "../components/dashboard/Navbar";


export default function Dashboard() {
    
    return (
        <AuthGuard>
            <div>
                <Navbar />
                <Main />
            </div>
        </AuthGuard>
    )
}