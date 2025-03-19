import React, { useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Arrow from "./CarouselArrow";

const HotCollections = ({ data, items }) => {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: items,
      spacing: 12,
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section
      id='section-collections'
      className='no-bottom'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          <div
            ref={sliderRef}
            className='keen-slider'
          >
            {data?.map((item) =>
              item ? (
                <div
                  id='carousel-div'
                  className='col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide'
                  key={item.id}
                >
                  <div className='nft_coll'>
                    <div className='nft_wrap'>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className='lazy img-fluid'
                          alt={`${item.title}`}
                        />
                      </Link>
                    </div>
                    <div className='nft_coll_pp'>
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className='lazy pp-coll'
                          src={item.authorImage}
                          alt={`${item.author}`}
                        />
                      </Link>
                      <i className='fa fa-check'></i>
                    </div>
                    <div className='nft_coll_info'>
                      <Link to={`/explore/${item.title}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-div'
                  className='col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide skeleton-wrapper'
                  key={item.id}
                >
                  <div className='nft_coll'>
                    <div className='nft_wrap'>
                      <div className='lazy img-fluid skeleton-box skeleton-main' />
                    </div>
                    <div className='nft_coll_pp skeleton-auth'>
                      <div className='lazy skeleton-box ' />
                    </div>
                    <div className='nft_coll_info'>
                      <div className='w-25 skeleton-box'> </div>
                    </div>
                    <span className='w-25 skeleton-box'> </span>
                  </div>
                </div>
              )
            )}

            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
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



export default HotCollections;
