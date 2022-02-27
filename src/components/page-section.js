import React from 'react';
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import ImageCarousel from "./image-carousel";

const PageSection = ({className, title, subtitle, gallery, image, isImage, isArticle, date, author, children}) => {
    const header = [
        gallery && gallery.length > 0
            ? <ImageCarousel images={gallery} delayInMilliseconds={5000}/>
            : null,
        title ? <h1>{title}</h1> : null,
        subtitle ? <h2>{subtitle}</h2> : null,
        image
            ? (image.childImageSharp
                    ? <GatsbyImage alt={isImage ? title : ''} image={getImage(image)}/>
                    : <img alt={isImage ? title : ''} src={image.publicURL}/>
            )
            : null
    ];
    return isArticle
        ? <article className={className}>
            <header>
                {header}
                <span className='info'>
                    <span className='before'></span>
                    <span className='date'>{date || ''}</span>
                    <span className='between'></span>
                    <span className='author'>{author || ''}</span>
                    <span className='after'></span>
                </span>
            </header>
            {children}
        </article>
        : <section className={className}>
            <header>{header}</header>
            {children}
        </section>;
};

export default PageSection;