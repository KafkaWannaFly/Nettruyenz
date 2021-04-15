import {Tag} from "./Tag";

export const TagList = (props) => {
    console.log(props);
    return (
        <div id="tag-list">
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
        </div>
    )
}