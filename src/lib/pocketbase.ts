import PocketBase from "pocketbase";
import {useState, useEffect, use} from "react";
// const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

// export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
export const pb = new PocketBase('https://mindease.pockethost.io/');
// console.log(process.env.NEXT_PUBLIC_PB_URL);

export function useCurrentUser(){
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);

  useEffect(() => {
    const removeListener = pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth);
      setCurrentUser(pb.authStore.model);
    });
    return() => {
      removeListener();
    }
  },[]);
  
  return currentUser;
}

