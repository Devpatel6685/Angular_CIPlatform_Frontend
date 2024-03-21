export const baseAPIUrl = "https://localhost:7034/api/";

export const endPoint = {
    Register: "User/register",
    IsUserExist: "User/IsUserExist",
    Login: "User/Login",
    ForgotPassword: "User/ForgotPassword",
    ResetPassword: "User/ResetPassword",
};

export const StatusCodes = {
    Ok: 200,
    Created: 201,
    NotModified: 304,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Conflict: 409,
    InternalServer: 500
};