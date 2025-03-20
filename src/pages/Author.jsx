import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams()
  const [authorData, setAuthorData] = useState();
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    try {
      setLoading(true)
      const searchString = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      async function fetchAuthor() {
        const result = await axios.get(searchString)
        setAuthorData(result.data)
      }
      fetchAuthor();
      setLoading(false);
    } catch (error) {
      console.log('[FETCH_AUTHOR_DATA_ERROR]: ', error)
    }
  }, [id])

  function handleFollow() {
    setFollowed((prev) => {
      console.log(!prev)
      return !prev;
    })
    
  }

  if (loading) {
    return (
      <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <Skeleton height={'6rem'} width={"6rem"} borderRadius={'50%'} />
                      <div className="profile_name">
                        <div className="skeleton-author-name">
                          <Skeleton height={'1.5rem'} width={'10rem'} borderRadius={'0-'} />
                          <Skeleton height={'1rem'} width={'8rem'} borderRadius={'0-'} />
                          <Skeleton height={'1.2rem'} width={'10rem'} borderRadius={'0-'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Skeleton height={'3rem'} width={'12rem'} borderRadius={'0'} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={undefined} loading={loading} authorImage={undefined} authorId={undefined} />
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

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData?.authorName}
                          <span className="profile_username">{authorData?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData?.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(authorData?.address)}}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{(followed ? authorData?.followers + 1 : authorData?.followers) + ' followers'}</div>
                      <button onClick={handleFollow} className="btn-main">
                        {followed ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {authorData && 
                  <AuthorItems data={authorData?.nftCollection} loading={loading} authorImage={authorData?.authorImage} authorId={authorData?.authorId} />
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    
  );
};

export default Author;
