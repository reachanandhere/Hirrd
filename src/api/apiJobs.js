import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved : saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);
  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return data;
  }

  const { data, error: insertError } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating Job");
    }
  
    return data;
  }

  export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job: jobs(*, company: companies(name,logo_url))");
  
    if (error) {
      console.error("Error fetching Saved Jobs:", error);
      return null;
    }
  
    return data;
  }
