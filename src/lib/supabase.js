import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjmpntvltqjhithacgpf.supabase.co';
const supabasePublishableKey = 'sb_publishable_s5IOwpu5Tw7UHyuGw1OXLQ_NPANNPjN';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);