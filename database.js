original_id = ObjectId()

db.users.insert(
  [
    {email: 'metroplex02@gmail.com'},
    {email: 'j.schoolmee@gmail.com'},
    {email: 'jonathan.p.mattox@gmail.com'},
    {email: 'lukeschlangen@gmail.com'}
  ]
);

db.fish.insert(
  [
    {species: "Bass", fishLength: 13, weight: 2, girth: 1, location: "Baby Lake", gear: "Crank Bait", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'},
    {species: "Walleye", fishLength: 15, weight: 5, girth: 2, location: "Woman Lake", gear: "Lindy Rig", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'},
    {species: "Perch", fishLength: 2, weight: .32, girth: 1, location: "Baby Lake", gear: "Jig Minnow", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'},
    {species: "Perch", fishLength: 2, weight: .32, girth: 1, location: "Baby Lake", gear: "Jig Minnow", weather: "Cold and Cloudy", email: 'metroplex02@gmail.com'},
    {species: "Muskie", fishLength: 70, weight: 17, girth: 12, location: "Baby Lake", gear: "Silver Spoon", weather: "Sunny and Clear", email: 'metroplex02@gmail.com'}
  ]
);
