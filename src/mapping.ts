import {
  OwnershipTransferred as OwnershipTransferredEvent,
  Token as TokenContract,
} from "../generated/Token/Token";

import { Token } from "../generated/schema";

export function handleTransfer(event: OwnershipTransferredEvent): void {
  let token = Token.load(event.transaction.hash.toString());
  if (token == null) {
    token = new Token(event.transaction.hash.toString());
    token.id = event.transaction.hash.toString();
    token.blockNumber = event.block.number;
    token.hash = event.transaction.hash;
    token.addressFrom = event.params.previousOwner;
    token.addressTo = event.params.newOwner;
    
    // let tokenContract = TokenContract.bind(event.address);
    // token.metadataURI = tokenContract.;
    // token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId);
    // token.contentURI = tokenContract.tokenURI(event.params.tokenId);
  }
  token.save();
}
