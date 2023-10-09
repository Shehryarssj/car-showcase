"use client";
import { Hero, SearchBar, CustomFilter, CarCard } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { useState, useEffect } from "react";

export default function Home({ searchParams }: { searchParams: any }) {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    setLoading(true);
    const cars = await fetchCars({
      manufacturer: searchParams.manufacturer || "",
      year: searchParams.year || 2023,
      fuel: searchParams.fuel || "",
      limit: searchParams.limit || 10,
      model: searchParams.model || "",
    });
    setAllCars(cars);
    setLoading(false);
  };
  useEffect(() => {
    getCars();
  }, [searchParams]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters" id="search">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        <section>
          <div className="home__cars-wrapper">
            {loading && (
              <div className="min-w-[900px] flex items-center justify-center ">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              </div>
            )}
            {!loading && Array.isArray(allCars) && allCars.length !== 0
              ? allCars.map((car) => <CarCard car={car} />)
              : !loading && (
                  <div className="home__error-container">
                    <h2 className="text-black text-xl font-bold">
                      Oops, no results
                    </h2>
                  </div>
                )}
          </div>
        </section>
      </div>
    </main>
  );
}
