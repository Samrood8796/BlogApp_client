import { addFollow, getMyPosts, notification, profileUser, unfollow, unFriend, allUsers } from "../utils/constants";
import { setChat, setConversation, setCurrentChat, setPost, setUserData } from "../state/useReducer";
import axios from "../utils/axios";

// GET REQUEST
export const getAPI = async (url, token) => {
    const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res;
};

// POST REQUEST
export const postAPI = async (url, formData, token) => {
    const res = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res;
};

// PUT REQUEST
export const putAPI = async (url, formData, token) => {
    const res = await axios.put(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res;
};

// PATCH REQUEST
export const patchAPI = async (url, userId, token) => {
    const res = await axios.patch(url, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
    }
    );
    return res;
};

// DELETE REQUEST
export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res;
};


export const likePost = async (token, postId, dispatch) => {
    try {
        const response = await axios.patch(`/post/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = response.data
        dispatch(setPost({ posts: data }))

    } catch (err) {
        console.log(err);
    }
}




