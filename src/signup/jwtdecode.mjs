import jwt_Decode from "jwt-decode";
import base64url from "base64url";



const authSlice =  () => {
            
                const decode = jwt_Decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU1NjdjYTQ5YzU4NDJlZWVlMDMwMyIsImlhdCI6MTY2MTk2NDM3OSwiZXhwIjoxNjY5NzQwMzc5fQ.vxxb8d1WsaIYW1hHEERPLO64sA2EcWlPL2jY25sR38g");
                //const decode2 = base64url.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmU2NmE1YjhlYjExMTcyZjExNzRmYiIsImlhdCI6MTY2MTA2NTc1OCwiZXhwIjoxNjY4ODQxNzU4fQ.-j3jkLzw0UAoYIzLuaaWu0uFMM8P_2YMv0Bl22NaHYU");
                console.log(decode);      
}

authSlice();
