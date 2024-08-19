import React, { useState } from "react";
import { isValidIPv4, isValidIPv6 } from "..//utils/ipValidator";

const MyComponent: React.FC = () => {
  const [ip, setIp] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCheckIp = () => {
    if (isValidIPv4(ip)) {
      setIsValid(true);
    } else if (isValidIPv6(ip)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP address"
      />
      <button onClick={handleCheckIp}>Check IP</button>
      {isValid !== null && (
        <p>{isValid ? "Valid IP Address" : "Invalid IP Address"}</p>
      )}
    </div>
  );
};

export default MyComponent;
