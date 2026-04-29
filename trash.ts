// export const fetchDatalist = async <T>(
//   table_name: TableName,
//   params?: URLSearchParams | null,
//   nextOptions: {
//     revalidate?: number | false;
//     tags?: string[];
//   } = { revalidate: false },
//   token?: string
// ) => {
//   const res = await fetch(
//     `${baseURL}${table_name}${params ? `?${params}` : ''}`,
//     {
//       method: 'GET',
//       headers: getHeaders(token),
//       next: {
//         revalidate: nextOptions.revalidate,
//         tags: nextOptions.tags,
//       },
//       cache: nextOptions.revalidate === 0 ? 'no-store' : 'force-cache',
//     }
//   );

//   if (!res.ok) throw new Error('Fetch Failed');

//   return res.json() as Promise<T[]>;
// };

// export const fetchDatadetails = async <T>(
//   table_name: TableName,
//   params?: string,
//   nextOptions: {
//     revalidate?: number | false;
//     tags?: string[];
//   } = { revalidate: false },
//   token?: string
// ) => {
//   const res = await fetch(
//     `${baseURL}${table_name}${params ? `?${params}` : ''}`,
//     {
//       method: 'GET',
//       headers: {
//         ...getHeaders(token),
//         Accept: 'application/vnd.pgrst.object+json',
//       },
//       next: {
//         revalidate: nextOptions.revalidate,
//         tags: nextOptions.tags,
//       },
//       cache: nextOptions.revalidate === 0 ? 'no-store' : 'force-cache',
//     }
//   );

//   if (!res.ok) throw new Error('Fetch Failed');

//   return res.json() as Promise<T>;
// };

// // // SINGLE
// // export const fetchInstance = async <T>(
// //   table_name: TableName,
// //   params?: string | URLSearchParams,
// //   token?: string,
// //   method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
// //   isSingle?: boolean,
// //   nextOptions: {
// //     revalidate?: number | false;
// //     tags?: string[];
// //   } = { revalidate: false }
// // ) => {
// //   const res = await fetch(
// //     `${baseURL}${table_name}${params ? `?${params}` : ''}`,
// //     {
// //       method,
// //       headers: {
// //         apikey: apikey ?? '',
// //         Authorization: `Bearer ${token || apikey}`,
// //         ...((method === 'POST' || method === 'PATCH') && {
// //           'Content-Type': 'application/json',
// //         }),
// //         ...(isSingle && { Accept: 'application/vnd.pgrst.object+json' }),
// //       },
// //       ...(nextOptions.revalidate && {
// //         next: {
// //           revalidate: nextOptions.revalidate,
// //           tags: nextOptions.tags,
// //         },
// //         cache: nextOptions.revalidate === 0 ? 'no-store' : 'force-cache',
// //       }),
// //     }
// //   );
// //   if (!res.ok) throw new Error('Fetch Failed');

// //   return res.json() as Promise<T>;
// // };
// const sync = async () => {
//   if (!userInfo || !isAuth) return;
//   await syncCartAction(
//     localCartItems.map((item) => ({
//       product: item.product.id,
//       slug: item.product.slug,
//       quantity: item.quantity,
//     })),
//     userInfo.user_id
//   );
//   dispatch(clearLocalCart());
// };

// const syncCart = async () => {
//   if (!isAuth) return;

//   const hasNewItems = localCartItems.some((localItem) => {
//     return !items?.some(
//       (item: CartItem) => item.product.slug === localItem.product.slug
//     );
//   });

//   if (hasNewItems) {
//     await sync();
//   }
// };

// const hasSyncedRef = useRef(false);

// useEffect(() => {
//   if (!isAuth || !mounted || localCartCount === 0 || !userInfo) return;
//   if (hasSyncedRef.current) return;

//   hasSyncedRef.current = true;

//   syncCart();
// }, [mounted, localCartCount, isAuth, userInfo]);

// useEffect(() => {
//   console.log(items);
// }, [items]);
