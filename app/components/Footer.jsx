import React from 'react'

const Footer = () => {
    return (
        <div className="flex justify-center mt-2">
            <footer className="w-full flex flex-col items-center justify-center text-center font-medium bg-gray-50 border border-gray-100 rounded-lg md:p-6 md:space-x-8 dark:bg-gray-800 dark:border-gray-700">
                <span className="block text-sm text-gray-700 dark:text-gray-400">
                    © 2024  
                    <a href="https://travel.metakgp.org/" className="no-underline text-blue-500 hover"> Travel Buddy™</a>. 
                    All Rights Reserved.
                </span>
            </footer>
        </div>
    )
}

export default Footer
