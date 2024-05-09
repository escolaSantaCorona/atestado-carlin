import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { FormDataAlunos } from '@/interfaces/Interface';


// Tipos permitidos para o método HTTP
type HttpMethod = 'GET' | 'POST' | 'PUT';

// Função para validar os dados de entrada e o método HTTP
const validateInput = (method: HttpMethod | undefined, data: FormDataAlunos): boolean => {
  const validMethods: HttpMethod[] = ['GET', 'POST', 'PUT'];
  if (!method || !validMethods.includes(method)) {
    return false;
  }

  // Adicionar mais validações se necessário
  // ...

  return true;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method as HttpMethod | undefined;
  const url = 'https://script.google.com/macros/s/AKfycbxRVNM7iBhLAwILSn5ciBcgJBjadFLP5Vta6mqIl62w_0YHYzThxQ-6mGER0uk6SkxzkA/exec';

  // Validando o método e os dados de entrada
  if (!validateInput(httpMethod, req.body as FormDataAlunos)) {
    return res.status(400).json({ message: 'Dados de entrada inválidos.' });
  }

  try {
    const axiosConfig: AxiosRequestConfig = {
      method: httpMethod,
      url,
      headers: { 'Content-Type': 'application/json' },
      ...(httpMethod !== 'GET' && { data: req.body }),
    };

    const response = await axios(axiosConfig);
    res.status(200).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      res.status(err.response.status).json({ message: err.response.data });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
  }
};

export default handler;
