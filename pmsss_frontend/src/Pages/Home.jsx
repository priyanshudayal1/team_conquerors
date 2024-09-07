import Header from "../components/Header";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600">Welcome to PMSSS</h1>
        <p className="mt-3 text-2xl text-gray-700">
          Prime Minister&apos;s Special Scholarship Scheme for JK Students
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <img src="/logo.svg" alt="PMSSS Logo" width={100} height={100} />
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            The Prime Minister&apos;s Special Scholarship Scheme (PMSSS) aims to
            provide quality education to the students of Jammu and Kashmir.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Under this scheme, students are offered scholarships to pursue
            undergraduate studies outside the state of Jammu and Kashmir.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
