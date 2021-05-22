import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { Ri24HoursFill } from 'react-icons/ri';


interface AbcState {
    error: any,
    isLoaded: boolean,
    data: any[],
    filter: boolean,
    url: string,
    apiKey: string,
    signature: string,
    timestamp: string,
    name: string,
}
class UploadManga extends React.Component<{}, AbcState> {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: new Array(),
            filter: true,
            url: "",
            apiKey: "",
            signature: "",
            timestamp: "",
            name: ""
        };
    }
    componentDidMount() {
        var getUrl = window.location.href;
        var spitUrl = getUrl.split("/");
        var getId = spitUrl[spitUrl.length - 1];
        console.log(getId);
    }
    ComponentDiv() {
        // const historyDiv = information.map((item) => {
        return (
            <>
                <div className="bg-white pt-10">
                    <div className="flex -mx-4">
                        <div className="container mx-auto px-8">
                            <div className="flex px-10">
                                <div className="w-1/4 pt-36">
                                    <div className="mb-4">
                                        <div className="w-full h-full relative">
                                            <p className="text-xl pb-3">Chọn avatar: </p>
                                            <input id="inputavatar" type="file" className="absolute"></input>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-3xl font-medium text-grey-darkest">
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/4 ml-6 mt-2">
                                    <div className="flex items-center font-thin text-grey-dark text-sm border-b">
                                        <div className="p-4 border-b-2 font-normal text-xl text-grey-darkest border-orange -mb-2px">
                                            Thêm thông tin chi tiết
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
                                                        Tên truyện
                                                    </div>
                                                </div>
                                                <div className="flex text-sm mt-3">
                                                    <div className="mr-4 w-full pl-2 font-thin text-base break-normal">
                                                        <input id="nameManga"
                                                            type="text"
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
                                            <div className="w-full border px-4 py-4 mb-4 -mr-2 rounded text-sm">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <MdDescription className="w-5 h-5"></MdDescription>
                                                    </div>
                                                    <div>
                                                        Mô tả
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="mr-4 w-auto h-auto font-thin text-base pl-2">
                                                        <input className="break-words" type="text" id="describeManga"></input>
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
                                                    <div>
                                                        <input id="inputchap" type="file" name="files" multiple></input>
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
    submitChapter() {

        var token = localStorage.getItem("token");
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        var inputName = (document.getElementById("nameManga") as HTMLInputElement).value;
        var inputDescribe = (document.getElementById("describeManga") as HTMLInputElement).value;
        var avatar = (document.getElementById("inputavatar") as HTMLInputElement).files;
        var files = (document.getElementById("inputchap") as HTMLInputElement).files;
        if (inputName == "" || inputDescribe == "" || avatar!!.length == 0 || files!!.length == 0) {
            alert("Vui lòng điền đầy đủ thông tin");
        }
        else {
            console.log(files);
            if (files!!.length > 0) {
                axios.get(`http://localhost:3000/upload/signature`, axiosConfig)
                    .then(
                        (result) => {
                            var getUrl = window.location.href;
                            var spitUrl = getUrl.split("/");
                            var getId = spitUrl[spitUrl.length - 1];
                            console.log(result);
                            var images: string[] = [];
                            var id: string[] = [];


                            //post avatar to server
                            const formAvatar = new FormData();
                            console.log(avatar!![0]);
                            formAvatar.append("file", avatar!![0]);
                            formAvatar.append("api_key", result.data.apiKey);
                            formAvatar.append("timestamp", result.data.timestamp);
                            formAvatar.append("signature", result.data.signature);

                            for (let i = 0; i < files!!.length; i++) {
                                const formData = new FormData();
                                let file = files!![i];
                                console.log(file);
                                formData.append("file", file);
                                formData.append("api_key", result.data.apiKey);
                                formData.append("timestamp", result.data.timestamp);
                                formData.append("signature", result.data.signature);

                                axios.post(result.data.uploadUrl, formData)
                                    .then(
                                        (result1) => {
                                            var secure_url = result1.data.secure_url;
                                            if (secure_url != "") {
                                                images.push(secure_url);
                                                if (i == files!!.length - 1) {
                                                    axios.post(result.data.uploadUrl, formAvatar)
                                                        .then(
                                                            (result1) => {
                                                                console.log(result1); //data avatar
                                                                console.log(images);
                                                                var axiosData = {
                                                                    "chapterDto": {
                                                                        id: result1.data.public_id + "-1",
                                                                        manga: result1.data.public_id,
                                                                        index: Number(1),
                                                                        images: images,
                                                                    }
                                                                }
                                                                var axiosDataManga = {
                                                                    mangaDto: {
                                                                        id: result1.data.public_id,
                                                                        names: [inputName],
                                                                        cover: result1.data.secure_url,
                                                                        description: inputDescribe,
                                                                        chapterDto: axiosData.chapterDto,
                                                                    }
                                                                }
                                                                axios.post(`http://localhost:3000/upload/manga`, axiosDataManga, axiosConfig)
                                                                    .then(
                                                                        (result) => {
                                                                            console.log(result);
                                                                            alert("Thêm truyện mới thành công");
                                                                            window.location.href = `/upload/` + result1.data.public_id;
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
                                            }
                                        },
                                        // error handler
                                        (error) => {
                                            console.log(error);
                                        }
                                    )
                            }
                        },
                        // error handler
                        (error) => {
                            console.log(error);
                        }
                    )

            }
            else {
                alert("Chưa có dữ liệu mới nào");
            }
        }
    }
    render() {
        const { error, isLoaded, data, filter } = this.state;
        console.log(data);
        return (
            <div className="px-20 border rounded-lg mx-20 pt-5 mt-10 bg-white">
                <h1 className="pt-10 pb-2 text-3xl text-center">
                    THÊM TRUYỆN MỚI
                </h1>
                <hr></hr>
                {this.ComponentDiv()}
                <div className="text-center pt-5 pb-10"><a className="border-solid border-2 border-black py-2 px-4 rounded-md text-lg hover:bg-red-400" onClick={() => this.submitChapter()}>UPLOAD</a></div>
            </div>
        );
    }
}
export default UploadManga