// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.

const MAINNET = {
  NU: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
  T:  '0xCdF7028ceAB81fA0C6971208e83fa7872994beE5',
  KEEP: '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec',
  STAKINGESCROW: "0xbbD3C0C794F40c4f993B03F65343aCC6fcfCb2e2",
  POLICYMANAGER: "0x67E4A942c067Ff25cE7705B69C318cA2Dfa54D64",
  ADJUDICATOR: "0x359924Be0640659F34198e518BF3d40Fb56160BE",
  KEEPVENDINGMACHINE: "0xE47c80e8c23f6B4A1aE41c34837a0599D5D16bb0",
  NUVENDINGMACHINE: "0x1CCA7E410eE41739792eA0A24e00349Dd247680e"
}

const GOERLI = {
  NU: '0x02B50E38E5872068F325B1A7ca94D90ce2bfff63',
  STAKINGESCROW: "0x40Ca356d8180Ddc21C82263F9EbCeaAc6Cad7250",
  POLICYMANAGER: "0xaC5e34d3FD41809873968c349d1194D23045b9D2",
  ADJUDICATOR: "0xC62e20B599416e4B5F3b54d50837F070bFec6412",
}

const RINKEBY = {
  NU: '0x78D591D90a4a768B9D2790deA465D472b6Fe0f18',
  STAKINGESCROW: "0x6A6F917a3FF3d33d26BB4743140F205486cD6B4B",
  POLICYMANAGER: "0x4db603E42E6798Ac534853AA2c0fF5618cb0ebE5",
  ADJUDICATOR: "0xE1d0C09b94ba522BCC1b73922dc1f0b6ca9bEA26",
}

const ROPSTEN = {
  T: '0xf0CDE285E536f96caeEFd86Baba88572009A90f7',
  NU: '0x83f0af61478bC76Edae0dDC819cE36540289D92f',
  KEEP: '0x29DDc999E81E585D500BcA2FD2A8bcA677680e72',
  KEEPVENDINGMACHINE: "0x8086213B97284149CD02748A0Bba1c4fa06e5Bf7",
  NUVENDINGMACHINE: "0x254439Dd2B841E19161bD050D4805029196E29C4"
}


const addresses = {
    1:      MAINNET,
    "0x1":  MAINNET,

    // "0x4":  RINKEBY,
    // 4:      RINKEBY,

    // "0x5":  GOERLI,
    // 5:      GOERLI,

    "0x3": ROPSTEN,
    3: ROPSTEN
}

export default addresses
