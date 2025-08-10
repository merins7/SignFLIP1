import TopRightNav from "../components/TopRightNav";

export default function Quiz() {
  return (
    <div className="h-screen bg-gray-900 text-white relative">
      <TopRightNav
        links={[
          { to: "/", label: "Home" },
          { to: "/settings", label: "Settings" }
        ]}
      />
      <h1 className="text-2xl font-bold">Quiz Page</h1>
    </div>
  );
}
