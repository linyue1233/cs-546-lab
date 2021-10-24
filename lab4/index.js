const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection')
let { ObjectId } = require('mongodb');
let deepEqual = require('deep-equal');

const main = async () => {
    // ID :10479231  Name :Yue Lin
    
    // const benchMoon = await restaurants.create("The Saffron Lounge", "New York City, New York", "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 1, { dineIn: true, takeOut: true, delivery: false },"red");
    // console.log(benchMoon);

    // const sunxi = await restaurants.create("sunxi van&dark home", "Huan Xiang City, New York", "123-456-2321", "http://www.saffronlounge.com", "$", ["Cuban", "Italian"], 0, { dineIn: true, takeOut: true, delivery: false });

    // const showAllRestaurants = await restaurants.getAll();
    // console.log(showAllRestaurants);

    // const xujie = await restaurants.create("xujie sweet candy theme", "Gao You City, New Jersey", "232-434-3333", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 1, { dineIn: true, takeOut: true, delivery: false });
    // console.log(xujie);

    // const newBM = await restaurants.rename(benchMoon._id.toString(), "http://www.YueLin.com");
    // console.log(newBM);

    // const removeMessage = await restaurants.remove(sunxi._id.toString());
    // const showAllResAgain = await restaurants.getAll();
    // console.log(showAllResAgain);

    // try{
    //     const badRes = await restaurants.create("Cindrela Pizza", "Jersey City, New Jersey", "232-4-3333", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 1, { dineIn: true, takeOut: true, delivery: false });
    // }catch(e){
    //     console.log(e);
    // }
    // try{
    //     await restaurants.remove("5fa41e7f4ee57a30687e80e9");  
    // }catch(e){
    //     console.log(e);
    // }
    // try{
    //     await restaurants.rename("5fa41e7f4ee57a30687e80e9", "http://www.YueLin.com"); 
    // }catch(e){
    //     console.log(e);
    // }
    // try{
    //     await restaurants.rename("615a678d3566bf554cad6839", "http://www.YueL.com");
    // }catch(e){
    //     console.log(e);
    // }
    // try{
    //     const getRestaurant = await restaurants.get("5fa41e7f4ee57a30687e80e9");
    // }catch(e){
    //     console.log(e);
    // }
    const db = await connection();
    await db.serverConfig.close();
    console.log('Done!');
}

// main().catch((error) => {
//     console.log(error);
// });


const one = {
    fruit: '🥝',
    energy: '255kJ',
};

const two = {
    fruit: '🥝',
    energy: '255kJ'
};
console.log(deepEqual(one, two));