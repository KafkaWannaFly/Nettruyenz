import React from 'react';
import { Link } from 'react-router-dom';
import { BiUserPin, BiDetail, BiCalendar } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { GiRank3, GiBlackBook, GiWhiteBook } from 'react-icons/gi';
import { GoCalendar } from 'react-icons/go';
import { GrGroup } from 'react-icons/gr';
import { MdDescription, MdAddCircleOutline } from 'react-icons/md';
import { useState } from 'react';
import avatar from "../logos/img_avatar.png";
import axios from 'axios';


interface AbcState {
    error: any,
    isLoaded: boolean,
    data: any[],
    filter: boolean,
    url: string,
    apiKey: string,
    signature: string,
    timestamp: string,
}
class UploadChapter extends React.Component<{}, AbcState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: new Array(),
            filter: true,
            url: "",
            apiKey:"",
            signature: "",
            timestamp: "",
        };
    }
    componentDidMount() {
        var getUrl = window.location.href;
        var spitUrl = getUrl.split("/");
        var getId = spitUrl[spitUrl.length - 1];
        console.log(getId);
        axios.get(`http://localhost:3000/mangas/${getId}`)
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        data: result.data
                    });
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
    tagChapter(props) {
        if(props){
            const tagchap = props.map((item) => {
                return (
                    <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">{"Chapter " + item.index}</span>
                );
            })
            console.log(props);
            return tagchap;
        }
        else{
            return <div>a</div>;
        }
    }
    uploadImage(){

    }
    ComponentDiv(props) {
        // const historyDiv = information.map((item) => {
        console.log(props);
        return (
            <>
                <div className="bg-white pt-10">
                    <div className="flex -mx-4">
                        <div className="container mx-auto px-8">
                            <div className="flex px-10">
                                <div className="w-1/4">
                                    <div className="mb-4">
                                        <img
                                            className="rounded-lg h-full w-full"
                                            src={props.cover}></img>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-3xl font-medium text-grey-darkest">
                                            {props.names}
                                        </div>
                                        <div className="pt-2 text-lg text-grey-dark font-light">
                                            {props.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/4 ml-6 mt-2">
                                    <div className="flex items-center font-thin text-grey-dark text-sm border-b">
                                        <div className="p-4 border-b-2 font-normal text-xl text-grey-darkest border-orange -mb-2px">
                                            Chi tiết truyện
                                        </div>

                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-1 pt-6 pb-2">
                                            <BiDetail size="15px"></BiDetail>
                                        </div>
                                        <div className="w-1/2 pt-6 pb-2 font-normal text-grey-darkest">
                                            Thông tin chung
                                        </div>
                                        {/* <div className="w-1/2 justify-end text-right text-grey-dark text-sm font-light pt-6 pb-2">
                                        <button
                                        id="btnEdit"
                                        onClick={editInfor} 
                                        className="bg-transparent hover:bg-black focus:bg-black text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                            
                                        </button>
                                    </div> */}
                                    </div>
                                    <form>
                                        <div className="flex">
                                            <div className="w-1/2 border px-4 py-4 mb-4 -mr-2 rounded text-sm">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <GiBlackBook className="w-5 h-5"></GiBlackBook>
                                                    </div>
                                                    <div>
                                                        Tên truyện hiển thị
                                                    </div>
                                                </div>
                                                <div className="flex text-sm mt-3">
                                                    <div className="mr-4 pl-2 font-thin text-base">
                                                        <input id="nickName"
                                                            readOnly
                                                            type="text" value={props.names}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 border pl-4 py-4 mb-4 ml-4 rounded text-sm">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <HiOutlineMail className="w-5 h-5"></HiOutlineMail>
                                                    </div>
                                                    <div>
                                                        Người tạo
                                                    </div>
                                                </div>
                                                <div className="flex text-sm mt-3">
                                                    <div className="mr-4 font-thin pl-2 text-base">
                                                        <input type="email" value={"Admin"} id="information" readOnly></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-1/2 border px-4 py-4 mb-4 -mr-2 rounded text-sm">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <BiCalendar className="w-5 h-5"></BiCalendar>
                                                    </div>
                                                    <div>
                                                        Ngày tạo
                                                    </div>
                                                </div>
                                                <div className="flex text-sm mt-3">
                                                    <div className="mr-4 font-thin pl-2 text-base">
                                                        <input type="text" value={props.createdAt} id="information" readOnly></input>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-1/2 border px-4 py-4 mb-4 ml-4 rounded text-sm">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <MdDescription className="w-5 h-5"></MdDescription>
                                                    </div>
                                                    <div>
                                                        Mô tả
                                                    </div>
                                                </div>
                                                <div className="flex text-sm mt-3">
                                                    <div className="mr-4 font-thin text-base pl-2">
                                                        <input type="text" id="date" value={""}></input>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="flex">
                                        <div className="w-full border px-4 py-4 mb-4 -mr-2 rounded text-sm">
                                            <div className="flex">
                                                <div className="mr-1">
                                                    <GrGroup className="w-5 h-5"></GrGroup>
                                                </div>
                                                <div>
                                                    Chapters
                                                </div>
                                            </div>
                                            <div className="flex text-sm mt-3">
                                                <div className="mr-4 font-thin text-b">
                                                    {this.tagChapter(props.briefChapterDtos)}
                                                    <div>
                                                        <input id="inputfile" type="file" name="files" multiple></input>
                                                    </div>
                                                    {/* <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">j2team</span>
                                                <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">hcmus</span>
                                                <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">OFFB</span> */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
        // });
        // return historyDiv;
    }
    submitChapter(data){
        var token = localStorage.getItem("token");
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        var files = (document.getElementById("inputfile") as HTMLInputElement).files;
        console.log(files);
        if(files!!.length > 0)
        {
            axios.get(`http://localhost:3000/upload/signature`, axiosConfig)
            .then(
                (result) => {
                    console.log(result);
                    // var body = {
                    //     file: files,
                    //     api_key: result.data.apiKey,
                    //     timestamp:result.data.timestamp,
                    //     signature: result.data.signature
                    // }
                    // console.log(body);
                    var images: string[] = [];
                    var id: string[] = [];
                    const formData = new FormData();
                    for(let i = 0; i < files!!.length; i++){
                        let file = files!![i];
                        formData.append("file", file);
                        formData.append("api_key", result.data.apiKey);
                        formData.append("timestamp", result.data.timestamp);
                        formData.append("signature", result.data.signature);
                        console.log(formData);
                        axios.post(result.data.uploadUrl, formData)
                        .then(
                            (result1) => {
                                var secure_url = result1.data.secure_url;
                                var id_ = result1.data.public_id;
                                if(secure_url != ""){
                                    images.push(secure_url);
                                    id.push(id_);
                                }
                            },
                            // error handler
                            (error) => {
                                console.log(error);
                            }
                        )
                    }
                    console.log(id);
                    var getUrl = window.location.href;
                    var spitUrl = getUrl.split("/");
                    var getId = spitUrl[spitUrl.length - 1];
                    let axiospostdata = {
                        ChapterDto: {
                            "id": data.briefChapterDtos.length + "",
                            "images": images,
                            "manga": getId,
                            "index": data.briefChapterDtos.length,
                            "tittle?": "",
                            "uploader?": "Admin",
                            "views?": 0,
                            "createdAt?": new Date("01/01/2020"),
                            "updatedAt?": new Date("01/01/2020"),
                        }
                    }
                    console.log(axiospostdata);
                    axios.post(`http://localhost:3000/upload/chapter`, axiospostdata, axiosConfig)
                    .then(
                        (result) => {
                            console.log(result)
                        },
                        // error handler
                        (error) => {
                            console.log(error);
                        }
                    )
                },
                // error handler
                (error) => {
                    console.log(error);
                }
            )

        }
        else{
            alert("Chưa có dữ liệu mới nào");  
        }  
        }
    render() {
        const { error, isLoaded, data, filter } = this.state;
        console.log(data);
        return (
            <div className="px-20 border rounded-lg mx-20 pt-5 mt-10 bg-white">
                <h1 className="pt-10 pb-2 text-3xl text-center">
                    THÊM CHAPTER MỚI
                </h1>
                <hr></hr>
                {this.ComponentDiv(data)}
                <div className="text-center pt-5 pb-10"><a className="border-solid border-2 border-black py-2 px-4 rounded-md text-lg hover:bg-red-400" onClick={() => this.submitChapter(data)}>UPLOAD</a></div>
            </div>
        );
    }
}
export default UploadChapter