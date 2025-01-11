'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconBrandInstagramFilled, IconBrandMeta, IconBrandTwitterFilled } from '@tabler/icons-react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-5 md:px-20 border-t">
      <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">

        {/* Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
          <div>
            <h3 className="font-semibold text-lg mb-3">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/men" className="hover:underline">Men's</Link></li>
              <li><Link href="/women" className="hover:underline">Women's</Link></li>
              <li><Link href="/kids" className="hover:underline">Kid's</Link></li>

            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">HELP</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Gift Cards</Link></li>
              <li><Link href="#" className="hover:underline">Refer a Friend</Link></li>
              <li><Link href="#" className="hover:underline">Wholesale</Link></li>
            </ul>
          </div>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col space-y-4">
          <p>Sign up to get 10% off your first order</p>
          <form className="flex">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="p-4 rounded-l-full border focus:outline-none w-full sm:w-auto"
            />
            <Button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-r-full font-semibold">
              Subscribe
            </Button>
          </form>
          {/* Social Icons */}
          <div className="flex justify-end space-x-4 mt-4">
            <a href="#"><IconBrandInstagramFilled /></a>
            <a href="#"><IconBrandMeta stroke={2} /></a>
            <a href="#"><IconBrandTwitterFilled /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-gray-400">
        <p>{`© ${currentYear} Olipop, Inc. All Rights Reserved`}</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
