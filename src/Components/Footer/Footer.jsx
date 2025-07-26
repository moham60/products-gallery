
export default function Footer() {
  return (
    <footer className="flex p-4 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12   text-center md:justify-between">
      <a color="blue-gray" className="font-normal">
        &copy; 2023 Material Tailwind
      </a>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <a
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
            About Us
          </a>
        </li>
        <li>
          <a
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
            License
          </a>
        </li>
        <li>
          <a
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
            Contribute
          </a>
        </li>
        <li>
          <a
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
}
