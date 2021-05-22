import { SET_DRIVE_ID } from "../actions/ActionTypes";

export const set_Drive_ID = (state = [], action) => {
    switch (action.type) {
        case SET_DRIVE_ID:

            return [
                {
                    driveInfo: action.drive
                }
            ]
        default:
            return state;
    }

}
