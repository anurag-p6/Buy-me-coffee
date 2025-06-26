import { NFTStorage } from 'nft.storage'
import web3Upload  from '@/lib/web3upload'
import { NextRequest, NextResponse } from 'next/server'


export const POST = async (request: NextRequest) => { 
   try {
    const formdata = await request.formData();
    const file = formdata.get('file') as File;

    if(!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const client = web3Upload();
    const cid = await client.storeBlob(file);
    const url = `https://nftstorage.link/ipfs/${cid}`;

   } catch (error) {
      console.log('Error uploading file:', error);
     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
   }
}