// export const BaseUrl= "http://localhost:3000"

export const BaseUrl= import.meta.env.NODE_ENV =="development"? "http://localhost:3000" :""
// https://twitter-clone-6wcl.onrender.com  => production