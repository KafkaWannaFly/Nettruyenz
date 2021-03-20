"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevel = exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["OnGoing"] = 0] = "OnGoing";
    MangaStatus[MangaStatus["Complete"] = 1] = "Complete";
    MangaStatus[MangaStatus["Dropped"] = 2] = "Dropped";
})(MangaStatus || (MangaStatus = {}));
exports.MangaStatus = MangaStatus;
var UserLevel;
(function (UserLevel) {
    UserLevel[UserLevel["normal"] = 0] = "normal";
    UserLevel[UserLevel["moderator"] = 1] = "moderator";
})(UserLevel || (UserLevel = {}));
exports.UserLevel = UserLevel;
