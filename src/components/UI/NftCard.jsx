import React from 'react'
import { Link } from 'react-router-dom'
import Countdown from '../home/Countdown'

function NftCard({item, index, likedArray, handleLikes}) {
  return (
    <div
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item" data-aos="fade-up" data-aos-delay={200 * index} data-aos-anchor-placement='top-bottom'>
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item.expiryDate  && 
            <Countdown time={item.expiryDate} />
            }

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
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
              <i id={`likeButton${index}`} className="fa fa-heart" onClick={() => handleLikes(index)} />
              <span>{(likedArray.some(value => value === index)) ? (item.likes + 1) : (item.likes)}</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default NftCard