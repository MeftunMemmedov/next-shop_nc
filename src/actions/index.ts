// 'use server';

// import { signUp } from '@/api/fetch/helpers/auth';
// import { initialActionState } from '@/constants/actionstatus';
// import { LoginInput } from '@/schemas/login.schema';
// import { RegisterInput, registerSchema } from '@/schemas/register.schema';
// import { ActionState } from '@/types';

// export const serverAction = async <FormType>(
//   action: (data: FormType | FormData) => Promise<void>,
//   data: FormType,
//   actionState: ActionState,
//   message: { success: string; failure: string }
// ): Promise<ActionState> => {
//   try {
//     await action(data);

//     actionState.status = 'success';
//     actionState.message = message.success;
//     return actionState;
//   } catch (error) {
//     const err = error as Error;
//     actionState.status = 'failure';
//     actionState.message = err.message || message.failure;
//     return actionState;
//   }
// };

// export const regAction = async (data: RegisterInput) => {
//   const actionState: ActionState = initialActionState;
//   const parsed = registerSchema.safeParse(data);
//   if (!parsed.success) {
//     actionState.status = 'failure';
//     actionState.message = 'Validation Failed';
//     return actionState;
//   }

//   const {
//     email,
//     password,
//     confirmPassword,
//     data: { user_name },
//   } = parsed.data;

//   const signUpAction = async () =>
//     await signUp({
//       email,
//       password,
//       confirmPassword,
//       data: {
//         user_name,
//       },
//     });

//   return await serverAction(signUpAction, data, actionState, {
//     success: 'you have successfully signed up',
//     failure: 'an errror occured while signing up',
//   });
// };
