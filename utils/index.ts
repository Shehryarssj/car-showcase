// @ts-nocheck
import { FilterProps } from "@/Types";
import { CarProps } from "@/Types";
import "dotenv/config";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${20}&fuel_type=${fuel}`;
  const headers = {
    "X-RapidAPI-Key": "ff29af8622msh5a453ad6674079ap10dc7ajsnb98f5fcb3aba",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(url, { headers: headers });
  const result = await response.json();
  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modeYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  return `${url}`;
};
