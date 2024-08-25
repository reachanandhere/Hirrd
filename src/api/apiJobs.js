import supabaseClient from "@/utils/supabase";


export async function getJobs(token, {location, company_id, searchQuery}) {
  const supabase = await supabaseClient(token)
  let query = supabase.from("jobs").select("*")

  if(location) {
    query = query.eq("location", location)
  }

    if(company_id) {
    query = query.eq("company_id", company_id)
    }

    if(searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`)
    }

  const {data, error} = await query;
  if(error) {
    throw new Error(error.message)
  }

  return data
}