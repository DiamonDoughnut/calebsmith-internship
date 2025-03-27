import React from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css'; 

const TopSellers = ({data}) => {
  Aos.init();
  const fallback = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              { data ? (
                data?.map((item, index) => (
                  <li key={item.id} data-aos='fade-up' data-aos-delay={250 * ((index % 3) / 1)} data-aos-offset={-300 * ((index % 3) / 1)}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                      <span>{item.price + ' ETH'}</span>
                    </div>
                  </li>
                    )
                  )
                ) : (
                  fallback.map((_, index) => {
                    return( 
                  <li key={index}>
                    <div className="author_list_pp skeleton-auth skeleton-auth-top">
                        <div
                          className="lazy skeleton-box"
                        />
                    </div>
                    <div className="author_list_info skeleton-auth-info">
                      <div className="skeleton-box skeleton-name-top"> </div>
                      <span className="skeleton-box skeleton-price-top"> </span>
                      <span className="skeleton-label-top">{' ETH '}</span>
                    </div>
                  </li>
                )}))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
