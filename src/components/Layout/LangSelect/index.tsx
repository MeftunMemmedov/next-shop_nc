'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { languages } from '@/constants';

const LangSelect = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    const currentParams = searchParams.toString();
    const targetPath = currentParams
      ? `${pathname}?${currentParams}`
      : pathname;
    startTransition(() => {
      router.replace(targetPath, { locale: nextLocale });
    });
  }

  return (
    <label
      className={`relative inline-block ${isPending ? 'opacity-50' : 'opacity-100'}`}
    >
      <select
        value={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className="language-select rounded bg-dark text-light px-1 bg-transparent border-0 fw-bold"
      >
        {languages.map((lang, index) => (
          <option key={`lang-${lang.code}-${index}`} value={lang.code}>
            {lang.code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};
export default LangSelect;
