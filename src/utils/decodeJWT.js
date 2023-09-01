const decodeJWT = (jwt) => {
  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedJWTPayload = JSON.parse(atob(base64));
  return decodedJWTPayload;
};

export default decodeJWT;
