
import AdvancedSearchBar from "./AdvancedSearchBar";
import MangaPreviewList from "./MangaPreviewList";
import {TagSection} from "./TagSection"


export const Categories = (props) => {
	console.log(props) 
	return (
        <>
            <div className="h-full">
                <AdvancedSearchBar></AdvancedSearchBar>
                <TagSection/>
                <MangaPreviewList></MangaPreviewList>
            </div>
        </>
    );
};
