import {Hono} from 'hono';
import axios from 'axios';
import {queryDB} from '../database.js';
import {cors} from 'hono/cors';

const app = new Hono();

const port = process.env.PORT || 3000;

app.use('/*', cors());

app.get('/search', async (c) => {
    const {name} = c.req.query();

    if (name) {
        try {
            const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyCH6Og5niHx0mLXTNh0RGCuWGiiO7E8DaE`);
            return c.json(data);
        } catch (error) {
            console.log('🚀 ~ file: index.ts:15 ~ app.post ~ error:', error);
            return c.json(error);
        }
    }
});

app.get('/all', async (c) => {
    try {
        const res = await queryDB('SELECT * FROM restaurants');
        const data = res.map((item) => {
            // const photos = JSON.parse(item.photos);
            // const photoRefrence = photos[0].photo_reference;
            // const photoLink = createGooglePhotoLink(photoRefrence);
            const addressLink = generateGoogleLinkAddress(item.latitude, item.longitude);
            const typeOfRestaurant = item.types.split(',');
            delete item.types;
            delete item.photos;
            return {
                ...item,
                addressLink,
                typeOfRestaurant,
            };
        });
        return c.json(data);
    } catch (error) {
        console.log('🚀 ~ file: index.ts:34 ~ app.get ~ error:', error);
    }
});

// save in database function
app.post('/save', async (c) => {
    try {
        const data = await c.req.json();
        if (Object.keys(data).length > 0) {
            const query = `
        INSERT INTO restaurants (
            business_status,
            formatted_address,
            latitude,
            longitude,
            icon_url,
            icon_background_color,
            icon_mask_base_uri,
            name,
            place_id,
            price_level,
            reference,
            types,
            user_ratings_total,
            rating, 
            photos,
            filter_type
        )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
            const values = [
                data.business_status,
                data.formatted_address,
                data.geometry.location.lat,
                data.geometry.location.lng,
                data.icon,
                data.icon_background_color,
                data.icon_mask_base_uri,
                data.name,
                data.place_id,
                data.price_level,
                data.reference,
                JSON.stringify(data.types),
                data.user_ratings_total,
                data.rating,
                '',
                data.filter_type,
            ];

            const result = await queryDB(query, values);

            if (result.affectedRows > 0) {
                return c.json(true);
            }
        }
    } catch (error) {
        console.log('🚀 ~ file: index.ts:107 ~ app.post ~ error:', error);
        return c.json(false);
    }
});

// delete
app.delete('/delete', async (c) => {
    const name = c.req.query().name;
    const search = queryDB(`DELETE FROM restaurants WHERE name = '${name.toLowerCase()}'`);
    return c.json(search);
});

// update rating and comment of restaurant
app.put('/update', async (c) => {
    const {id} = c.req.query();
    const data = await c.req.json();
    if (!data) {
        return;
    }
    const res = await queryDB(`SELECT * FROM restaurants WHERE id = '${id}'`);

    if (res) {
        try {
            await queryDB(
                `UPDATE restaurants SET valyas_rating = '${data.valyasRating}', jonathans_rating = '${data.jonathansRating}', jonathan_review = '${data.jonathansReview}', valya_review = '${data.valyasReview}', filter_type = '${data.filterType}'
                WHERE id = '${id}'`
            );
            return c.json(true);
        } catch (error) {
            console.log(error);
            return c.json('error');
        }
    }
});

console.log('Running in port', port);

const generateGoogleLinkAddress = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

export default app;

//    features
// 1. add restaurant
// 2. delete restaurant
// 3. update restaurant
// 4. get all restaurants
// 5. add type of restaurant to restaurant to filter later
// 6. search restaurants
// 8. add reviews to restaurants by Jonathan & Valya
// 9. rate restaurants by Jonathan & Valya
// 10. add restaurants we want to try next
// 11. add restaurants that are favoritessssss
