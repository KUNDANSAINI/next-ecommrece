'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconBrandInstagramFilled, IconBrandMeta, IconBrandTwitterFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    /* eslint-disable react/no-unescaped-entities */
    <footer className="py-10 px-5 md:px-20 border-t">
      <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">

        {/* Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
          <div>
            <h3 className="font-semibold text-lg mb-3">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/Men" className="hover:underline">Men's</Link></li>
              <li><Link href="/Women" className="hover:underline">Women's</Link></li>
              <li><Link href="/Kids" className="hover:underline">Kid's</Link></li>

            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Other</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="hover:underline">About Us</Link></li>
              <li><Link href="/refund-policy" className="hover:underline">Return & Refund policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Get In Touch</h3>
            <ul className="space-y-2 pr-4">
              <li>Mail:support@zone1880.com</li>
              <li>ZONE (🇮🇳) - ZONE | Kumba marg, Sector - 162/62, Jaipur - 302022, INDIA</li>
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
            <Link href="#"><IconBrandInstagramFilled /></Link>
            <Link href="#"><IconBrandMeta stroke={2} /></Link>
            <Link href="#"><IconBrandTwitterFilled /></Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-gray-400">
        <p>{`© ${currentYear} ZONE, Inc. All Rights Reserved`}</p>
        <div className="flex space-x-4">
          <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
    /* eslint-disable react/no-unescaped-entities */
  );
};

export default Footer;
