import React, { Component } from "react";
import bathroomImg1 from "../img/bathroom1.jpg";
import bathroomImg2 from "../img/bathroom2.jpg";
import bedroomImg1 from "../img/bedroom1.jpg";
import bedroomImg2 from "../img/bedroom2.jpg";
import "../styles/Home.css";
import { Carousel, CarouselItem } from "reactstrap";

export class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [
                {
                    src: bathroomImg1,
                    id: 0,
                },
                {
                    src: bedroomImg1,
                    id: 1,
                },
                {
                    src: bathroomImg2,
                    id: 2,
                },
                {
                    src: bedroomImg2,
                    id: 3,
                },
            ],
            activeIndex: 0,
            animating: false,
        };

        this.next = this.next.bind(this);
    }

    next() {
        if (this.state.animating) return;
        else {
            const nextIndex =
                this.state.activeIndex === this.state.images.length - 1
                    ? 0
                    : this.state.activeIndex + 1;
            this.setState({ activeIndex: nextIndex });
        }
    }

    componentDidMount() {
        setTimeout(this.next, 3400);
    }

    render() {
        const slides = this.state.images.map((img) => (
            <CarouselItem
                disabled
                onExiting={() => this.setState({ animating: true })}
                onExited={() => this.setState({ animating: false })}
                key={img.id}
            >
                <img
                    src={img.src}
                    alt="Landscape product display, bedroom / bathroom"
                    className="hero-img"
                />
            </CarouselItem>
        ));

        return (
            <div style={{ marginTop: "-5vh" }} className="fade-in">
                <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    interval={3400}
                >
                    {slides}
                </Carousel>
            </div>
        );
    }
}

export default Hero;
