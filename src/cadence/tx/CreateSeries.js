export const CreateSeries = `import Ungated from 0x39d2ec26093f679d

transaction(seriesID: UInt32, drop: String) {

let adminCheck: &Ungated.Admin

  prepare(acct: AuthAccount) {
   self.adminCheck = acct.borrow<&Ungated.Admin>(from: Ungated.AdminStoragePath)
  ?? panic("could not borrow admin reference")
  }

  execute {
    self.adminCheck.addSeries(seriesId: seriesID, metadata: {"Ungated_Drop": drop})
    log("series added")
  }
}
`