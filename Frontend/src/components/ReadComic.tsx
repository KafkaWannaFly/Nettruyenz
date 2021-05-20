import axios from "axios";
import React from "react";

import { Link, Redirect, useHistory } from "react-router-dom";
import img1 from "../logos/chutich.jpg";
interface AbcState {
    error: any,
    isLoaded: boolean,
    data: any[],
    selectedOption: any,
    chapters: any[],
    name: string,
    id: string,
    label: string
}
export default class readComic extends React.Component<{}, AbcState>{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: new Array(),
            selectedOption: null,
            chapters: new Array(),
            name: "",
            id: "",
            label: ""
        };
    }
    componentDidMount() {
        var getUrl = window.location.href;
        var splitUrl = getUrl.split("/");
        var idChapter = splitUrl[splitUrl.length - 1];
        axios.get("http://localhost:3000/chapters/" + idChapter)
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        data: result.data.images
                    });
                    fetch(`http://localhost:3000/mangas/${result.data.manga}`)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                console.log(result);
                                this.setState({
                                    isLoaded: true,
                                    chapters: result.briefChapterDtos,
                                    name: result.names[0],
                                    id: result.id
                                })
                            },
                            // error handler
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error
                                });
                            }
                        )
                },
                // error handler
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    elementDropdown(options) {

        // onClick={() => {window.location.href = "/Boku%20No%20Hero%20Academia/10/" + item.value}
        const element = options.map((item) => {
            return <Link to={"/" + this.state.name + "/" + this.state.id + "/" + item.value + "/reload"}><li className="bg-gray-200 w-full hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">{item.label}</li></Link>
        })
        return element;
    }
    headerRead() {
        const { selectedOption, chapters } = this.state;
        const options = new Array();
        for (let i = 0; i < chapters.length; i++) {
            var opt = {
                value: chapters[i].id + "",
                label: "Chapter " + chapters[i].index + ""
            };
            options.push(opt);
        }
        console.log(chapters);
        console.log(options);
        var getUrl = window.location.href;
        var splitUrl = getUrl.split("/");
        var idChapter = splitUrl[splitUrl.length - 1];
        var chapterReading = ""
        var valueNext = ""
        var valuePrevious = ""
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === idChapter) {
                chapterReading = options[i].label
                if(i < options.length - 1)
                    valueNext = options[i + 1].value
                if(i == options.length - 1)
                    valueNext = options[options.length - 1].value
                if(i > 0)
                    valuePrevious = options[i - 1].value
                if(i == 0)
                    valuePrevious = options[0].value
                break;
            }
        }
        console.log(chapterReading)
        // const defaultOption = chapters.find(x => x.id === idChapter);
        return (
            <>
                <div className="flex justify-between">
                    <div className="p-2 text-yellow-300 text-2xl">
                        <Link to={"/comic/" + this.state.id}>
                            <button className="bg-red-700 h-14 px-5 rounded-full italic underline">
                                Bạn đang đọc truyện {this.state.name}
                            </button>
                        </Link>
                    </div>
                    <div className="p-1 block my-auto">
                        <div className="dropdown inline-block relative">
                            <button className="bg-gray-300 h-12 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span className="mr-1">{chapterReading}</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                                {/* <li className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"><a className="" href="#">One</a></li>
                            <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                            <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li> */}
                                {this.elementDropdown(options)}
                            </ul>
                        </div>
                    </div>
                        <div className="w-auto my-auto">
                            <div className="sm:grid grid-cols-4 gap-5 mx-auto px-16">
                                <div className="col-start-1 col-end-3 my-2">
                                    <Link to={"/" + this.state.name + "/" + this.state.id + "/" + valuePrevious + "/reload"}>
                                        <div className="h-12 p-2 pl-5 dark:bg-gray-800 bg-white hover:shadow-xl rounded border-b-4 border-red-500 shadow-md">
                                            <h3 className="text-2xl mb-3 font-semibold inline-flex">
                                                <svg className="mr-2" width="24" height="30" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
                                                        fill="currentColor" /></svg>
                                                Prev
                                            </h3>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-end-5 col-span-2 my-2">
                                    <Link to={"/" + this.state.name + "/" + this.state.id + "/" + valueNext + "/reload"}>                                        <div
                                            className="h-12 p-2 pl-5 dark:bg-gray-800 bg-white hover:shadow-xl rounded border-b-4 border-red-500 shadow-md text-right">
                                            <h3 className="text-2xl mb-3 font-semibold inline-flex ">
                                                Next
                                                <svg className="ml-2" width="24" height="30" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                                                        fill="currentColor" /></svg>
                                            </h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </>
        )
    }
    viewRead(data) {
        const imageView = data.map((item) => {
            return (
                <div className="block mx-auto w-1/2 pt-2">
                    <img src={item} className="border-solid border-4"></img>
                </div>
            )
        });
        return imageView;
    }
    render() {
        const { error, isLoaded, data } = this.state;
        return (
            <>
                <div className="border-solid border-2 mt-2 mx-3">
                {this.headerRead()}
                <hr></hr>
                {this.viewRead(data)}
                <hr></hr>
                {this.headerRead()}
                </div>
            </>
        )
    }
}