import React from 'react';
import { Link } from 'react-router-dom';
interface AbcState {
    error: any,
    isLoaded: boolean,
    history: any[]
}
class History extends React.Component<{}, AbcState> {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            history: new Array()
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/most-view?period=weekly')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        history: result
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
					<Link to={"/comic/" + item.id}>
						<td>{item.names[0]}</td>
					</Link>
					<td>{item.creators}</td>
					<td>Chapter 123</td>
					<td>Update sau</td>
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
                                    <th className="w-1/4">Người đăng</th>
                                    <th className="w-1/4">Lượt xem</th>
                                    <th className="w-1/4">Trường gì đó</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.componentDiv(history)}
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
