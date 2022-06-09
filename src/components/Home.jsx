import React from 'react'
import Carousle from "./Carousle";
import CarouselTwo from "./CarouselTwo";
import Category from "./Category";
import Navbar from "./Navbar";
import Slider from "./Slider";
import AllProducts from "./AllProducts";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
         <Navbar />
      <Slider />
      <Category></Category>
      <Carousle></Carousle>
      <CarouselTwo></CarouselTwo>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </>
  )
}
