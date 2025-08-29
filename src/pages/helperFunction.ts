import { supabase } from "@/hooks/use-supabase";




//getNextWaitlistPosition



export async function getNextWaitlistPosition() {

    let { data: waitlist_salary_advance, error: error2 } = await supabase
      .from('waitlist_salary_advance')
      .select('waitlist_position')
    
    console.log("waitlist_positions already are: ", waitlist_salary_advance, error2)
    let currentWaitlistNumber = 0
    for (const item of waitlist_salary_advance) {
        if (item.waitlist_position > currentWaitlistNumber) {
            currentWaitlistNumber = item.waitlist_position;
              //console.log("current_waitlist_number has risen to: ", currentWaitlistNumber);
            }
          }
    
        let nextWaitlistPosition = currentWaitlistNumber + 1
        console.log("nextWaitlistPositionIs: ", nextWaitlistPosition)
    return nextWaitlistPosition
}


export async function addRefereeToWaitlistNoReferralCode(email, newReferralCode, nextWaitlistPosition, landing_page) {
  const { data, error } = await supabase
    .from('waitlist_salary_advance')
    .insert([
      { email: email, referral_code: newReferralCode, waitlist_position: nextWaitlistPosition, landing_page_referral: landing_page },
    ])
    .select();

  if (error) {
    console.log("error from waitlist entry insertion is:", error);
    return { success: false, error };
  }

  console.log("data from waitlist entry insertion is:", data);
  return { success: true, data };
}



export async function checkWhetherEmailAlreadyWaitlisted(email) {


    let { data: emailNotWaitlisted, error } = await supabase
        .from('waitlist_salary_advance')
        .select("*")
        .eq('email', email)
    
    if (error) {
        console.log("email is not already in waitlist")
        return { notWaitlisted: true, error }
    } else if (emailNotWaitlisted) {
        console.log("email already waitlisted!")
        return { notWaitlisted: false, emailNotWaitlisted}
    }

}


//functions to send events to facebook
//https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}