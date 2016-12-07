original_id = ObjectId()

db.users.insert(
  [
    {"_id": original_id, email: 'metroplex02@gmail.com'}
  ]
);

db.fish.insert(
  [
    {breed: "Bass", length: 13, weight: 2, girth: 1, location: "Baby Lake", gear: "Crank Bait", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'},
    {breed: "Walleye", length: 15, weight: 5, girth: 2, location: "Woman Lake", gear: "Lindy Rig", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'}
  ]
);
