import crypto from "crypto"

export const randomString = ():string => {
    const hash = crypto.createHash('sha256').update((new Date()).toLocaleDateString()).digest('hex');
    const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result: string = "";
  
    // Extract the first 8 characters of the hash and convert to alphanumeric
    for (let i = 0; i < 8; i++) {
      const hashChar = hash[i];
      const index = parseInt(hashChar, 16) % alphanumericChars.length;
      result += alphanumericChars[index];
    }
  
    return result;
}