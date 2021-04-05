import React from 'react';

const MangaPreview: React.FC = () => {
    return (
        <figure className="manga-preview-container">
            <figcaption className="manga-preview-info">
                <div className="manga-preview-image"></div>
                <div className="manga-preview-title">Titleeeeeeeeeeeeeeeeeeeeeeeee</div>
                <div className="flex-container">
                    <div className="manga-preview-latest-chapter">Chapter</div>
                    <div className="manga-preview-latest-update">Latest update</div>
                </div>
            </figcaption>
        </figure>
    );
}

export default MangaPreview