"use client";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import SeoMeta from "@/components/meta/index.js";
import axios from "axios";
import Sidebar from "./sideBar.js";
import AdsResult from "./adsResult.js";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "next/navigation";

export default function BikeSearch() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchParamsState, setSearchParamsState] = useState({});

  const searchParams = useSearchParams();

  // Extract search params in useEffect
  useEffect(() => {
    const params = {
      selectedAdType: searchParams.get("at"),
      selectedMake: searchParams.get("mk"),
      selectedModel: searchParams.get("md"),
      selectedYear: searchParams.get("year"),
      selectedCity: searchParams.get("ct"),
      selectedCategories: searchParams.get("ctg"),
      selectedCondition: searchParams.get("cnd"),
      selectedMinPrice: searchParams.get("mnp"),
      selectedMaxPrice: searchParams.get("mxp"),
      searchData: searchParams.get("sr"),
    };
    setSearchParamsState(params);
  }, [searchParams]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`${baseUrl}/bycategory`);
        setVehicleCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (filterName, value) => {
    setPage(0);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const user = localStorage.getItem("data");
  const userId = user ? JSON.parse(user)?.id : null;

  const fetchData = useCallback(
    async (filters, page) => {
      try {
        setLoading(true);
        const category = filters.category || selectedCategory || 0;
        const search = filters.search || searchParamsState.searchData || " ";
        const make = filters.make || searchParamsState.selectedMake || 0;
        const model = filters.model || searchParamsState.selectedModel || [];
        const year = filters.year || searchParamsState.selectedYear || [];
        const city = filters.city || searchParamsState.selectedCity || 0;
        const mileage = filters.mileage || 0;
        const fule = filters.fule || "";
        const add = filters.add || searchParamsState.selectedAdType || "";
        const minPrice = filters.minPrice || searchParamsState.selectedMinPrice;
        const maxPrice = filters.maxPrice || searchParamsState.selectedMaxPrice;

        const response = await axios.get(`${baseUrl}/bike-filter-post`, {
          params: {
            page: page,
            search_name: search,
            city_name: city,
            makeName: make,
            modelName: model,
            year_id: year,
            price_from: minPrice,
            price_to: maxPrice,
            engine_capacity: category,
            mileage: mileage,
            enginetype: fule,
            addtype: add,
            condition: "used",
          },
        });

        setPostData(response?.data?.posts?.data);
        setFeaturedData(response?.data?.featured_adds?.data);
        setTotalPages(response?.data?.posts?.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      selectedCategory,
      searchParamsState,
    ]
  );

  useEffect(() => {
    if (Object.keys(searchParamsState).length > 0) {
      fetchData(filters, page);
    }
  }, [fetchData, filters, page, searchParamsState]);

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <SeoMeta
        title="Search Used Bikes | FameWheels"
        desc="Find Reliable and Affordable used bikes in Excellent Condition at our dealership. we are choose from  large selection of automobiles here to find the perfect used bikes today."
        url="search"
      />
      <div className="used_main text-center p-5 d-none">
        <div className="container h-100 d-flex justify-content-start align-items-center">
          <h3>Search Bikes In UAE</h3>
        </div>
      </div>
      <div className=" text-center mt-3">
        <div className="container d-flex justify-content-md-start justify-content-center align-items-center">
          <h3 className="fw-700">Find Used Bikes In UAE</h3>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5 mt-2">
          <div className="text-end ">
            <button
              className=" toggleLeftIcon float-end btn d-block d-md-none fw-600 focusUnset"
              onClick={toggleDrawer("left", true)}
            >
              <i className="fa-solid fa-bars-staggered mb-3 me-2"></i>
              Filters
            </button>
            <div>
              <Fragment key="left">
                <SwipeableDrawer
                  anchor="left"
                  open={state.left}
                  onClose={toggleDrawer("left", false)}
                  onOpen={toggleDrawer("left", true)}
                  className="filterSidebar"
                >
                  {/* Content for the "right" drawer */}
                  <div className="p-3 filterSidebar">
                    <h5 className="fs-6 fw-500 mb-3">Apply filters</h5>
                    <Sidebar
                      vehicleCategory={vehicleCategory}
                      onCategoryChange={handleCategoryChange}
                      selectedFilters={filters}
                      onFilterChange={handleFilterChange}
                      searchData={searchParamsState.searchData}
                    />
                  </div>
                </SwipeableDrawer>
              </Fragment>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 d-none d-md-block">
            <Sidebar
              vehicleCategory={vehicleCategory}
              onCategoryChange={handleCategoryChange}
              selectedFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="col-lg-9 col-md-8">
            <AdsResult
              selectedCategory={selectedCategory}
              selectedAdType={searchParamsState.selectedAdType}
              featuredData={featuredData}
              postData={postData}
              loading={loading}
            />
          </div>
        </div>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </div>
        )}
      </div>
    </>
  );
}
