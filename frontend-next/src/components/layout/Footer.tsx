import React from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white shadow-sm dark:bg-gray-800 w-full">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://localhost:3000" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="/images/logo.svg" className="h-12 w-30" alt="HelpGM Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HelpGM</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Sobre</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Política de Privacidade</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licença</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contato</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;


