import { SparklesIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/fonts/fonts';

export default function PortfolioLogo() {
  return (
    <div className={`${lusitana.className} flex items-center text-white`}>
      <p className="text-[44px] flex items-center">
        Portfolio <SparklesIcon className="h-12 w-12 ml-2" />
      </p>
    </div>
  );
}