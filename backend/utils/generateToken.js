import jwt from "jsonwebtoken";

export const generate_token_set_cookie = (userId, res) => {
  let token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // console.log("envp:", process.env.NODE_ENV === "production");
  // console.log("encpcheck:", process.env.NODE_ENV === "production"? "strict": "none",);
  
  res.cookie("jwttoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production"? "strict": "none",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000, // millisecond
  });
};

/* 
httponly: true
prevent XSS attacks cross-site scripting attacks, Client side javascript can not access cookie using document.cookie Only the **server** can see this cookie — not client-side scripts
secure: true
Ensures the cookie is **only sent over HTTPS** connections, Only send this cookie if the connection is secure (SSL/TLS), Without `Secure`, someone could intercept it on public Wi-Fi (man-in-the-middle attack).
samesite:"strict"
Prevents the cookie from being sent along with **cross-site requests, Only send this cookie if the request comes **from the same site prevent CSRF attacks cross-site request forgery attacks

*/