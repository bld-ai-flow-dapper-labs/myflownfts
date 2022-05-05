export const CreateSet = `import Ungated from 0x39d2ec26093f679d

transaction(
  setId: UInt32,
  maxEditions: UInt32,
  imageLink: String,
  brand: String,
  type: String
  discount: String,
  name: String,
  description: String
  serialID: String,
  expiration: String,
) {

let adminCheck: &Ungated.Admin

let seriesRef: &Ungated.Series

  prepare(acct: AuthAccount) {
   self.adminCheck = acct.borrow<&Ungated.Admin>(from: Ungated.AdminStoragePath)
  ?? panic("could not borrow admin reference")

  self.seriesRef = self.adminCheck.borrowSeries(seriesId: 1)
  }

  execute {
    self.seriesRef.addNftSet(
    setId: setId, 
    maxEditions: maxEditions, 
    ipfsMetadataHashes: {1: imageLink}, 
    metadata: {
    "Brand": brand,
    "Type": type,
    "Discount": discount,
    "Name": name,
    "Description": description,
    "Image": imageLink,
    "Serial ID": serialID,
    "Expiration": expiration
    }
    )
  }
}

`