const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

// Library for test (TDD)
require('chai').use(require('chai-as-promised')).should()

// Convert into 18 decimals
function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployers, investor]) => {
  let token, ethSwap
  before(async () => {
    token = await Token.new()
    ethSwap = await EthSwap.new(token.address)
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


  describe('Token deployment', async () => {

  })


  describe('EthSwap deployment', async () => {

  })

  describe('buyTokens()', async () => {
    let result
    before(async () => {
      result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
    })
    it('Allows user to purchase tokens from ethSwap for a fixed price', async () => {
      // CHeck investor token balance after purcahse
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens(100))

      // Check ethSwap balance after purchase
      let ethSwapBalance
      ethSwapBalance = await token.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), tokens('999900'))
    })
  })


}) 