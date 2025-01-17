import React, { useState } from "react";
import EventCard from "../EventCard/eventCard";
import "./Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleChevronLeft} color="rgba(0, 0, 0, 0.7)" size="2x" />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleChevronRight} color="rgba(0, 0, 0, 0.7)" size="2x" />
    </div>
  );
};

/*events array contains all the events.

Each event object has the following fields / props:

1. name1: The name of the event. Eg: Manthan
2. name2: The event discription.Eg: Cultural event
3. BgImg: The Background image of the event. (Import the file to pass into the array)
4. date: The date of the event.
5. content: The content describing the event.

Following props / fields should not be added to the array objects:

1. expand: Is a state handler prop.
2. changeActive: Is a prop function to manage state change.
3. key: Automatically handled for each event.
*/

const events = [
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
  {
    name1: "Manthan",
    name2: "Cultural Show",
  },
];
const Event = () => {
  let settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  const [active, setActive] = useState(false); // state for handling grid-flexbox view
  const [activeIndex, setActiveIndex] = useState(-1); // state for getting the index of the active event when clicked
  let gridEvent = 0;
  let n = events.length;
  return (
    <>
      <div className="top-section">
        <div className="events"></div>
        <div className="dance-bg"></div>
      </div>
      <div className={active ? "main-section-large" : "main-section"}>
        <div className={active ? "carousel-inactive" : "carousel"}>
          <Slider {...settings}>
            {events.map((event, index) => (
              <div
                onClick={() => {
                  setActiveIndex(index + 1);
                  setActive(true);
                }}
                key={index}
              >
                <EventCard
                  expand={false}
                  name1={event.name1}
                  name2={event.name2}
                  bgImg={event.bgImg}
                  key={index}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className={active ? "grid" : "grid-inactive"}>
          {events.forEach((eventI, index) => {
            if (activeIndex === index + 1) {
              gridEvent = eventI;
            }
          })}
          <div className={` ${active === 2 ? "item-inactive" : "item"}`}>
            <EventCard
              expand={false}
              name1={
                events[activeIndex===1 || activeIndex<=0? n-1:activeIndex - 2]
                  .name1
              }
              name2={
                events[activeIndex===1 || activeIndex<=0? n-1:activeIndex - 2]
                  .name2
              }
              bgImg={
                events[activeIndex===1 || activeIndex<=0? n-1:activeIndex - 2]
                  .bgImg
              }
              key={activeIndex===1 || activeIndex<=0? n-1:activeIndex - 2}
            />
          </div>
          <div className="item">
            <EventCard
              expand={true}
              name1={gridEvent.name1}
              name2={gridEvent.name2}
              bgImg={gridEvent.bgImg}
              key={activeIndex - 1}
              changeActive={(active1) => setActive(active1)}
            />
          </div>

          <div className={` ${active === 2 ? "item-inactive" : "item"}`}>
            <EventCard
              expand={false}
              name1={events[activeIndex===n || activeIndex<=0? 0: activeIndex].name1}
              name2={events[activeIndex===n || activeIndex<=0? 0: activeIndex].name2}
              bgImg={events[activeIndex===n || activeIndex<=0? 0: activeIndex].bgImg}
              key={activeIndex===n || activeIndex<=0? 0: activeIndex}
            />
          </div>
          <div className={` ${active === 2 ? "item-inactive" : "item"}`}>
            <EventCard
              expand={false}
              name1={events[activeIndex>=n-1 || activeIndex<=0? 0: activeIndex+1].name1}
              name2={events[activeIndex>=n-1 || activeIndex<=0? 0: activeIndex+1].name2}
              bgImg={events[activeIndex>=n-1 || activeIndex<=0? 0: activeIndex+1].bgImg}
              key={activeIndex===n-1 || activeIndex<=0? 0: activeIndex+1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;