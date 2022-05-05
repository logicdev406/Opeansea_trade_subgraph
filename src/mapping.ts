import {
  OwnershipTransferred as OwnershipTransferredEvent,
  OrdersMatched as OrdersMatchedEvent,
  Token as TokenContract,
} from "../generated/Token/Token";

import { Token, OrdersMatched } from "../generated/schema";

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let token = Token.load(event.transaction.hash.toHex());
  if (token === null) {
    token = new Token(event.transaction.hash.toHex());
    token.id = event.transaction.hash.toHex();
    token.blockNumber = event.block.number;
    token.hash = event.transaction.hash;
    token.addressFrom = event.params.previousOwner;
    token.addressTo = event.params.newOwner;
    
    // let tokenContract = TokenContract.bind(event.address);
    // token.metadataURI = tokenContract.;
    // token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId);
    // token.contentURI = tokenContract.tokenURI(event.params.tokenId);
    token.save();
  }
}

export function handleOrdersMatched(event: OrdersMatchedEvent): void {
  let order = OrdersMatched.load(event.transaction.hash.toHex())
  if (order === null) {
    order = new OrdersMatched(event.transaction.hash.toHex())
    order.id = event.transaction.hash.toHex()
    order.blockNumber = event.block.number
    order.buyHash = event.params.buyHash.toHex()
    order.sellHash = event.params.sellHash.toHex()
    order.maker = event.params.maker
    order.taker = event.params.taker
    order.price = event.params.price
    order.metadata = event.params.metadata

    order.save()
  }
}
