import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();
  const [saved, setSaved] = React.useState(savedInit);
  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: saveLoading,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  useEffect(() => {
    if (savedJobs != undefined) setSaved(savedJobs?.length > 0);
    //else setSaved(false);
  }, [savedJobs]);

  const handleSaveJob = async () => {
    await fnSavedJobs({
      job_id: job.id,
      user_id: user.id,
    });
    onJobSaved();
  };

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className=" h-6"
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={18} className="text-gray-500" /> {job.location}
          </div>
        </div>

        <hr />
        {job.description.substring(0, 120) + "..."}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={saveLoading}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red"></Heart>
            ) : (
              <Heart size={20}></Heart>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
