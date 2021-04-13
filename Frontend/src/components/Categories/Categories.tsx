
import {Tag} from "./Tag";
import MangaPreview from "./MangaPreview";
import AdvancedSearchBar from "./AdvancedSearchBar";


export const Categories = (props) => {
	console.log(props);
	return (
        <>
            <div className="h-full">
                <Tag />
                <MangaPreview></MangaPreview>
                <AdvancedSearchBar></AdvancedSearchBar>
            </div>
        </>
    );
};
