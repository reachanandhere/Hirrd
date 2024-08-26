import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    throw new Error(error.message);
    return null;
  }

  return data;
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), applications: applications(*)",)
    .eq("id", job_id).single();

  if (error) {
    throw new Error(error.message);
    return null;
  }

  return data;
}
