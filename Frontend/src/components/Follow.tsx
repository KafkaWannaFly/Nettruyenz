
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
interface AbcState {
    error: any,
    isLoaded: boolean,
    history: any[],
    token: any
}
class Follow extends React.Component<{}, AbcState> {

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
        axios.get('http://localhost:3000/bookmarks', axiosConfig)
            .then(
                (result) => {
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
        const historyDiv = history.map((item) => {
            return (
                <>
                    <div className="w-full md:w-6/12 lg:w-full lg:mb-0 mb-12 px-2 text-left  pb-4" key={item.briefMangaDto.id}>
                        <div className="max-w-sm px-1 rounded overflow-hidden shadow-lg bg-gray-1200">
                            <img className="w-full h-64" src={item.briefMangaDto.cover} alt="Sunset in the mountains"></img>
                            <div className=" px-2">
                                <div className="text-white">
                                    <Link to={"/comic/" + item.briefMangaDto.id}>
                                        <div className="font-bold text-xl pt-2 truncate">{item.briefMangaDto.names[0]}</div>
                                    </Link>
                                    <p className="text-gray-300 text-base truncate">
                                        Tác giả
                                    </p>
                                </div>
                                <div className="pb-2 text-white">
                                    <span className="inline-block text-sm font-semibold  mr-2 mb-2">Chap ...</span>
                                    <span className="inline-block text-sm font-semibold mr-2 mb-2 right">{new Date(item.briefMangaDto.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        });
        return historyDiv;
    }
    followDiv(history) {
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
                <section >
                    <div className="grid grid-cols-4">
                        {this.componentDiv(history)}
                        {this.componentDiv(history)}

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
                <div className="col px-52 pt-5">
                    {this.followDiv(history)}
                </div>
            );
        }
    }
}
export default Follow
