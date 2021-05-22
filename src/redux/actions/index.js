import {
    SET_DRIVE_ID,
} from "./ActionTypes"


export const setDriveID = drive => {
    return {
        type: SET_DRIVE_ID,
        drive
    }
}
