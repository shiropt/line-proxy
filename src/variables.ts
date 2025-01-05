// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const LINE_MESSAGE_PUSH_URL = process.env.LINE_MESSAGE_PUSH_URL;
export const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
export const MY_LINE_USER_ID = process.env.MY_LINE_USER_ID;

export const SUPABASE_ANON_KEY = process.env.SUPABASE_PRODUCTION_ANON_KEY;
// export const SUPABASE_ANON_KEY = process.env.SUPABASE_LOCAL_ANON_KEY;
// export const SUPABASE_FUNCTION_URL =
//   process.env.SUPABASE_FUNCTION_LOCAL_URL;
export const SUPABASE_FUNCTION_URL =
  process.env.SUPABASE_FUNCTION_PRODUCTION_URL;
