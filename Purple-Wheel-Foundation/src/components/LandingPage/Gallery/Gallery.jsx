import Image1 from "../../../assets/grid1.jpg"
import Image2 from "../../../assets/grid2.jpg"
import Image3 from "../../../assets/grid3.jpg"
import Image4 from "../../../assets/grid4.jpg"
import Image5 from "../../../assets/grid5.jpg"
import Image6 from "../../../assets/grid6.jpg"
import Image7 from "../../../assets/grid7.jpg"
import Image8 from "../../../assets/grid8.jpg"

import "./Gallery.css"

const Gallery = () => {
    return (
        <section className="gallery-section">
            <div className="gallery-header">
                <h1>Our Gallery</h1>
                <p>
                    A visual journey through compassion, creativity, and culture.
                </p>
            </div>

            <div className="gallery-grid">
                <div className="gallery-item gallery-item-1">
                    <img src={Image1} alt="" />
                </div>

                <div className="gallery-item gallery-item-2">
                    <img src={Image2} alt="" />
                </div>

                <div className="gallery-item gallery-item-3">
                    <img src={Image3} alt="" />
                </div>

                <div className="gallery-item gallery-item-4">
                    <img src={Image4} alt="" />
                </div>

                <div className="gallery-item gallery-item-5">
                    <img src={Image5} alt="" />
                </div>

                <div className="gallery-item gallery-item-6">
                    <img src={Image6} alt="" />
                </div>

                <div className="gallery-item gallery-item-7">
                </div>

                <div className="gallery-item gallery-item-8">
                    <img src={Image7} alt="" />
                </div>

                <div className="gallery-item gallery-item-9">
                    <img src={Image8} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Gallery