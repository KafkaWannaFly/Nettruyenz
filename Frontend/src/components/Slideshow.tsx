import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../logos/img1.jpg";
import img2 from "../logos/img2.jpg";
import img3 from "../logos/img3.jpg";
import img4 from "../logos/img4.jpg";
import img5 from "../logos/img5.jpg";
export const Slideshow = (props) => {
	console.log(props);
    
    const responsive = {
        desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
        }
    };
	return (
		<div className="w-full h-full">
			<Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .1"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div>
            <img src={img1} ></img>
            </div>
            <div>
            <img src={img2} ></img>
            </div>
            <div>
            <img src={img3} ></img>
            </div>
            <div><img src={img4} ></img></div>
            <div><img src={img5} ></img></div>
        </Carousel>;
		</div>
	);
};

  