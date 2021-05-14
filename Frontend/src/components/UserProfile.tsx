import React from 'react';
import { Link } from 'react-router-dom';
import { BiUserPin } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { GiRank3 } from 'react-icons/gi';
import { GoCalendar } from 'react-icons/go';
import { GrGroup } from 'react-icons/gr';
interface AbcState {
    error: any,
    isLoaded: boolean,
    information: any[],
    nickName: string,
    readOnly: boolean,
    valueButton:string,
    flagEdit: boolean
}
class UserProfile extends React.Component<{}, AbcState> {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            information: new Array(),
            nickName: "HolyRead",
            readOnly: true,
            valueButton: "Chỉnh sửa thông tin",
            flagEdit: true
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/most-view?period=weekly')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        information: result
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
    editInfor(){
        if(this.state.flagEdit == false){
            this.setState({valueButton: "Chỉnh sửa thông tin"})
            this.setState({readOnly: true});
            this.setState({flagEdit: true})
        }
        else{
            this.setState({readOnly: false});
            this.setState({valueButton: "Lưu thông tin"})
            this.setState({flagEdit: false})
        }
    }
    componentDiv(information) {
        // const historyDiv = information.map((item) => {
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
                                            {this.state.nickName}
                                        </div>
                                        <div className="text-xl text-grey-dark font-light">
                                            {this.state.nickName}
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
                                        <div className="w-1/2 justify-end text-right text-grey-dark text-sm font-light pt-6 pb-2">
                                            <button
                                            id="btnEdit"
                                            onClick={() => this.editInfor()} 
                                            className="bg-transparent hover:bg-black focus:bg-black text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                                {this.state.valueButton}
                                            </button>
                                        </div>
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
                                                    <input  readOnly={this.state.readOnly}
                                                            id="nickName"
                                                            type="text" value={this.state.nickName}
                                                            onChange={(e)=>this.setState({nickName:e.target.value})}
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
                                                    <input type="email" value="daoleviethoang@gmail.com" id="information" readOnly></input>
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
                                                    <input type="text" value="10" id="information" readOnly></input>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-1/2 border px-4 py-4 mb-4 ml-4 rounded text-sm">
                                            <div className="flex">
                                                <div className="mr-1">
                                                    <GoCalendar className="w-5 h-5"></GoCalendar>
                                                </div>
                                                <div>
                                                    Ngày sinh
                                                </div>
                                            </div>
                                            <div className="flex text-sm mt-3">
                                                <div className="mr-4 font-thin text-base pl-2">
                                                    <input type="date" id="date" value="2000-12-31" readOnly={this.state.readOnly}></input>
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
    render() {
        const { error, isLoaded, information } = this.state;
        // console.log(information);
        // if (error) {
        //     return (
        //         <div classNameName="col">
        //             Error: {error.message}
        //         </div>
        //     );
        // } else if (!isLoaded) {
        //     return (
        //         <div classNameName="col">
        //             Loading...
        //         </div>
        //     );
        // } else {

        return (
            <div className="px-20 border rounded-lg mx-20 pt-5 mt-10 bg-white">
                <h1 className="pt-10 pb-2 text-3xl text-center">
                    HỒ SƠ CÁ NHÂN
                </h1>
                <hr></hr>
                {this.componentDiv(information)}
            </div>
        );
        // }
    }
}
export default UserProfile
