import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from '../UI/NftCard'
import NftCardSkeleton from '../UI/NftCardSkeleton'

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState();
  const [loading, setLoading] = useState(true);
  const [apiString, setApiString] = useState('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore')
  const [shownItems, setShownItems] = useState(8);
  const baseApiString = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
  useEffect(() => {
    
    window.scrollTo(0, 0);
    async function fetchData() {
      setLoading(true)
      try {
        const result = await axios.get(apiString)
        setExploreData(result.data)
      } catch (error) {
        console.log('[EXPLORE_PAGE_API_REQUEST_ERROR]: ', error) 
      } finally {
        setLoading(false)
      }
    }
    fetchData();

  }, [apiString]);

  const [likedArray, setLikedArray] = useState(new Array())

  function handleLikes(index) {
    const item = document.getElementById(`likeButton${index}`)
    if (likedArray.some((value) => value === index)) {
      setLikedArray(likedArray.filter((value) => value !== index))
      item?.classList.remove('user-liked')
    }
    else {
      setLikedArray([...likedArray, index])
      item?.classList.add('user-liked')
    }
  }


  if ( loading ) {
    return (
    <>
      <div>
        <select id="filter-items" disabled onChange={(e) => {setApiString(baseApiString + e.target.value); setShownItems(8)}} defaultValue="">
          <option value="">Default</option>
          <option value="?filter=price_low_to_high">Price, Low to High</option>
          <option value="?filter=price_high_to_low">Price, High to Low</option>
          <option value="?filter=likes_high_to_low">Most liked</option>
        </select>
      </div>
      {
        new Array(8).fill(0).map((_, index) => (
            <NftCardSkeleton key={index} />
        ))}
        </>
        )
      
    
  }

  return (
    <>
      <div>
        <select id="filter-items" onChange={(e) => {setApiString(baseApiString + e.target.value); setShownItems(8)}} defaultValue="">
          <option value="">Default</option>
          <option value="?filter=price_low_to_high">Price, Low to High</option>
          <option value="?filter=price_high_to_low">Price, High to Low</option>
          <option value="?filter=likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Grid container */}
      {exploreData.map((item, index) => {
        if (index < shownItems) {
          return (
            <NftCard key={item.id} item={item} index={index} likedArray={likedArray} handleLikes={handleLikes} />
          )
        }
      })}
      {/* Load more button */}
      {exploreData && exploreData.length > shownItems && (
        <div className="col-md-12 text-center">
          <button 
            onClick={() => setShownItems(prev => prev + 4)}
            className="btn-main lead"
          >
            Load More
          </button>
        </div>
      )}
    </>
  )
};
  export default ExploreItems;
