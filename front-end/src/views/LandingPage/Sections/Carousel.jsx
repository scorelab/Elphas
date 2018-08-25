import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// core components
import GridContainer from "../../../assets/components/Grid/GridContainer";
import GridItem from "../../../assets/components/Grid/GridItem.jsx";
import Card from "../../../assets/components/Card/Card.jsx";

import image1 from "../../../assets/img/caro1.jpg";
import image2 from "../../../assets/img/caro2.jpg";
import image3 from "../../../assets/img/caro3.jpg";
import image4 from "../../../assets/img/caro4.jpg";


class SectionCarousel extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <Carousel {...settings}>
                            <div>
                                <img
                                    src={image1}
                                    alt="First slide"
                                    className="slick-image"
                                />

                            </div>
                            <div>
                                <img
                                    src={image2}
                                    alt="Second slide"
                                    className="slick-image"
                                />
                            </div>
                            <div>
                                <img
                                    src={image3}
                                    alt="Third slide"
                                    className="slick-image"
                                />
                            </div>
                            <div>
                                <img
                                    src={image4}
                                    alt="Third slide"
                                    className="slick-image"
                                />
                            </div>
                        </Carousel>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default SectionCarousel;