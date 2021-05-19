import MangaPreview from "./MangaPreview";

function MangaPreviewList(props) {
    function renderMangas() {
        const render = props.mangaList.map((eachManga, index) => {
            return <MangaPreview key={index} manga={eachManga} />
        });
        return render;
    }
    return (
        <div className="manga-list">
            {renderMangas()}
        </div>
    )
}

export default MangaPreviewList;