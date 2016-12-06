original_id = ObjectId()

db.users.insert(
  [
    {"_id": original_id, email: 'metroplex02@gmail.com'},
    {"_id": original_id, email: 'christopherjamesmattox@gmail.com'},
    {"_id": original_id, email: 'j.schoolmee@gmail.com@gmail.com'}
  ]
);

db.fish.insert(
  [
    {"_id": original_id, breed: "Bass", length: 13, weight: 2, girth: 1, location: "Baby Lake", gear: "Crank Bait", weather: "Cold and Cloudy"},
    {"_id": original_id, breed: "Walleye", length: 15, weight: 5, girth: 2, location: "Woman Lake", gear: "Lindy Rig", weather: "Cold and Cloudy"}
  ]
);




// db.users.insert(
//    [
//     { email: 'metroplex02@gmail.com', clearanceLevel: 5 },
//     { email: 'christopherjamesmattox@gmail.com', clearanceLevel: 4 }, // Your Google Email added here
//     { email: 'j.schoolmee@gmail.com@gmail.com', clearanceLevel: 2 }, // Your Other Google Email added here
//     { email: 'luke@primeacademy.io', clearanceLevel: 3 }
//    ]
// );
//
// db.fish.insert(
//   [
//     { email: 'metroplex02@gmail.com', secretText: 'Not that secret' },
//     { email: 'christopherjamesmattox@gmail.com', secretText: 'A good secret' },
//     { email: 'j.schoolmee@gmail.com@gmail.com', secretText: 'A secret' },
//     { email: 'luke@primeacademy.io', secretText: 'Kind of a secret' },
//   ]
// );
//
// original_id = ObjectId()
//
// db.users.insert({
//     "_id": original_id,
//     email: 'metroplex02@gmail.com'
// })
//
// db.fish.insert({
//     "breed": "Bass",
//     "fish_id": original_id,
//     "length":
// })
