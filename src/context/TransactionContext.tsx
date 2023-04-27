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
  setTransactions: (transactions: TransactionProps[]) => void;
  registerTransaction: (transaction: TransactionProps) => void;
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
      }).format(new Date(transaction?.date));

      return {
        ...transaction,
        amount,
        date,
      };
    })
    .reverse();

  async function getStorageTransactions() {
    const response = await AsyncStorage.getItem(key);

    const transactions = JSON.parse(response) || [];

    setTransactions(transactions);
  }

  useEffect(() => {
    getStorageTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions: formattedTransactions,
        setTransactions,
        registerTransaction,
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
