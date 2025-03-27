import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
  title: "Broodl • Dashboard",
};



export default function DashboardPage() {
  const isAuthenticated = true;
  
  const children = isAuthenticated ? <Dashboard /> : <Login />;

  return <Main>{children}</Main>;
}
