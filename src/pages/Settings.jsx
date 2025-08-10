import TopRightNav from "../components/TopRightNav";

export default function Settings() {
  return (
    <>
      <TopRightNav
        links={[
          { to: "/", label: "Home" }
        ]}
      />
      <h1 className="text-2xl font-bold">Settings Page</h1>
    </>
  );
}
