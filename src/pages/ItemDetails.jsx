import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from '../components/UI/Skeleton'

const ItemDetails = () => {
  const [itemData, setItemData] = useState()
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      setLoading(true)
      const searchString = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      async function fetchData() {
        const result = await axios.get(searchString)
        setItemData(result.data)
      }
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log('[FETCH_ITEM_DETAILS_ERROR]: ', error)
    }
  }, [id]);

  function handleLike () {
    const likeButton = document.getElementById('like-button')
    const likeHeart = document.getElementById('like-heart')
    setLiked((prev) => {
      if (prev) {
        likeButton?.classList.remove('item-liked');
        likeHeart?.classList.remove('item-liked-heart');
      } else {
        likeButton?.classList.add('item-liked')
        likeHeart?.classList.add('item-liked-heart')
      }
      return !prev
    })
  }

  if (loading) {
    return (
      <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton height={'100%'} width={'100%'} borderRadius={'0'} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton height={'2rem'} width={'25rem'} borderRadius={'0'} />

                  <div className="item_info_counts">
                      <Skeleton height={'1.5rem'} width={'2rem'} borderRadius={'0'} />
                      <Skeleton height={'1.5rem'} width={'2rem'} borderRadius={'0'} />
                  </div>
                  <Skeleton height={'5rem'} width={'40rem'} borderRadius={'0'} />
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton height={'3.2rem'} width={'3.2rem'} borderRadius={'50%'} />
                        </div>
                        <div className="author_list_info">
                          <Skeleton height={'1.2rem'} width={'8rem'} borderRadius={'0'} />
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton height={'3.2rem'} width={'3.2rem'} borderRadius={'50%'} />
                        </div>
                        <div className="author_list_info">
                          <Skeleton height={'1.2rem'} width={'8rem'} borderRadius={'0'} />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <Skeleton height={'2rem'} width={'5rem'} borderRadius={'0'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    )
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemData?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{`${itemData?.title} #${itemData?.tag}`}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData?.views}
                    </div>
                    <div id="like-button" className="item_info_like" onClick={handleLike}>
                      <i id='like-heart' className="fa fa-heart"></i>
                      {liked ? itemData?.likes + 1 : itemData?.likes}
                    </div>
                  </div>
                  <p>
                    {itemData?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData?.ownerId}`}>
                            <img className="lazy" src={itemData?.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData?.ownerId}`}>{itemData?.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData?.creatorId}`}>
                            <img className="lazy" src={itemData?.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData?.creatorId}`}>{itemData?.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{itemData?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
