"use client";
import { logout } from "@/lib/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className=" transition ease-in-out duration-300 cursor-pointer
                 dark:bg-red-400 dark:hover:bg-red-500 font-google text-lg rounded-3xl 
                 px-5 py-2 text-white bg-red-500 hover:bg-red-600"
    >
      Logg ut
    </button>
  );
}
