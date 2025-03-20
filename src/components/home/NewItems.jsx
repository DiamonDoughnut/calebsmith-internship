import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import Arrow from "./CarouselArrow";
import Countdown from "./Countdown";
import NftCard from "../UI/NftCard";

const NewItems = ({data, items}) => {

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

  const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider(
      {
        initial: 0,
        loop: true,
        slides: {
          perView: items,
          spacing: 12
        },
        created() {
          setLoaded(true)
        },
      }
    )
    
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            ref={sliderRef}
            className='keen-slider'
          >
          {data?.map((item, index) => (
            item ? (
            <NftCard item={item} index={index} likedArray={likedArray} handleLikes={handleLikes} />
            ) : (
              <div id="carousel-div" className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide skeleton-wrapper" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp skeleton-auth-new skeleton-box">
                    <div className="lazy" />
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                    <div
                      className="lazy skeleton-box skeleton-main"
                    />
                </div>
                <div className=" skeleton-info-new">
                    <h4 className="skeleton-name skeleton-box">{' '}</h4>
                  <div className="skeleton-flex">
                  <div> <h4 className="skeleton-box skeleton-info-price">{ ' '}</h4> <span className="">ETH</span></div>
                  <div className="">
                    <i className="fa fa-heart"></i>
                    <h4 className="skeleton-info-like skeleton-box">{' '}</h4>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            )
          ))}
          {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={() =>
                    instanceRef.current?.prev()
                  }
                />

                <Arrow
                  onClick={() =>
                    instanceRef.current?.next()
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
