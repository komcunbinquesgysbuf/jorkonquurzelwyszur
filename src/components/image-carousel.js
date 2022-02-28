import React, {useEffect, useState} from "react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const ImageCarousel = ({images, delayInMilliseconds}) => {
    const count = images.length;
    const [handle, setHandle] = useState();
    const [index, setIndex] = useState(0);
    const nodes = images.map(image => image.childImageSharp
        ? <GatsbyImage alt='' image={getImage(image)} style={{width: '100%', height: '100%'}}/>
        : <img alt='' src={image.publicURL}/>
    );
    const [width, height] = images
        .filter(image => image.childImageSharp && image.childImageSharp.gatsbyImageData)
        .reduce(
            ([w, h], {
                childImageSharp: {
                    gatsbyImageData: {
                        width,
                        height
                    }
                }
            }) => [Math.max(w, width), Math.max(h, height)],
            [0, 0]
        )
    useEffect(
        () => {
            !handle
            && typeof window !== "undefined"
            && setHandle(setInterval(() => setIndex(i => (i + 1) % count), delayInMilliseconds));
            return () => typeof window !== "undefined" && handle && clearInterval(handle)
        },
        [count, handle]
    );
    return <div className='gallery'>
        {nodes[index] || null}
    </div>;
};
export default ImageCarousel;
