import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Us */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">About Job Hunt</h2>
                        <p className="text-gray-400 text-sm">
                            Job Hunt connects job seekers with employers, helping you find the right career opportunities in your field. Join us today and start your journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/jobs" className="hover:text-gray-300">Browse Jobs</a></li>
                            <li><a href="/companies" className="hover:text-gray-300">Top Companies</a></li>
                            <li><a href="/blog" className="hover:text-gray-300">Career Advice</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-400 text-sm">Email: akanshumourya9@gmail.com</p>
                        <p className="text-gray-400 text-sm">Phone: +91 9303709571 </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/akanshu-singh-mourya/" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; 2024 Job Hunt. All rights reserved.</p>
                    <p>Designed and developed by Akanshu Mourya.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
