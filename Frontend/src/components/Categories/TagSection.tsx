import { AddTagButton } from "./AddTagButton"
import {TagList} from "./TagList"
export const TagSection = (props) => {
    return (
        <div id="tag-section">
            <TagList />
            <AddTagButton/>
        </div>
    )
}