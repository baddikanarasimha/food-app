
import image_1 from './food_1.png';
import image_2 from './food_2.png';
import image_3 from './food_3.png';
import image_4 from './food_1.png';
import { original } from '@reduxjs/toolkit';

let Listitems = [
    {
        id: 1,
        itemname: "Greek Salad",
        image: image_1,
        price: 20,
        originalprice:50
    },
    {
        id: 2,
        itemname: "Mushroom Salad",
        image: image_2,
        price: 40,
        originalprice:50
    },
    {
        id: 3,
        itemname: "Veg Salad",
        image: image_3,
        price: 50,
        originalprice:60
    },
    {
        id: 4,
        itemname: "Chicken Salad",
        image: image_4,
        price: 70,
        originalprice:70
    },
];

export default Listitems;
