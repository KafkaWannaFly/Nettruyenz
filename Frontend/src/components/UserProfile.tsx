import React from 'react';
import { Link } from 'react-router-dom';
import { BiUserPin } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { GiRank3 } from 'react-icons/gi';
import { GoCalendar } from 'react-icons/go';
import { GrGroup } from 'react-icons/gr';
import { useState } from 'react';
function editInfor(props: any){
    if(props.flagEdit == false){
        props.setState({valueButton: "Chỉnh sửa thông tin"})
        props.setState({readOnly: true});
        props.setState({flagEdit: true})
    }
    else{
        props.setState({readOnly: false});
        props.setState({valueButton: "Lưu thông tin"})
        props.setState({flagEdit: false})
    }
}

function ComponentDiv(props: any) {
    // const historyDiv = information.map((item) => {
    console.log(props);
    return (
        <>
            <div className="bg-white pt-10 pb-24">
                <div className="flex -mx-4">
                    <div className="container mx-auto px-8">
                        <div className="flex px-10">
                            <div className="w-1/4">
                                <div className="mb-4">
                                    <img
                                        className="rounded-lg"
                                        src="https://avatars2.githubusercontent.com/u/1791228?s=460&v=4"></img>
                                </div>
                                <div className="mb-4">
                                    <div className="text-3xl font-medium text-grey-darkest">
                                        Nickname
                                    </div>
                                    <div className="text-xl text-grey-dark font-light">
                                        Nickname
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/4 ml-6 mt-2">
                                <div className="flex items-center font-thin text-grey-dark text-sm border-b">
                                    <div className="p-4 border-b-2 font-normal text-grey-darkest border-orange -mb-2px">
                                        Thông tin
                                    </div>
                                    <div className="p-4 flex items-center">
                                        <div>
                                            Truyện đã đăng
                                        </div>
                                        <div className="rounded-lg bg-grey-light text-xs ml-1 p-px">
                                            41
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center">
                                        <div>
                                            Stars
                                        </div>
                                        <div className="rounded-lg bg-grey-light text-xs ml-1 p-px">
                                            6
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center">
                                        <div>
                                            Followers
                                        </div>
                                        <div className="rounded-lg bg-grey-light text-xs ml-1 p-px">
                                            15
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center">
                                        <div>
                                            Following
                                        </div>
                                        <div className="rounded-lg bg-grey-light text-xs ml-1 p-px">
                                            23
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-1 pt-6 pb-2">
                                        <ImProfile className="w-5 h-5"></ImProfile>
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
                                                <BiUserPin className="w-5 h-5"></BiUserPin>
                                            </div>
                                            <div>
                                                Nickname
                                            </div>
                                        </div>
                                        <div className="flex text-sm mt-3">
                                            <div className="mr-4 pl-2 font-thin text-base">
                                                <input  id="nickName"
                                                        readOnly
                                                        type="text" value={props.nickname}
                                                        onChange={props.nickname}
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
                                                Email
                                            </div>
                                        </div>
                                        <div className="flex text-sm mt-3">
                                            <div className="mr-4 font-thin pl-2 text-base">
                                                <input type="email" value={props.email} id="information" readOnly></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/2 border px-4 py-4 mb-4 -mr-2 rounded text-sm">
                                        <div className="flex">
                                            <div className="mr-1">
                                                <GiRank3 className="w-5 h-5"></GiRank3>
                                            </div>
                                            <div>
                                                Cấp độ
                                            </div>
                                        </div>
                                        <div className="flex text-sm mt-3">
                                            <div className="mr-4 font-thin pl-2 text-base">
                                                <input type="text" value={props.level} id="information" readOnly></input>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-1/2 border px-4 py-4 mb-4 ml-4 rounded text-sm">
                                        <div className="flex">
                                            <div className="mr-1">
                                                <GoCalendar className="w-5 h-5"></GoCalendar>
                                            </div>
                                            <div>
                                                Ngày tạo tài khoản
                                            </div>
                                        </div>
                                        <div className="flex text-sm mt-3">
                                            <div className="mr-4 font-thin text-base pl-2">
                                                <input type="text" id="date" value={props.updatedAt}></input>
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
                                                Nhóm
                                            </div>
                                        </div>
                                        <div className="flex text-sm mt-3">
                                            <div className="mr-4 font-thin text-b">
                                                <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">j2team</span>
                                                <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">hcmus</span>
                                                <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">j2team</span>
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
function UserProfile(props: any){
    console.log(props.data.user);
    return (
        <div className="px-20 border rounded-lg mx-20 pt-5 mt-10 bg-white">
            <h1 className="pt-10 pb-2 text-3xl text-center">
                HỒ SƠ CÁ NHÂN
            </h1>
            <hr></hr>
            {ComponentDiv(props.data.user)}
        </div>
    );
}
export default UserProfile