// Query 1
cursor_r_1 = db.restaurants.find({name:"Caffe Dante"},{restaurant_id:1,_id:0});


// Query 2
cursor_r_2 = db.restaurants.find({name:{ $regex: "Steak"} },{restaurant_id:1,_id:0,name:1});

// Query 3
cursor_r_3 = db.restaurants.find({$and:[{$or:[{cuisine:"Italian"},{cuisine:"American"}]}, {borough:"Brooklyn"}]},{name:1});

// Query 4
cursor_r_4 = db.restaurants.aggregate( [    { $match: {cuisine:{$regex:"America"}} },    {$group:{_id:"$borough",count:{$sum:1}}},    {$sort:{count:-1}} ] );



// Query 5
cursor_r_5 = db.restaurants.aggregate( [
{ $match: {cuisine:"Chinese",borough:"Manhattan"} },
{$unwind:"$grades"},
{$group:{_id:"$restaurant_id",name:{$first:"$name"},score:{$sum:"$grades.score"}}},
{$project:{score:1,name:1,_id:0}},
{$sort:{score:-1}},
{$limit:5}
] )

// Query 6
cursor_r_6 =db.restaurants.find({name:{$in:["Pino'S La Forchetta","New Heights Bar And Restaurant","Los Pollitos Iii","Georges Restaurant","Cheikh Umar Futiyu Restaurant","Juice It Health Bar"]}},{_id:0,name:1,grades:1})


// Query 7
cursor_z_1 =db.zips.aggregate([{$sort:{pop:-1}},{$limit:10},{$project:{"pop":0,"loc":0}}]);


// Query 8
cursor_z_2 = db.zips.aggregate([ { "$sort": { "pop": -1 }},{ "$group": {"_id": "$state","city":{"$first":"$city"}}}]);


// Query 9
cursor_z_3 =db.zips.aggregate([{ "$group": {"_id": "$state",avgPop:{$avg:"$pop"}}},{"$match":{"avgPop":{"$gt":10000}}},{ $project: { avgPop: { $round: [ "$avgPop",0 ] } } }]);



// Query 10
cursor_z_4 = db.zips.find({ "loc" : { $near : [ -70, 40 ] } },{city:1,_id:0}).limit(5);