import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";

import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [company_id, setCompany_id] = React.useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const clearFilter = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("")
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    if (formData.get("search-query")) {
      setSearchQuery(formData.get("search-query"));
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex h-14 w-full gap-2 items-center mb-4"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          value={searchQuery}
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" variant="blue" className="h-full sm:w-28">
          Submit
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        {/* <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            {State.getStatesOfCountry("US").map((state) => {
              return <SelectItem key={state.name} value={state.name}>
                {state.name}
              </SelectItem>;
            })}
          </SelectContent>
        </Select> */}

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            {companies?.map(({name,id}) => {
              return <SelectItem key={name} value={id}>
                {name}
              </SelectItem>;
            })}
          </SelectContent>
        </Select>
        <Button onClick={clearFilter} variant="destructive">Clear Filter</Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs == false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div className="flex justify-center text-center mt-4 text-6xl w-screen">
             No Jobs Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
