import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="flex justify-center">
            <nav className="w-full flex items-center justify-between font-medium bg-gray-50 border border-gray-100 rounded-lg md:p-6 md:space-x-8 dark:bg-gray-800 dark:border-gray-700">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse no-underline">
                    <span className="self-center text-2xl font-semibold text-gray-900 dark:text-white">Travel Buddy</span>
                </Link>
                <div className="hidden md:block">
                    <ul className="flex gap-14 px-4">
                        <li>
                            <Link href="/trips" className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline text-lg">
                                Trips
                            </Link>
                        </li>
                        <li>
                            <Link href="/trains" className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline text-lg">
                                Train
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
