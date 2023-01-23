export const SET_USER_NAME ='SET_USER_NAME';
export const SET_USER_NUMBER = "SET_USER_NUMBER";

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME, 
        payload: name
    });
};

export const setNumber = number => dispatch => {
    dispatch({
        type: SET_USER_NUMBER, 
        payload: number
    });
};