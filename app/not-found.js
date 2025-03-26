import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist. Please check the URL or return to the homepage.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20">
        <div className="relative space-y-2">
          <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
          <p className="mt-5 text-base dark:text-white">The page you requested was not found!</p>
          <Link href="/"><Button className="mt-6">Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
