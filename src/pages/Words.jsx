import Navbar from "../components/Navbar";

export default function Words() {
  return (
    <div className="relative h-screen text-white bg-gradient-to-br from-green-500 via-teal-500 to-blue-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full px-6 pt-20">
        <h1 className="mb-4 text-4xl font-bold">Words Page</h1>
        <p className="max-w-xl text-lg text-center">
          This section will display animated ASL signs for words like "Hello", "Thank You", 
          "Sorry", and more. You can extend it with animations, flip cards, or interactive practice.
        </p>
      </div>
    </div>
  );
}
``