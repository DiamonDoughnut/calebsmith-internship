import React from 'react'
import Skeleton from './Skeleton'

function NftCardSkeleton() {
  return (
    <div
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
                <Skeleton width={'3rem'} height={"3rem"} borderRadius={'50%'}  />
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
                <Skeleton height={'50%'} width={'100%'} borderRadius={'0'} />
            </div>
            <div className="nft__item_info w-100">
                <div className="">
                <div className="w-50 flex-column">
                    <Skeleton height={'1rem'} width={'100%'} borderRadius={'0'} />
                    <Skeleton height={'1rem'} width={'100%'} borderRadius={'0'} />
                </div>
                <div className="nft__item_like flex w-50 align-items-end skeleton-info-adjust">
                    <i className="fa fa-heart mr-1" />
                    <Skeleton height={'1rem'} width={'25%'} borderRadius={'0'} />
                </div>
                </div>
            </div>
          </div>
        </div>
  )
}

export default NftCardSkeleton