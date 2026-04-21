'use server';

import { fetchData } from '@/api/fetch/helpers';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

type CartActionState = {
  status: 'success' | 'failure';
  message: string;
};

export const toggle_Cart = async (
  _prevState: CartActionState | null,
  formData: FormData
) => {
  const user_id = formData.get('user_id');
  const product = formData.get('product');
  const quantity = formData.get('quantity');
  const intent = formData.get('intent');
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  try {
    if (intent === 'remove') {
      await fetchData(
        'shop_cart',
        {
          product: `eq.${product}`,
        },
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
    }

    if (intent === 'add') {
      await fetchData('shop_cart', undefined, {
        method: 'POST',
        body: JSON.stringify({
          user_id,
          product,
          quantity,
        }),
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
    }
    return { status: 'success', message: 'Cart actin successful' };
  } catch {
    return {
      status: 'failure',
      message: 'Error while cart action',
    };
  }
};

export const update_cartItemQuantity = async (
  _prevState: CartActionState | null,
  formData: FormData
) => {
  const product = formData.get('product');
  const quantity = parseInt(formData.get('quantity') as string);
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  try {
    await fetchData(
      'shop_cart',
      {
        product: `eq.${product}`,
      },
      {
        method: 'PATCH',
        body: JSON.stringify({
          quantity,
        }),
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return { status: 'success', message: 'Updated quantity' };
  } catch {
    return {
      status: 'failure',
      message: 'Error while updating quantity',
    };
  }
};

export const revalidateCartData = async () => {
  revalidateTag('cart', {});
};

// export const addto_Cart = async (_: any, formData: FormData) => {
//   const user_id = formData.get('user_id');
//   const product = formData.get('product');
//   const quantity = formData.get('quantity');
//   const no = formData.get('mode') === 'no';

//   const cookieStore = await cookies();
//   const access = cookieStore.get('access')?.value;
//   try {
//     if (no) {
//       await fetchData('shop_cart', undefined, {
//         method: 'POST',
//         body: JSON.stringify({
//           user_id,
//           product,
//           quantity,
//         }),
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });

//       return { success: true, message: 'Added to cart' };
//     }
//   } catch (error) {
//     return {
//       failure: true,
//       message: 'Error while adding to cart',
//     };
//   }
// };

// export const removefrom_Cart = async (_: any, formData: FormData) => {
//   const product = formData.get('product');
//   const exists = formData.get('mode') === 'exists';
//   try {
//     if (exists) {
//       await fetchData(
//         'shop_cart',
//         {
//           product: `eq.${product}`,
//         },
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${access}`,
//           },
//         }
//       );

//       return { success: true, message: 'Removed from cart by action' };
//     }
//   } catch (error) {
//     return {
//       failure: true,
//       message: 'Error while removing from cart',
//     };
//   }
// };
