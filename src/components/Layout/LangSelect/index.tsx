'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';
import { routing, usePathname, useRouter } from '@/i18n/routing';

export default function LangSelect() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value; // Cast if necessary

    startTransition(() => {
      // Use the object syntax which is safer for dynamic routes
      router.replace(
        // @ts-expect-error -- routing params validation
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label className={isPending ? 'opacity-50' : ''}>
      <select
        className="language-select rounded bg-dark text-red px-1 bg-transparent border-0 fw-bold"
        value={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur} hidden={cur === locale}>
            {cur.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
