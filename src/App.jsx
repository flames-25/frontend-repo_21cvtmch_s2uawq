import Header from "./components/Header.jsx";
import DashboardCards from "./components/DashboardCards.jsx";
import TokenTable from "./components/TokenTable.jsx";
import Hero3D from "./components/Hero3D.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Header />

        <div className="mt-6 grid grid-cols-1 gap-6">
          <Hero3D />
          <DashboardCards />
          <TokenTable />
        </div>
      </div>
    </div>
  );
}

export default App;
