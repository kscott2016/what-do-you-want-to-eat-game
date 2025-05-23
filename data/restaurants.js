const restaurants = [

  {
    name: "Bonefish Grill",
    foodType: "seafood",
    avgPrice: 100,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://s3.amazonaws.com/cloconnect-townsquare/uploads/f5ddc6c539c36d3131737e7d478e6b80.jpeg"
  },

  {
    name: "McDonalds",
    foodType: "fastfood",
    avgPrice: 30,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://i.pinimg.com/originals/a9/90/9c/a9909c24d2dd1a8fe82e953120349384.jpg"
  }, 

  {
    name: "Raising Canes",
    foodType: "fastfood",
    avgPrice: 30,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7QjzRlAN3XGnVxo08e_IL7G1zH_rXyQe62w&usqp=CAU"
  },
  
  {
    name: "Uncle Julio's",
    foodType: "mexican",
    avgPrice: 75,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://file-optimizer.s3.amazonaws.com/uncle-julios/assets/store-49.jpg"
  },

  {
    name: "Rising Sun",
    foodType: "asian",
    avgPrice: 25,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: false,
    recentVisit:false,
    logoUrl:"https://fastly.4sqi.net/img/general/600x600/11216393_GuDrzw0Xcx6mo-n8POaiiTQgZ-fv7ZHFwfOMOkiXCrY.jpg"
  },

  {
    name: "The Cheesecake Factory",
    foodType: "multiple",
    avgPrice: 80,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://www.nrn.com/sites/nrn.com/files/styles/article_featured_retina/public/Cheesecake_Factory-size-advantage-reopening-coronavirus.jpg?itok=4ZzA9O8l"
  },

  {
    name: "Geja's Cafe",
    foodType: "fondue",
    avgPrice: 160,
    offersTakeout:false,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://media.timeout.com/images/100901505/image.jpg"
  },

  {
    name: "Burger King",
    foodType: "fastfood",
    avgPrice: 30,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://admin.itsnicethat.com/images/C0a8a6uAtKMZ8bQny-IUyHWMVE8=/198174/format-webp%7Cwidth-2880/burger_king_rebrand_graphic_design_itsnicethat1.jpg"
  }, 

  {
    name: "Thi Thi Restaurant",
    foodType: "asian",
    avgPrice: 80,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://www.thithirestaurant.com/Contents/images/experience/about-us.jpg"
  },

  {
    name: "Jimmy's Dog House",
    foodType: "fastfood",
    avgPrice: 25,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: false,
    recentVisit:false,
    logoUrl:"https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/laijsrgg7nwc4h1fxbo0"
  },

  {
    name: "La Crepe Bistro",
    foodType: "french",
    avgPrice: 125,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://suburbanchicagoland.com/wp-content/uploads/2021/09/IMG_2793-scaled-e1631976716613.jpg"
  },

  {
    name: "KupAJoe Cafe",
    foodType: "brunch",
    avgPrice: 65,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://fastly.4sqi.net/img/general/600x600/77773384_g9f5aGM2dNW2goNFVGE4KnifLKQyYm7UsyKzs1nGJsA.jpg"
  },

  {
    name: "Cooper's Hawk Winery and Restaurant",
    foodType: "multiple",
    avgPrice: 80,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://patch.com/img/cdn20/users/22925010/20220113/064016/styles/patch_image/public/coopers-hawk___13182211043.png"
  },

  {
    name: "Culver's",
    foodType: "fast food",
    avgPrice: 30,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://cdn.culvers.com/about-culvers-new/culvers-outdoor-drive-thru.jpg"
  },

  {
    name: "Tandoori House",
    foodType: "indian",
    avgPrice: 50,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://static1.squarespace.com/static/540e2e30e4b0a9fac1c138ac/t/6012f0d8f95995044058fa5a/1611854046964/?format=1500w"
  },

  {
    name: "Batter & Berries",
    foodType: "brunch",
    avgPrice: 50,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-147258000000000000/restaurant/images/rest-ef089f60-c075-482b-803e-6a30d1676385.jpg?size=medium"
  },

  {
    name: "Boka",
    foodType: "american",
    avgPrice: 165,
    offersTakeout:false,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://static.wixstatic.com/media/17c648_2192a35a8203474aa29e458d6e55d612~mv2.jpg/v1/fill/w_1000,h_601,al_c,q_85,usm_0.66_1.00_0.01/17c648_2192a35a8203474aa29e458d6e55d612~mv2.jpg"
  },

  {
    name: "Fat Rosie's",
    foodType: "mexican",
    avgPrice: 70,
    offersTakeout:true,
    offersCocktails:true,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://images.getbento.com/accounts/b4b148424bd38e72d3c74dc5c074a855/media/images/53962FR_Logo-01-edit.png?w=1200&fit=fill&auto=compress,format&h=600&bg=ff5a8d&pad=100"
  },

  {
    name: "Rosati's",
    foodType: "italian",
    avgPrice: 60,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: false,
    recentVisit:false,
    logoUrl:"https://shop-logos.imgix.net/shops/13595/original/Rosati's_Google_Logo.jpg"
  },

  {
    name: "Jersey Mike's",
    foodType: "sandwich shop",
    avgPrice: 30,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/5d49d216-65a2-404b-a76e-b6da5e5db3e4.jpg"
  },

  {
    name: "Eiffel Waffle",
    foodType: "dessert",
    avgPrice: 25,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://i.ytimg.com/vi/VxHbfZYNnQI/maxresdefault.jpg"
  },

  {
    name: "Oberweis",
    foodType: "dessert",
    avgPrice: 25,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: true,
    recentVisit:false,
    logoUrl:"https://www.enjoyaurora.com/member_photos/oberweis-northaurora-enjoyaurora.jpg"
  },

  {
    name: "Crumbl Cookies",
    foodType: "dessert",
    avgPrice: 14,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: false,
    recentVisit:false,
    logoUrl:"https://www.inmaricopa.com/wp-content/uploads/2022/12/Photo-11-LOGO.png"
  },

  {
    name: "Nothing Bundt Cakes",
    foodType: "dessert",
    avgPrice: 12,
    offersTakeout:true,
    offersCocktails:false,
    offersIndoorDining: false,
    recentVisit:false,
    logoUrl:"https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/9f9bdcc3-fa2b-4a1e-b92a-c423e42cc8fb.jpg"
  },

]

function getRestaurants() {
  return restaurants
}


export {
  getRestaurants,
}