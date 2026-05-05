'use server';

import { postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { ContactMessageInput } from '@/schemas/contact.schema';
import { ActionState } from '@/types';

export const sendContactMessageAction = async (
  data: ContactMessageInput
): Promise<ActionState> => {
  const actionState: ActionState = { ...initialActionState };

  try {
    await postData('shop_contactmessages', data);
    actionState.status = 'success';
    actionState.message = 'Your message has successfully sent!';
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message =
      err.message ||
      'An error occured while sending message. Please try again!';
    return actionState;
  }
};
