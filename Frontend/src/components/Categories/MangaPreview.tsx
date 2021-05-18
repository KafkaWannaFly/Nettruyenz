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

    //     <>
    //     <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2" key={item.id}>
    //       <div className="max-w-sm px-1 rounded overflow-hidden shadow-lg bg-gray-1200">
    //         <img className="w-full h-64" src={item.cover} alt="Sunset in the mountains"></img>
    //         <div className="">
    //             <div>
    //                 <Link to={"/comic/" + item.id}>
    //                     <div className="font-bold text-xl pt-2 truncate">{item.names[0]}</div>
    //                 </Link>
    //                 <p className="text-gray-300 text-base truncate">
    //                     {item.creators}
    //                 </p>
    //             </div>
    //             <div className="pb-2 text-white">
    //                 <span className="inline-block px-2 text-sm font-semibold  mr-2 mb-2">Chap ...</span>
    //                 <span className="inline-block px-2 text-sm font-semibold mr-2 mb-2 right">{new Date(item.updatedAt).toLocaleDateString()}</span>
    //             </div>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    );
}

export default MangaPreview