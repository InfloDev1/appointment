import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DripperScheduler
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Book your appointments easily and quickly
        </p>
        <Link
          href="/booking"
          className="inline-block bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Book an Appointment
        </Link>
      </div>
    </div>
  );
}
