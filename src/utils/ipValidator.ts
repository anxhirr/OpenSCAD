import { Address6, Address4 } from "ip-address";

export const isValidIPv4 = (ip: string): boolean => {
  return Address4.isValid(ip);
};

export const isValidIPv6 = (ip: string): boolean => {
  return Address6.isValid(ip);
};
