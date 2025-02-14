export interface AmountData {
  amount: string;
  tax_amount: string;
  total_amount: string;
}

export interface ConvertedAmounts {
  amount_npr: string;
  tax_amount_npr: string;
  total_amount_npr: string;
  exchange_rate: number;
  error?: string;
}

export async function convertUSDToNPR(
  amountData: AmountData
): Promise<ConvertedAmounts> {
  try {
    const { amount, tax_amount, total_amount } = amountData;
    const myHeaders = new Headers();
    myHeaders.append("apikey", "7uFyZhv9LGMv6XMbx9LZMxSjtviZvqsZ");

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const amountUSD = parseFloat(amount);
    const taxAmountUSD = parseFloat(tax_amount);
    const totalAmountUSD = parseFloat(total_amount);

    // Fetch the current USD to NPR exchange rate (using a reliable API)
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=NPR",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching exchange rate: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    const exchangeRate = data.rates.NPR;

    if (!exchangeRate) {
      throw new Error("Could not retrieve NPR exchange rate from the API.");
    }

    const amountNPR = amountUSD * exchangeRate;
    const taxAmountNPR = taxAmountUSD * exchangeRate;
    const totalAmountNPR = totalAmountUSD * exchangeRate;

    return {
      amount_npr: amountNPR.toFixed(2),
      tax_amount_npr: taxAmountNPR.toFixed(2),
      total_amount_npr: totalAmountNPR.toFixed(2),
      exchange_rate: exchangeRate,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error converting USD to NPR:", error);
      return {
        error: error.message,
        amount_npr: "",
        tax_amount_npr: "",
        total_amount_npr: "",
        exchange_rate: 0,
      };
    } else {
      console.error("Error converting USD to NPR:", error);
      return {
        error: "An unknown error occurred",
        amount_npr: "",
        tax_amount_npr: "",
        total_amount_npr: "",
        exchange_rate: 0,
      };
    }
  }
}
