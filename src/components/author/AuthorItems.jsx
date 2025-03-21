import React, { useState } from "react";
import NftCard from '../UI/NftCard'
import NftCardSkeleton from "../UI/NftCardSkeleton";
 
const AuthorItems = ({ data, authorImage, loading, authorId }) => {
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

  if (loading) {
    return (
      <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <NftCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
    )
  }  

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data.map((item, index) => (
            <NftCard key={item.id} item={{...item, authorImage, authorId}} likedArray={likedArray} handleLikes={handleLikes} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
