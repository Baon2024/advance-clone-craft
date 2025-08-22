//add 500 dummy ones
import { createClient } from '@supabase/supabase-js'



const supabaseUrl = "https://xmcyvimeuarsivupecuv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtY3l2aW1ldWFyc2l2dXBlY3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MzY2OTcsImV4cCI6MjA1MjExMjY5N30.0fsBw3u56U2Fv3yD4gtyhqJ31U-QHGr-EyJcXCRml_8"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function randomGmail(localLen = 8) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const rng = (() => {
    if (typeof globalThis.crypto?.getRandomValues === 'function') {
      return n => {
        const arr = new Uint32Array(n);
        globalThis.crypto.getRandomValues(arr);
        return Array.from(arr, x => alphabet[x % alphabet.length]);
      };
    } else {
      // Node fallback
      const { randomBytes } = require('crypto');
      return n => Array.from(randomBytes(n), b => alphabet[b % alphabet.length]);
    }
  })();

  const local = rng(localLen).join('') + '_' + Date.now();
  return `${local}@gmail.com`;
}


let dummyAmount = 500

for (let x = 0; x < dummyAmount; x++) {

    //create dummy email
    let email = randomGmail()

    //create dummy referral code
    const newReferralCode = `PAY${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    //get current waitling_list
    let { data: waitlist_salary_advance, error: error2 } = await supabase
      .from('waitlist_salary_advance')
      .select('waitlist_position')
    
          console.log("waitlist_positions already are: ", waitlist_salary_advance, error2)
          let currentWaitlistNumber = 0
          for (const item of waitlist_salary_advance) {
            if (item.waitlist_position > currentWaitlistNumber) {
              currentWaitlistNumber = item.waitlist_position;
              console.log("current_waitlist_number has risen to: ", currentWaitlistNumber);
            }
          }
    
          let nextWaitlistPosition = currentWaitlistNumber + 1
    
          
    
          const { data, error } = await supabase
          .from('waitlist_salary_advance')
          .insert([
            { email: email, referral_code: newReferralCode, waitlist_position: nextWaitlistPosition },
          ])
          .select()
    
          if (error) {
            console.log("error from waitlist entry insertion is: ", error)
          } else if (data) {
            console.log("data from waitlist entry insertion is: ", data)
          }
        console.log(`${x} out of 500 created!`)
}