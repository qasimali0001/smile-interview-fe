import { Routes, Route, Link } from "react-router-dom";
import Layout from "./layouts";
import AddCustomer from "./pages/customers/AddCustomer";
import ViewAllCustomers from "./pages/customers/ViewAllCustomer";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<ViewAllCustomers />} />
        <Route path="customers/new" element={<AddCustomer />} />

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
