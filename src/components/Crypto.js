import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Flex,
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

function Crypto() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState("long-term");
  const [annualIncome, setAnnualIncome] = useState(0);
  const [taxRate, setTaxRate] = useState("");
  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0);
  const [longTermDiscount, setLongTermDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToBePaid, setTaxToBePaid] = useState(0);
  const [annualRange, setAnnualRange] = useState("$0-$18,200");

  useEffect(() => {
    calculateTax();
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "purchasePrice":
        setPurchasePrice(parseFloat(value));
        break;
      case "salePrice":
        setSalePrice(parseFloat(value));
        break;
      case "expenses":
        setExpenses(parseFloat(value));
        break;
      case "annualIncome":
        setAnnualRange(value);
        break;
      default:
        break;
    }
  };

  const calculateTax = () => {
    // Calculating Capital Gains Amount
    const capitalGainsAmount = salePrice - purchasePrice - expenses;
    setCapitalGainsAmount(capitalGainsAmount);

    // Calculating Long Term Discount
    let longTermDiscount = 0;
    if (investmentType === "LongTerm" && capitalGainsAmount > 0) {
      longTermDiscount = capitalGainsAmount * 0.5;
    }
    setLongTermDiscount(longTermDiscount);

    // Calculating the net gains
    const netCapitalGains = capitalGainsAmount - longTermDiscount;
    setNetCapitalGains(netCapitalGains);

    switch (annualRange) {
      case "$0-$18,200":
        setAnnualIncome(18200);
        break;
      case "$18,201-$45,000":
        setAnnualIncome(45000);
        break;
      case "$45,001-$120,000":
        setAnnualIncome(120000);
        break;
      case "$120,001-$180,000":
        setAnnualIncome(180000);
        break;
      case "$180,001+":
        setAnnualIncome(180001);
        break;
      default:
        setAnnualIncome(0);
        break;
    }

    const taxRates = {
      18200: "0%",
      45000: "Nil + 19% of excess over $18,200",
      120000: "$5,092 + 32.5% of excess over $45,000",
      180000: "$29,467 + 37% of excess over $120,000",
      180001: "$51,667 + 45% of excess over $180,000",
    };

    const taxRate = taxRates[annualIncome] || "Invalid or unknown income range";
    setTaxRate(taxRate);
    let taxToBePaid = 0;

    if (annualIncome <= 18200) {
      taxToBePaid = 0;
    } else if (annualIncome <= 45000) {
      taxToBePaid = netCapitalGains * 0.19;
    } else if (annualIncome <= 120000) {
      taxToBePaid = netCapitalGains * 0.325;
    } else if (annualIncome <= 180000) {
      taxToBePaid = netCapitalGains * 0.37;
    } else {
      taxToBePaid = netCapitalGains * 0.45;
    }

    setTaxToBePaid(taxToBePaid);
  };

  return (
    <Box p={2} m={8} >
      <Flex p={4}>
        <FormControl>
          <Flex p={4}>
            <FormLabel>Financial Year</FormLabel>
            <Select placeholder="FY 2023-24" bg="#EFF5F5">
              <option value="FY 2023-24">FY 2023-24</option>
            </Select>
          </Flex>
        </FormControl>

        <FormControl>
          <Flex p={4}>
            <FormLabel>Country</FormLabel>
            <Select placeholder="Australia" bg="#EFF5F5">
              <option value="Australia">Australia</option>
            </Select>
          </Flex>
        </FormControl>
      </Flex>
      <hr></hr>

      <Flex p={4}>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Enter Purchase Price of Crypto</FormLabel>
            <Input
              type="number"
              placeholder="$ 30,000"
              name="purchasePrice"
              value={purchasePrice}
              onChange={handleInputChange}
              bg="#EFF5F5"
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Enter Sale Price of Crypto</FormLabel>
            <Input
              type="number"
              placeholder="$ 20,000"
              name="salePrice"
              value={salePrice}
              onChange={handleInputChange}
              bg="#EFF5F5"
            />
          </Flex>
        </FormControl>
      </Flex>

      <Flex p={4}>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Enter Your Expenses</FormLabel>
            <Input
              type="number"
              placeholder="$ 5,000"
              name="expenses"
              value={expenses}
              onChange={handleInputChange}
              bg="#EFF5F5"
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Investment Type</FormLabel>
            <Flex>
              <Box mr={2} w="40%">
                <Button
                  onClick={() => setInvestmentType("ShortTerm")}
                  bg="#EFF5F5"
                >
                  Short Term
                </Button>
                <p>&lt; 12 months</p>
              </Box>
              <Box w="40%">
                <Button
                  onClick={() => setInvestmentType("LongTerm")}
                  bg="#EFF5F5"
                  ml={3}
                >
                  Long Term
                </Button>
                <p>&gt; 12 months</p>
              </Box>
            </Flex>
          </Flex>
        </FormControl>
      </Flex>

      <Flex p={4}>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Select Your Annual Income</FormLabel>
            <Select
              placeholder="select annual income"
              name="annualIncome"
              value={annualRange}
              onChange={handleInputChange}
              bg="#EFF5F5"
            >
              <option value="$0-$18,200">$0-$18,200</option>
              <option value="$18,201-$45,000">$18,201-$45,000</option>
              <option value="$45,001-$120,000">$45,001-$1,20,000</option>
              <option value="$120,001-$180,000">$1,20,001-$1,80,000</option>
              <option value="$180,001+">$1,80,001+</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl>
          <Flex flexDir="column" p={3}>
            <FormLabel>Tax Rate</FormLabel>
            <Text textAlign={"left"}>{taxRate}</Text>
          </Flex>
        </FormControl>
      </Flex>

      {/* Results Part */}
      <Flex>
        <Box w="50%">
          <Flex p={4}>
            <FormControl>
              <Flex flexDir="column" p={3}>
                <FormLabel>Capital Gains Amount</FormLabel>
                <Text
                  textAlign={"left"}
                  bg="#EFF5F5"
                  w="auto"
                  pt={2}
                  height={10}
                  borderRadius={4}
                  paddingLeft={6}
                >
                  $ {capitalGainsAmount}
                </Text>
              </Flex>
            </FormControl>
          </Flex>
        </Box>
        <Box w="50%">
          <Flex p={4}>
            <FormControl>
              <Flex flexDir="column" p={3}>
                <FormLabel>Long Term Discount</FormLabel>
                <Text
                  textAlign={"left"}
                  bg="#EFF5F5"
                  w="auto"
                  pt={2}
                  height={10}
                  borderRadius={4}
                  paddingLeft={6}
                >
                  $ {longTermDiscount}
                </Text>
              </Flex>
            </FormControl>
          </Flex>
        </Box>
      </Flex>

      <Flex>
        <Box w="50%">
          <Flex p={4}>
            <FormControl>
              <Flex
                flexDir="column"
                p={3}
                bg="#C8FFE0"
                textAlign="center"
                borderRadius={8}
              >
                <FormLabel textAlign="center">
                  Net Capital Gains tax Amount
                </FormLabel>
                <Text textAlign="center" fontSize="2xl" color={"green"}>
                  $ {netCapitalGains}
                </Text>
              </Flex>
            </FormControl>
          </Flex>
        </Box>
        <Box w="50%">
          <Flex p={4}>
            <FormControl>
              <Flex
                flexDir="column"
                p={3}
                bg="#DDF2FD"
                textAlign="center"
                borderRadius={8}
              >
                <FormLabel textAlign="center">
                  The tax you need to pay *
                </FormLabel>
                <Text textAlign="center" fontSize="2xl" color={"blue"}>
                  $ {taxToBePaid}
                </Text>
              </Flex>
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Crypto;
