'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';
import { routing, usePathname, useRouter } from '@/i18n/routing';

const LangSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- routing params validation
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <label className={isPending ? 'opacity-50' : ''}>
      <select
        className="language-select rounded bg-dark text-red px-1 bg-transparent border-0 fw-bold"
        value={locale}
        disabled={isPending}
        onChange={onSelectChange}>
        {routing.locales.map((cur) => (
          <option key={cur} value={cur} hidden={cur === locale}>
            {cur.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LangSelect;
