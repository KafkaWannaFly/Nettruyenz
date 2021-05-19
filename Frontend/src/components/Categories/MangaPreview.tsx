import React from 'react';
import { Link } from 'react-router-dom';
function MangaPreview(props) {
    return (
        <Link to={"/comic/" + props.manga.id}>
            <figure className="manga-preview-container">
                <figcaption className="manga-preview-info">
                    <img className="manga-preview-image" src={props.manga.cover} alt="Sunset in the mountains"></img>
                    <div>
                        <div className="manga-preview-title">{props.manga.names[0]}</div>
                        <div className="flex-container">
                            <div className="manga-preview-latest-chapter">Chapter</div>
                            <div className="manga-preview-latest-update">{new Date(props.manga.updatedAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </Link>
}


export default MangaPreview