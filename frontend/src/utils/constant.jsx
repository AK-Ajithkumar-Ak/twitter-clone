// export const BaseUrl= "http://localhost:3000"
// export const BaseUrl= "https://twitter-clone-6wcl.onrender.com"

export const BaseUrl= import.meta.env.NODE_ENV =="production"? "": "http://localhost:3000"
// export const BaseUrl= import.meta.env.NODE_ENV =="development"? "http://localhost:3000" :""
// console.log(BaseUrl);
// console.log(import.meta.env);

// https://twitter-clone-6wcl.onrender.com  => production