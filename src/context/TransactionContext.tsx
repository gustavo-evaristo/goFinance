import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionContextProvider {
  children: ReactNode;
}

export interface TransactionProps {
  id: string;
  type: string;
  name: string;
  amount: string;
  category: string;
  date: string | Date;
}

interface TransactionContextData {
  transactions: TransactionProps[];
  formattedTransactions: TransactionProps[];
  setTransactions: (transactions: TransactionProps[]) => void;
  registerTransaction: (transaction: TransactionProps) => void;
  transactionIncome: number;
  transactionOutcome: number;
  transactionsResume: number;
  lastIcome: string;
  lastOutcome: string;
  incomeRange: string;
}

const TransactionContext = createContext({} as TransactionContextData);

const TransactionProvider = ({ children }: TransactionContextProvider) => {
  const [transactions, setTransactions] = useState([] as TransactionProps[]);

  const key = "@goFinance:transactions";

  async function registerTransaction(newTransaction: TransactionProps) {
    try {
      setTransactions((state) => [...state, newTransaction]);

      const newData = [...transactions, newTransaction];

      await AsyncStorage.setItem(key, JSON.stringify(newData));
    } catch (e) {
      console.log(e);
    }
  }

  const firstTransactionDate = Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
  }).format(new Date(transactions[0]?.date || new Date()));

  const lastTransactionDate = Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(
    new Date(transactions[transactions?.length - 1]?.date || new Date())
  );

  const incomeRange = `${firstTransactionDate} à ${lastTransactionDate}`;

  async function getStorageTransactions() {
    const response = await AsyncStorage.getItem(key);

    const transactions = JSON.parse(response) || [];

    setTransactions(transactions);
  }

  useEffect(() => {
    getStorageTransactions();
  }, []);

  const formattedTransactions = transactions
    .map((transaction: TransactionProps) => {
      const amount = Number(transaction?.amount)?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "brl",
      });

      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(transaction?.date || new Date()));

      return {
        ...transaction,
        amount,
        date,
      };
    })
    .reverse();

  const transactionIncome = Number(
    transactions.reduce((acc, item) => {
      if (item?.type === "up") {
        return acc + item?.amount;
      }

      return acc;
    }, 0)
  );

  const transactionOutcome = +transactions.reduce((acc, item) => {
    if (item?.type === "down") {
      return acc + item?.amount;
    }

    return acc;
  }, 0);

  const transactionsResume = transactionIncome - transactionOutcome;

  const lastIcome = Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(
    new Date(
      transactions
        .filter((transaction) => transaction.type === "up")
        .reverse()[0]?.date || new Date()
    )
  );

  const lastOutcome = Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(
    new Date(
      transactions
        .filter((transaction) => transaction.type === "down")
        .reverse()[0]?.date || new Date()
    )
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        formattedTransactions,
        setTransactions,
        registerTransaction,
        transactionIncome,
        transactionOutcome,
        transactionsResume,
        lastIcome,
        lastOutcome,
        incomeRange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function useTransaction() {
  const context = useContext(TransactionContext);
  return context;
}

export { TransactionProvider, useTransaction };
