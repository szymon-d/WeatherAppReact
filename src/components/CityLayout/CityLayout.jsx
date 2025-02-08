import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SideBar from "./SideBar/SideBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useState } from "react";
import MainContent from "./MainContent/MainContent";

export default function CityLayout() {
  /**
   * City layout that includes:
   * - Left sidebar
   * - Main content (on the middle)
   */
  const { city, latitude, longitude } = useParams(); //Param from url
  const [activeDay, setActiveDay] = useState(0); //Active day from SideBar

  const fetchData = async () => {
    /**
     * Fetch temperature data for city
     */
    const url = `https://api.open-meteo.com/v1/forecast?${new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      hourly: "temperature_2m",
    }).toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Temperature for ${city} is not available.`);
    }
    return await response.json();
  };

  //Hook for city data
  const {
    data: data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${latitude}${longitude}`, []],
    queryFn: fetchData,
    staleTime: 1000 * 60,
    catchTime: 1000 * 60,
    retry: 2,
  });

  //Loading Screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  //Error screen
  if (isError) {
    return <div>Error...</div>;
  }

  //Base data
  const timeZone = data["timezone"];
  const unit = data["hourly_units"]["temperature_2m"];
  const daysMapper = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //Storage for temperatures
  const temperatures = {};

  data["hourly"]["time"].forEach((date, index) => {
    const dateObject = new Date(date);
    const temperature = data["hourly"]["temperature_2m"][index];

    const day = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();
    const dayName = daysMapper[dateObject.getDay()];

    const dayData = {
      time: time,
      temp: temperature,
    };

    //Save data in storage
    if (day in temperatures) {
      temperatures[day]["dayData"].push(dayData);
    } else {
      temperatures[day] = {
        dayName: dayName,
        unit: unit,
        timeZone: timeZone,
        dayData: [dayData],
      };
    }
  });

  //Construct main content layout
  //Each SideBar tab will have separated <MainContent> but only on of them will be visible
  const mainContent = Object.entries(temperatures).map(([day, data], index) => {
    return (
      <MainContent
        key={`mainContent${index}`}
        index={index}
        activeDay={activeDay}
        data={data}
      />
    );
  });

  //Serve CityLayout
  return (
    <div className="d-flex d-inline">
      <SideBar
        data={temperatures}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
      {mainContent}
    </div>
  );
}
