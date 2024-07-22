require('dotenv').config();
const BN = require("bn.js");
const { DAI, WBTC, WBTC_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const TestUniswap = artifacts.require("TestUniswap");

contract("TestUniswap", (accounts) => {
  const WHALE = WBTC_WHALE;
  const AMOUNT_IN = new BN(100);
  const AMOUNT_OUT_MIN = new BN(1);
  const TOKEN_IN = WBTC;
  const TOKEN_OUT = DAI;
  const TO = accounts[0];
  const UNISWAP_ROUTER = "0x7a250d5630b4cf539739df2c5dacf5ae17e6b6b8"; // Uniswap V2 Router address

  let testUniswap;
  let tokenIn;
  let tokenOut;

  beforeEach(async () => {
    tokenIn = await IERC20.at(TOKEN_IN);
    tokenOut = await IERC20.at(TOKEN_OUT);
    testUniswap = await TestUniswap.new(UNISWAP_ROUTER);

    // Check whale balance
    const whaleBalanceIn = await tokenIn.balanceOf(WHALE);
    const whaleBalanceOut = await tokenOut.balanceOf(WHALE);
    console.log(`Whale balance (in token) before swap: ${whaleBalanceIn.toString()}`);
    console.log(`Whale balance (out token) before swap: ${whaleBalanceOut.toString()}`);
    assert(whaleBalanceIn.gte(AMOUNT_IN), "Whale does not have enough balance");

    // Approve tokens
    await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
    const allowance = await tokenIn.allowance(WHALE, testUniswap.address);
    console.log(`Allowance: ${allowance.toString()}`);
    assert(allowance.gte(AMOUNT_IN), "Allowance is not enough");

    // Check user balance
    const userBalance = await tokenOut.balanceOf(TO);
    console.log(`User balance before swap: ${userBalance.toString()}`);
  });

  it("should pass", async () => {
    const balanceBefore = await tokenOut.balanceOf(TO);
    console.log(`Token out balance before swap: ${balanceBefore.toString()}`);

    const whaleBalanceInBefore = await tokenIn.balanceOf(WHALE);
    const whaleBalanceOutBefore = await tokenOut.balanceOf(WHALE);
    console.log(`Whale balance (in token) before swap: ${whaleBalanceInBefore.toString()}`);
    console.log(`Whale balance (out token) before swap: ${whaleBalanceOutBefore.toString()}`);

    try {
      await testUniswap.swap(
        tokenIn.address,
        tokenOut.address,
        AMOUNT_IN,
        AMOUNT_OUT_MIN,
        TO,
        {
          from: WHALE,
        }
      );

      const balanceAfter = await tokenOut.balanceOf(TO);
      console.log(`Token out balance after swap: ${balanceAfter.toString()}`);

      const whaleBalanceInAfter = await tokenIn.balanceOf(WHALE);
      const whaleBalanceOutAfter = await tokenOut.balanceOf(WHALE);
      console.log(`Whale balance (in token) after swap: ${whaleBalanceInAfter.toString()}`);
      console.log(`Whale balance (out token) after swap: ${whaleBalanceOutAfter.toString()}`);

      // Verify the balance increase
      assert(balanceAfter.gt(balanceBefore), "Token out balance did not increase");
    } catch (error) {
      console.log("Error during swap:", error);
      assert.fail("Swap transaction reverted");
    }
  });
});
