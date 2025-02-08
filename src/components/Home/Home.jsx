import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Home.module.css";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CityCard from "../CityCard/CityCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Error500 from "../Error500/Error500";

export default function Home({ searchQuery }) {
  //Hooks
  // const [data, setData] = useState({});
  // const [error, setError] = useState(null);
  // const [params, setParams] = useState({
  //   latitude: 50.06,
  //   longitude: 23,
  //   hourly: "temperature_2m",
  // });

  //Fetch city data
  const fetchData = async () => {
    const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Gathering city data failed. Status code: ${response.status}`
      );
    }

    let result = await response.json();

    result = result.map((cityData) => {
      return {
        name: cityData.name,
        placeId: cityData.place_id,
        details: cityData.display_name,
        latitude: cityData.lat,
        longitude: cityData.lon,
        placeType: cityData.addresstype,
      };
    });

    return result.filter((cityData, idx, self) => {
      //Keep first index only
      const firstIndex = self.findIndex((obj) => {
        return obj.details === cityData.details;
      });
      return firstIndex === idx;
    });
  };

  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchCityData", searchQuery], // Include searchQuery to refetch on change
    queryFn: fetchData,
    enabled: !!searchQuery, // Ensure query runs only when searchQuery is defined
    cacheTime: 1000 * 60 * 5, //5min
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (cities.length == 0 && !!searchQuery) {
    return <Error500 message={"None place has been found."}></Error500>;
  }

  if (cities.length == 0 && !searchQuery) {
    return <Error500 message={"Please type place name."}></Error500>;
  }

  if (isError) {
    return <Error500 message={"Internal Error"}></Error500>;
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {cities.map((cityData) => {
          console.log(cityData);
          return (
            <div
              key={cityData.placeId}
              className="col-lg-4 col-md-6 col-sm-12 p-4"
            >
              <CityCard
                cityName={cityData.name}
                details={cityData.details}
                latitude={cityData.latitude}
                longitude={cityData.longitude}
              ></CityCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
