import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useInternetStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>();
  useEffect(() => {
    const subscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    return () => subscribe();
  });

  return isConnected;
};

export default useInternetStatus;
