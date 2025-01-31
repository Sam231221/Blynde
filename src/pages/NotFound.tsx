export default function NotFound() {
  return (
    <section className="bg-white  dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl h-screen flex justify-center px-4 py-8 lg:px-6 lg:py-16">
        <div className="w-full m-auto text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl dark:text-white">
            oops! Page Not Found.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
        </div>
      </div>
    </section>
  );
}
