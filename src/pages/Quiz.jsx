import Navbar from "../components/Navbar";

export default function Quiz() {
  return (
    <div className="relative h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center pt-24">
        <h1 className="text-3xl font-bold">Quiz Page</h1>
        <p className="mt-2 ">
          Welcome to the Quiz section!
        </p>
      </div>
    </div>
  );
}
