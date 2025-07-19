import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-100 py-8 mt-12">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-2">Khaini Store</h3>
        <p className="text-sm">Khaini inventory management system</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Sitemap</h4>
        <ul className="space-y-1">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/stats" className="hover:underline">Show Stats</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Follow Us</h4>
        <div className="flex gap-4">
          <a href="#" aria-label="GitHub" className="hover:text-blue-400"><FaGithub size={24} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter size={24} /></a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-400"><FaFacebook size={24} /></a>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400 mt-6">&copy; {new Date().getFullYear()} Khaini Store. All rights reserved.</div>
  </footer>
);

export default Footer; 