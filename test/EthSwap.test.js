const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

// Library for test (TDD)
require('chai').use(require('chai-as-promised')).should()

// Convert into 18 decimals
function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', (accounts) => {
  let token, ethSwap
  before(async () => {
    token = await Token.new()
    ethSwap = await EthSwap.new()
    await token.transfer(ethSwap.address, tokens('1000000'))
  })

  // Check name of the token
  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Test Token')
    })
  })

  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name()
      assert.equal(name, 'EthSwap Instant Exchange')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(ethSwap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

}) 