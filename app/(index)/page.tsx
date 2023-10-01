import Link from "next/link";

export default function Page() {
  return (
    <div className="hero min-h-screen bg-white text-base-content">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/svgs/calendar.svg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Record and calculate DTR on the go!
          </h1>
          <p className="py-6">
            Why manually calculate your DTR when you can do it automatically?
            With online-DTR you can record your DTR and calculate your total
            work hours with ease .
          </p>
          <Link className="btn btn-primary" href={"/auth/signup"}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
