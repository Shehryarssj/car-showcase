import { Hero, SearchBar, CustomFilter, CarCard } from "@/components";
import Image from "next/image";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: { searchParams: any }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
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
            {Array.isArray(allCars) && allCars.length !== 0 ? (
              allCars.map((car) => <CarCard car={car} />)
            ) : (
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">
                  Oops, no results
                </h2>
                <p>{allCars?.message}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
