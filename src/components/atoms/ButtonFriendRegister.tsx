import React from 'react';
import firebase from '../../lib/firebase'
import {useDispatch, useSelector} from "react-redux";
import {RootState, UserDataProperties} from '../../types';
import {userDataAction} from "../../store/actions/userDataAction";
import {UserData} from "../../classes/UserData";
import {ChatData} from "../../classes/ChatData";
import {Hit} from "react-instantsearch-core";

type Props = {
  hits: Hit
}

const ButtonFriendRegister: React.FC<Props> = ({hits}) => {
  const userData = useSelector<RootState, UserDataProperties>(({userData}) => userData)
  const dispatch = useDispatch()

  // Create friend data object
  const createFriendDataObject = (
    uid: string,
    data: Pick<UserDataProperties, "userId" | "displayName" | "biography">
  ) => ({
    friend: {
      [data.userId]: {
        roomId: uid,
        displayName: data.displayName,
        biography: data.biography
      }
    }
  })

  const handleClick = () => {

    // Create unique ID
    const uid = firebase.firestore().collection('users').doc().id

    const newFriendData = createFriendDataObject(uid, {
      userId: hits.userId,
      displayName: hits.displayName,
      biography: hits.biography
    })

    const selfFriendData = createFriendDataObject(uid, {
      userId: userData.userId,
      displayName: userData.displayName,
      biography: userData.biography
    })

    // Store data in Redux
    dispatch(userDataAction.add(newFriendData))

    // Store your user data in the friend list data
    new UserData(userData.userId).updateUserData(newFriendData)

    // Add friend list data to friend's user data
    new UserData(hits.userId).updateUserData(selfFriendData)

    // Create a chat room
    new ChatData(uid).createChatData()
  }

  return (
    <button type="button" onClick={handleClick}>友達追加</button>
  );
};

export default ButtonFriendRegister;