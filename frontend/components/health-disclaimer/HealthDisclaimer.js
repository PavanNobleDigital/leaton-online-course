import Image from "next/image";
import Link from "next/link";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import {updateDisclaimer} from "../../redux/action/AuthAction";
import bgImg from "../../public/images/bg/bg-image-10.jpg";


const HealthDisclaimer = () => {
  const [disclaimerData, setDisclaimerData] = useState(null);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const [agreed, setAgreed] = useState(user ? user.disclaimer : false);
  const dispatch =  useDispatch()
  const router = useRouter();

  useEffect(() => {
    if (token == null || token && user.disclaimer) {
      router.push('/');
    }
    const fetchData = async (token) => {
      try {
        const response = await fetch('/api/health-disclaimer/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setDisclaimerData(data);
        if (data.health_disclaimer_accepted != undefined) {
          setAgreed(user.disclaimer || data.health_disclaimer_accepted)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(token);
  }, [token]);

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreed) {
      try {
        const response = await fetch('/api/health-disclaimer/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            },
            method: "POST"
          },
        ); // Replace with your API endpoint
          const data = await response.json();
          setAgreed(data.user.disclaimer)
          dispatch(updateDisclaimer(data))
          if (agreed)
            router.push('/');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    };

  return (
    <>
      <div className="rbt-overlay-page-wrapper">
        <div className="breadcrumb-image-container breadcrumb-style-max-width">
          <div className="breadcrumb-image-wrapper">
            <Image src={bgImg} alt="Education Images" />
          </div>
          <div className="breadcrumb-content-top text-center">
            <h1 className="title">Health Disclaimer</h1>
            <p className="mb--20">This is Health Disclaimer.</p>
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right"></i>
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Health Disclaimer</li>
            </ul>
          </div>
        </div>

        <div className="rbt-putchase-guide-area breadcrumb-style-max-width rbt-section-gapBottom">
          <div className="rbt-article-content-wrapper">
            <div className="content">
              <h4>Please Read and accept the Disclaimer Document</h4>
              {disclaimerData ? <><p> {disclaimerData.Content} </p>


                <form className="newsletter-form mt--20" onSubmit={handleSubmit}>
                  <div className="col-12 mb--20">
                    <div className="check-box">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={handleAgreeChange} />
                      <label htmlFor="agree">I Agree</label>
                    </div>
                  </div>
                  <div className="form-group mb--0">
                    <button
                      className="rbt-btn rbt-switch-btn btn-gradient radius-round btn-sm"
                      type="submit"
                    >
                      <span data-text="Submit Now">Submit</span>
                    </button>
                  </div>
                </form></> : <p>loading...</p>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthDisclaimer;
