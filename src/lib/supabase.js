import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjmpntvltqjhithacgpf.supabase.co';
const supabaseAnonKey = 'sb_publishable_s5IOwpu5Tw7UHyuGw1OXLQ_NPANNPjN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.from('projects').select('*', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Supabase error:', error.message);
    } else {
      console.log('Supabase connected! Total projects:', count);
    }
  });