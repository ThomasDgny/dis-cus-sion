import { Database } from "@/lib/database.type";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export  const supabase = createServerComponentClient<Database>({ cookies });
