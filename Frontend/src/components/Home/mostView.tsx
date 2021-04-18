
import React, { useState } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Home } from './Home';
import img1 from "../../logos/img1.jpg";
import { useSelector } from 'react-redux';
import axios from 'axios';

interface AbcState {
  error: any,
  isLoaded: boolean,
  homes: any[],
  filter: boolean
}
class mostView extends React.Component<{}, AbcState> {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      homes: new Array(),
      filter: true
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/most-view?period=all')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            homes: result
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
  filterDateFun(filter){
    if(filter == true){
    return (<div className="flex w-81">
    <div className="lg:w-1/3  text-center">
      <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        Weekly
    </button>
    </div>
    <div className="lg:w-1/3 ">
      <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        Monthly
    </button>
    </div>
    <div className="lg:w-1/3  text-center">
      <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        All Time
    </button> 
    </div>
  </div>);
    }
    else{
      return (<></>)
    }
  }
  categoryDiv(homes){
    const categoryDiv = homes.map((item) => {
      return (
        <>
          <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2" key={item.id}>
            <div className="max-w-sm px-1 rounded overflow-hidden shadow-lg bg-gray-1200">
              <img className="w-full h-64" src={item.cover} alt="Sunset in the mountains"></img>
              <div className="">
              <div>
                <Link to={"/" + item._id}>
                  <div className="font-bold text-xl pt-2 truncate">{item.names[0]}</div>
                </Link>
                <p className="text-gray-300 text-base truncate">
                  {item.creators}
                </p>
              </div>
              <div className="pb-2 text-white">
                <span className="inline-block px-2 text-sm font-semibold  mr-2 mb-2">Chap ...</span>
                <span className="inline-block px-2 text-sm font-semibold mr-2 mb-2 right">{new Date(item.updatedAt).toLocaleDateString()}</span>
              </div>
              </div>
            </div>
          </div>
        </>
      );
    });
    return categoryDiv;
  }
  homeDiv(homes, nameDiv, filter){
    return(      
    <>
      <section className="pt-16 pb-0 px-0 mx-0">
        <div className="mx-0">
          <div className="flex flex-wrap mb-8 w-full px-20 justify-center">
            <div className="text-center mr-auto">
              <h2 className="text-4xl font-semibold">
                {nameDiv}
              </h2>
                </div>
                {this.filterDateFun(filter)}
              </div>
          <div className="flex flex-wrap justify-center px-20">
            {this.categoryDiv(homes)}
          </div>
        </div>
      </section>
    </>)
  }
  render() {
    const { error, isLoaded, homes, filter } = this.state;
    console.log(homes);
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
          {this.homeDiv(homes, "Most Viewed >", filter)}
        </div>
      );
    }
  }
}
export default mostView
