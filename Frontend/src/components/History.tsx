import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
interface AbcState {
    error: any,
    isLoaded: boolean,
    history: any[],
    token: any,
}
class History extends React.Component<{}, AbcState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            history: new Array(),
            token: props.data.token
        };
    }
    componentDidMount() {
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
            }
        };
        console.log(axiosConfig);
        axios.get('http://localhost:3000/history', axiosConfig)
            .then((result) => {
                console.log(result);
                    this.setState({
                        isLoaded: true,
                        history: result.data
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
    componentDiv(history) {
        console.log(history);
		let i = history.lentgth;
		const chapDiv = history.map((item) => {
			console.log(item);
			return (
				<tr className="border-none hover:bg-gray-600">
					<Link to={"/comic/" + item.briefChapterDto.id}>
						<td>{item.briefChapterDto.mangaNames[0]}</td>
					</Link>
					<td>{item.briefChapterDto.mangaNames[2]}</td>
					<td>{item.briefChapterDto.manga}</td>
					<td>{item.briefChapterDto.index}</td>
                    <td>{item.briefChapterDto.createdAt}</td>
					<td>{item.briefChapterDto.tittle}</td>
				</tr>
			);
		})
		return chapDiv;
    }
    historyDiv(history) {
        return (
            <>
                {/* <section className="pt-16 pb-0 px-0 mx-0">
                    <div className="mx-0">
                        <div className="flex flex-wrap mb-8 w-full px-20 justify-center">
                            <div className="text-center mr-auto">
                                <div className="flex flex-wrap justify-center px-20">
                                    {this.componentDiv(history)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="bg-black text-white mx-40 mt-6 px-4 border-2 border-gray-500 rounded-lg shadow-2xl">
                    <div className="">
                        <div>
                            <h1 className="font-bold text-xl p-4 border-b-2">Lịch sử</h1>

                        </div>
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/4">Tên truyện</th>
                                    <th className="w-1/4">Tên khác</th>
                                    <th className="w-1/12">Manga</th>
                                    <th className="w-1/12">Index</th>
                                    <th className="w-1/4">Ngày xem</th>
                                    <th className="w-1/12">Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.componentDiv(history)}
                            </tbody>
                        </table>
                    </div>
                </section>
            </>)
    }
    render() {
        const { error, isLoaded, history } = this.state;
        console.log(history);
        if (error) {
            return (
                <div className="col">
                    Error: {error.message}
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="col">
                    Loading...
                </div>
            );
        } else {

            return (
                <div className="col">
                    {this.historyDiv(history)}
                </div>
            );
        }
    }
}
export default History
