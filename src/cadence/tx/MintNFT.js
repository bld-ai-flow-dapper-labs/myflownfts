export const MintNFT = `import Ungated from 0x39d2ec26093f679d
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction(
seriesId: UInt32,
setId: UInt32,
brand: String,
name: String
) {

let adminCheck: &Ungated.Admin

let seriesRef: &Ungated.Series

let receiver: &{NonFungibleToken.CollectionPublic}

  prepare(acct: AuthAccount) {
   self.adminCheck = acct.borrow<&Ungated.Admin>(from: Ungated.AdminStoragePath)
  ?? panic("could not borrow admin reference")

  self.seriesRef = self.adminCheck.borrowSeries(seriesId: seriesId)

  self.receiver = acct.getCapability<&Ungated.Collection{NonFungibleToken.CollectionPublic}>(Ungated.CollectionPublicPath).borrow()
  ?? panic("could not borrow capability")

  }



  execute {
    self.seriesRef.mintUngatedNFT(recipient: self.receiver, setId: setId, brand: brand, name: name)
    log("minted NFT in account 1")
  }
}
`