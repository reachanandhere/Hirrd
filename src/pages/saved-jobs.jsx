import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";

import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className={`mt-8 grid  ${savedJobs?.length? "lg:grid-cols-3 md:grid-cols-2" : "w-full text-center"}  gap-4 w-full`}>
          {savedJobs?.length ? (
            savedJobs?.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobSaved={fnSavedJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
            <div className="text-6xl flex justify-center text-center">No Saved Jobs 👀</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
