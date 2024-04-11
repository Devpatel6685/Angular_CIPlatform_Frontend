export const baseAPIUrl = "https://localhost:7034/api/";

export const endPoint = {
    Register: "User/register",
    IsUserExist: "User/IsUserExist",
    Login: "User/Login",
    ForgotPassword: "User/ForgotPassword",
    ResetPassword: "User/ResetPassword",
    CheckPassWord:"User/CheckPassWord",

    GetAllBanners: "Common/GetAllBanners",
    GetAllUsers: "Common/GetAllUsers",
    GetAllCountries: "Common/GetAllCountries",
    GetCitiesByCountry: "Common/GetCitiesByCountry/",
    GetAllThemes: "Common/GetAllThemes",
    GetAllSkills: "Common/GetAllSkills",
    AddToFavourite: "Mission/AddToFavourite",
    GetMissionsByFilter: "Mission/GetMissionsByFilter",
    RecommandMissionToWorkers:"Mission/RecommandMissionToWorkers",
    GetVolunteeringMission: "Mission/GetVolunteeringMission",
    SaveMissionApplication: "Mission/SaveMissionApplication",
    SaveComment: "Mission/SaveComment",
    SaveRatings: "Mission/SaveRatings",
    checkMissionApplied :"Mission/checkMissionApplied",
    GetRelatedMission:"Mission/GetRelatedMission",

    GetStory: "Story/GetStory",
    GetStoryById: "Story/GetStoryById",
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