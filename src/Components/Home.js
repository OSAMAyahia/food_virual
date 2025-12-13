import React from 'react'
import NavBarCom from './NavBarCom';
import Coursol from './Coursol';
import CardCategory from './CardCategory';
import Card from './Card';

const HomeS = ({islogged}) => {
  return (
    <div>
       <NavBarCom islogged={islogged} />
        <Coursol />
        <CardCategory />
        <Card />
    </div>
  )
}

export default HomeS
