import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import {IoIosArrowDropdown} from 'react-icons/io'
import {BiUpload} from 'react-icons/bi'
interface AbcState {
    error: any,
    isLoaded: boolean,
    mangas: any[],
}
class manageManga extends React.Component<{}, AbcState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            mangas: new Array(),
        };
    }
    componentDidMount() {
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${"aav"}`,
            }
        };
        console.log(axiosConfig);
        axios.get('http://localhost:3000/mangas/get-all', axiosConfig)
            .then((result) => {
                console.log(result);
                    this.setState({
                        isLoaded: true,
                        mangas: result.data
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
    elementDropdownChapter(chapters){
        const chapli = chapters.map((item) => {
            return (
                <li className="rounded-b hover:bg-gray-1000 py-2 px-4 block whitespace-no-wrap">{"Chapter " + item.index}</li>
			);
		})
        return chapli;
    }
    dropdownChapter(chapters){
        return(
            <div className="dropdown-nav inline-block">
                <a className="flex border-solid border-2 border-white py-1 px-2 rounded-2xl">
                    <div className="pr-1">Danh sách chapter</div>
                    <IoIosArrowDropdown size="25px"/>
                </a>
                <ul className="dropdown-menu-nav rounded-lg border-gray-1100 border-2 bg-black-100 hidden absolute text-white text-sm-custom">
                    {this.elementDropdownChapter(chapters)}
                </ul>
            </div>
        )
    }
    componentDiv(mangas) {
		let i = mangas.lentgth;
		const chapDiv = mangas.map((item) => {
			console.log(item);
			return (
				<tr className="border-none hover:bg-gray-600">
					<td className="hover:text-red-500"><Link to={"/comic/" + item.id}>{item.names[0]}</Link></td>
					<td className="hover:text-red-500">{this.dropdownChapter(item.briefChapterDtos)}</td>
					<td><Link to={"/upload/" + item.id} className="hover:text-red-500"><BiUpload className="mx-auto" size="25px"></BiUpload></Link></td>
				</tr>
			);
		})
		return chapDiv;
    }
    historyDiv(mangas) {
        return (
            <>
                <section className="bg-black text-white mx-40 mt-6 px-4 border-2 border-gray-500 rounded-lg shadow-2xl">
                    <div className="">
                        <div className="flex border-b-2 justify-between">
                            <h1 className="font-bold text-2xl p-4">Danh sách truyện</h1>
                            <h1 className="font-bold text-lg my-auto border-2 border-white p-2 rounded-lg hover:bg-red-600"><Link to="/manga/upload" className="align-middle">Thêm truyện mới</Link></h1>
                        </div>
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/2 text-lg">Tên truyện</th>
                                    <th className="w-1/3 text-lg">Các Chapter</th>
                                    <th className="w-1/4  text-center text-lg">Thêm chapter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.componentDiv(mangas)}
                            </tbody>
                        </table>
                    </div>
                </section>
            </>)
    }
    render() {
        const { error, isLoaded, mangas } = this.state;
        console.log(mangas);
            return (
                <div className="col">
                    {this.historyDiv(mangas)}
                </div>
            );
        // }
    }
}
export default manageManga
