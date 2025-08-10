import TopRightNav from "../components/TopRightNav";

export default function Flashcards() {
  return (
    <>
      <TopRightNav
        links={[
          { to: "/", label: "Home" },
          { to: "/settings", label: "Settings" }
        ]}
      />
      <h1 className="text-2xl font-bold">FlashCards Page</h1>
    </>
  );
}
