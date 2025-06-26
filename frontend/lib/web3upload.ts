import {NFTStorage} from "nft.storage";
 
const web3Upload = () => {
  const token = '718c516e.15332445162f47b1801115a4700566b2' // process.env.NFT_STORAGE_API_KEY;
  if(!token) 
    throw new Error("NFT_STORAGE_API_KEY is not set");

  return new NFTStorage({ token });
}   

export default web3Upload;