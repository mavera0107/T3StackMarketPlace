export function FETCH_CREATED_NFT(address: any) {
  return `query{
  tokens(where:{
    creator:"${address}"
  }){
    tokenID
    Name
    Description
    ImageUrl
    createdAtTimestamp
  }
} `;
}


export function FETCH_RECENT_BUY(address: any) {
  return `query {
  buys(where:{to:"${address}"}){
    id
    tokenId
    price
    Description
    ImageUrl
    Name
    to
    from
  }
}`;
}

export function FETCH_RECENT_SOLD(address: any) {
  return `query {
  buys(where:{from:"${address}"}){
    id
    tokenId
    price
    Description
    ImageUrl
    Name
    to
    from
  }
}`;
}
