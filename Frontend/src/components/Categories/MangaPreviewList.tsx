import MangaPreview from "./MangaPreview";

const MangaPreviewList = (props) => {
    console.log(props);
    return (
        <div className="manga-list">
            <MangaPreview/>
            <MangaPreview/>
            <MangaPreview/>
            <MangaPreview/>
        </div>
    )
}

export default MangaPreviewList;