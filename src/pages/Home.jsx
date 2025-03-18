import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";
import { debounce } from "lodash";


const Home = () => {
  const [hotCollectionsArray, setHotCollectionsArray] = useState()
  const [hotCollectionsItems, setHotCollectionsItems] = useState(4)
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = debounce(() => {
      if (window.innerWidth > 1024) {
        setHotCollectionsItems(4)
      } else if (window.innerWidth > 768) {
        setHotCollectionsItems(3)
      } else if (window.innerWidth > 576) {
        setHotCollectionsItems(2)
      } else {
        setHotCollectionsItems(1)
      }
    }, 200)

    window.addEventListener('resize', handleResize)
    try {
      async function fetchData() {
        const hotCollectionsData = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
        setHotCollectionsArray(hotCollectionsData.data)
      }
      fetchData();
    } catch (error) {
      console.log('[HOT_COLLECTIONS_FETCH_ERROR]: ', error)
    }
    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [hotCollectionsItems]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        {hotCollectionsArray  && 
          <HotCollections data={hotCollectionsArray} items={hotCollectionsItems} />
        }
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
