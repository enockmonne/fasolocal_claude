import Link from 'next/link';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' };
  return (
    <Link href="/" className={`font-bold ${sizes[size]}`}>
      <span className="text-green-800">Faso</span>
      <span className="text-amber-500">Local</span>
    </Link>
  );
}
