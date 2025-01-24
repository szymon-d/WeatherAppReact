import "bootstrap/dist/css/bootstrap.min.css";
import style from "./MainContent.module.css";
import React, { useContext, useEffect, useState } from "react";
import CityCard from "../CityCard/CityCard";

export default function MainContent({ searchQuery }) {
  // Add React Query in future instead of common fetch

  //Hooks
  // const [data, setData] = useState({});
  // const [error, setError] = useState(null);
  // const [params, setParams] = useState({
  //   latitude: 50.06,
  //   longitude: 23,
  //   hourly: "temperature_2m",
  // });

  const [cities, setCities] = useState(() => {
    // Załaduj dane z localStorage podczas inicjalizacji
    const savedData = localStorage.getItem("layoutData");
    console.log("load", savedData);
    return savedData ? JSON.parse(savedData) : [];
  });

  //Fetch city data
  useEffect(() => {
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

      result = result.filter((cityData, idx, self) => {
        //Keep first index only
        const firstIndex = self.findIndex((obj) => {
          return obj.details === cityData.details;
        });
        return firstIndex === idx;
      });

      setCities(result);
      localStorage.setItem("layoutData", JSON.stringify(result));
    };
    try {
      fetchData();
    } catch (error) {
      setCities([]);
      console.error(error);
    }
  }, [searchQuery]);

  // //Fetch data from API
  // useEffect(() => {
  //   //Build url with query params
  //   const url = `https://api.open-meteo.com/v1/forecast?${new URLSearchParams({
  //     latitude: Number(searchQuery.split(" ")[0]),
  //     longitude: Number(searchQuery.split(" ")[1]),
  //     hourly: "temperature_2m",
  //   }).toString()}`;

  //   const fetchData = async () => {
  //     try {
  //       //Fetch data
  //       const response = await fetch(url);

  //       //Check response
  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`);
  //       }

  //       //Get result from json
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       setError(error.message);
  //       console.error(error);
  //     }
  //   };

  //   // fetchData();
  // }, []);

  //Ger all data
  // const temperatures = [];
  // if ("hourly" in data) {
  //   data.hourly.time.map((time, index) => {
  //     temperatures.push(
  //       <div key={index}>
  //         {time}, {data.hourly.temperature_2m.indexOf(index)}
  //       </div>
  //     );
  //   });
  // }
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {cities.map((cityData) => {
          return (
            <div
              key={cityData.placeId}
              className="col-lg-4 col-md-6 col-sm-12 p-4"
            >
              <CityCard
                cityName={cityData.name}
                details={cityData.details}
              ></CityCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
