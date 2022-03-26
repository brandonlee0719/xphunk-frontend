const traits = [
  {
    trait_type: "Attribute Count",
    values: [
      { value: "3", weight: "4" },
      { value: "2", weight: "3" },
      { value: "4", weight: "1" },
      { value: "5", weight: "2" },
      { value: "1", weight: "1" },
      { value: "6", weight: "1" },
      { value: "7", weight: "4" },
      { value: "0", weight: "2" },
      { value: "8", weight: "1" },
    ]
  },
  {
    trait_type: "Blemish",
    values: [
      { value: "Mole", weight: "766" },
      { value: "Rosy Cheeks", weight: "206" },
      { value: "Spots", weight: "189" },
    ]
  },
  {
    trait_type: "Ear",
    values: [
      { value: "Earring", weight: "2212" },
    ]
  },
  {
    trait_type: "Eyes",
    values: [
      { value: "Nerd Glasses", weight: "526" },
      { value: "Classic Shades", weight: "508" },
      { value: "Horned Rim Glasses", weight: "495" },
      { value: "Clown Eyes Blue", weight: "493" },
      { value: "Clown Eyes Green", weight: "492" },
      { value: "Big Shades", weight: "486" },
      { value: "Regular Shades", weight: "450" },
      { value: "Purple Eye Shadow", weight: "442" },
      { value: "Blue Eye Shadow", weight: "420" },
      { value: "Green Eye Shadow", weight: "416" },
      { value: "Eye Patch", weight: "391" },
      { value: "Small Shades", weight: "336" },
      { value: "VR", weight: ">33" },
      { value: "Eye Mask", weight: "282" },
      { value: "3D Glasses", weight: "270" },
      { value: "Welding Goggles", weight: "245" },
    ]
  },
  {
    trait_type: "Facial Hair",
    values: [
      { value: "Shadow Beard", weight: "291" },
      { value: "Muttonchops", weight: "210" },
      { value: "Chinstrap", weight: "201" },
      { value: "Mustache", weight: "200" },
      { value: "Luxurious Beard", weight: "198" },
      { value: "Handlebars", weight: "197" },
      { value: "Front Beard", weight: "182" },
      { value: "Goat", weight: "182" },
      { value: "Normal Beard Black", weight: "181" },
      { value: "Front Beard Dark", weight: "180" },
      { value: "Normal Beard", weight: "172" },
      { value: "Big Beard", weight: "128" },

    ]
  },
  {
    trait_type: "Hair",
    values: [
      { value: "Mohawk", weight: "05" },
      { value: "Cap Forward", weight: "83" },
      { value: "Mohawk Dark", weight: "76" },
      { value: "Headband", weight: "70" },
      { value: "Mohawk Thin", weight: "69" },
      { value: "Bandana", weight: "68" },
      { value: "Messy Hair", weight: "50" },
      { value: "Knitted Cap", weight: "42" },
      { value: "Stringy Hair", weight: "40" },
      { value: "Crazy Hair", weight: "24" },
      { value: "Cap", weight: "23" },
      { value: "Fedora", weight: "15" },
      { value: "Hoodie", weight: "12" },
      { value: "Frumpy Hair", weight: "05" },
      { value: "Wild Hair", weight: "01" },
      { value: "Red Mohawk", weight: "66" },
      { value: "Do-rag", weight: "48" },
      { value: "Police Cap", weight: "38" },
      { value: "Tassle Hat", weight: "36" },
      { value: "Peak Spike", weight: "16" },
      { value: "Shaved Head", weight: "15" },
      { value: "Cowboy Hat", weight: "02" },
      { value: "Wild Blonde", weight: "94" },
      { value: "Wild White Hair", weight: "94" },
      { value: "Clown Hair Green", weight: "82" },
      { value: "Top Hat", weight: "73" },
      { value: "Blonde Bob", weight: "70" },
      { value: "Blonde Short", weight: "65" },
      { value: "Straight Hair", weight: "64" },
      { value: "Dark Hair", weight: "61" },
      { value: "Purple Hair", weight: "54" },
      { value: "Half Shaved", weight: "53" },
      { value: "Straight Hair Blonde", weight: "53" },
      { value: "Vampire Hair", weight: "42" },
      { value: "Straight Hair Dark", weight: "41" },
      { value: "Orange Side", weight: "39" },
      { value: "Pink With Hat", weight: "20" },
      { value: "Pigtails", weight: "19" },
      { value: "Tiara", weight: "89" },
      { value: "Beanie", weight: "85" },
      { value: "Pilot Helmet", weight: "67" },
    ]
  },
  {
    trait_type: "Mouth",
    values: [
      { value: "Purple Lipstick", weight: "946" },
      { value: "Hot Lipstick", weight: "936" },
      { value: "Black Lipstick", weight: "826" },
      { value: "Frown", weight: "416" },
      { value: "Smile", weight: "403" },
      { value: "Buck Teeth", weight: "293" },
    ]
  },
  {
    trait_type: "Mouth Prop",
    values: [
      { value: "Cigarette", weight: "1034" },
      { value: "Vape", weight: "402" },
      { value: "Pipe", weight: "394" },
      { value: "Medical Mask", weight: "245" },
    ]
  },
  {
    trait_type: "Neck Accessory",
    values: [
      { value: "Gold Chain", weight: "238" },
      { value: "Silver Chain", weight: "200" },
      { value: "Choker", weight: "173" },
    ]
  },
  {
    trait_type: "Nose",
    values: [
      { value: "Clown Nose", weight: "173" },
    ]
  },
  {
    trait_type: "Skin Tone",
    values: [
      { value: "Dark", weight: "2925" },
      { value: "Medium", weight: "2902" },
      { value: "Light", weight: "2886" },
      { value: "Albino", weight: "1158" },
      { value: "Zombie", weight: "96" },
      { value: "Ape", weight: "23" },
      { value: "Alien", weight: "10" },
    ]
  },
  {
    trait_type: "Type",
    values: [
      { value: "Female", weight: "5932" },
      { value: "Male", weight: "3725" },
      { value: "Non-Binary (???)", weight: "214" },
      { value: "Zombie", weight: "96" },
      { value: "Ape", weight: "23" },
      { value: "Alien", weight: "10" },
    ]
  },
];

export default traits;