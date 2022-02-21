import React from 'react';
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const PageSection = ({className, title, subtitle, image, isImage, isArticle, date, author, children}) => {
    const header = [
        image ? <GatsbyImage alt={isImage ? title : ''} image={getImage(image)}/> : null,
        title ? <h1>{title}</h1> : null,
        subtitle ? <h2>{subtitle}</h2> : null,
    ];
    return isArticle
        ? <article className={className}>
            <header>
                {header}
                <span className='info'>
                    <span className='before'></span>
                    <span className='date'>{date}</span>
                    <span className='between'></span>
                    <span className='author'>{author}</span>
                    <span className='after'></span>
                </span>
            </header>
            {children}
        </article>
        : <section className={className}>
            {header}
            {children}
        </section>;
};

export default PageSection;