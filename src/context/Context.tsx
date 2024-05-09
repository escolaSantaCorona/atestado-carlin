//atualizado 
"use client";
import { FormDataAlunos } from "@/interfaces/Interface";
import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";


export type StringKeyedInputsProps = {
  [key: string]: any;
};


interface ChildrenProps {
  children: ReactNode;
}

interface DataContextType {
  data: FormDataAlunos[];
  sendDataToApi: (data: FormDataAlunos) => Promise<void>;
  updateDataInApi: (data: FormDataAlunos) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  data: [],
  sendDataToApi: async () => {},
  updateDataInApi:async () => {},

});

const useData = () => {
  const context = useContext(DataContext);
  return context;
};

const DataProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [data, setData] = useState<FormDataAlunos[]>([]);

  useEffect(() => {
    const getDataToApi = async () => {
      try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbxRVNM7iBhLAwILSn5ciBcgJBjadFLP5Vta6mqIl62w_0YHYzThxQ-6mGER0uk6SkxzkA/exec");
        setData(response.data);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar dados da API:", error);
      }
    };
    getDataToApi();
  }, [data]); 
  

  const sendDataToApi = async (data: FormDataAlunos) => {
    try {
      const response = await axios.post("/api/proxy?method=post", data); // Indicando que você deseja fazer uma requisição POST
      console.log('Response data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao enviar dados para a API:", error);
    }
  };
  const updateDataInApi = async (dataToUpdate: FormDataAlunos) => {
    try {
      const response = await axios.post("/api/proxy?method=post", { ...dataToUpdate, method: "put" }); 
      setData(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar os dados na API:", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, sendDataToApi,updateDataInApi }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, useData };
