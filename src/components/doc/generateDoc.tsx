import { saveAs } from 'file-saver';
import jsPDF from "jspdf";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/config";
import { AtestadoEscolaridadeInputsProps } from "../../interfaces/Interface";
import autoTable from 'jspdf-autotable';

import getMonthName from '@/utils/contants';
const url = "https://firebasestorage.googleapis.com/v0/b/profs-database.appspot.com/o/carlinfabris.docx?alt=media&token=4103bff3-c968-4710-b57f-7fbadd635ddf";

export const CreatePdf = async (aluno: AtestadoEscolaridadeInputsProps) => {
  const pathReference = ref(storage, url);

  getDownloadURL(pathReference)
    .then(async (url) => {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40; // Ajuste a margem conforme necessário
      const maxWidth = pageWidth - 2 * margin;
      doc.setFont('helvetica', 'normal');
//imagem do logo
  const imagePath = 'https://i.ibb.co/JkFZz7j/carlin.jpg'
  const image = new Image();
  image.src = imagePath;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  // Ajuste as dimensões conforme necessário
  const imageProps = doc.getImageProperties(image);
  const aspectRatio = imageProps.width / imageProps.height;
  const imageHeight = 40; // Set the desired image height
  const imageWidth = imageHeight * aspectRatio;
  const imageX = pageWidth / 2 - imageWidth / 2;
  const imageY = 10; // Set the desired Y position for the image
  doc.addImage(image, imageProps.fileType, imageX, imageY, imageWidth, imageHeight);
      
      // Centralizar cabeçalho
      doc.setFontSize(12);
      const header = "Prefeitura Municipal de Caxias do Sul\nSecretaria Municipal da Educação\nEMEF Carlin Fabris";
      const headerLines = doc.splitTextToSize(header, maxWidth);
      doc.text(headerLines, pageWidth / 2, 60, { align: 'center' });

      // Título centralizado
      doc.setFontSize(14);
      doc.text("ATESTADO DE ESCOLARIDADE", pageWidth / 2, 100, { align: 'center' });

      // Corpo do documento como tabela para conseguir o texto justificado
      doc.setFontSize(12);
      const bodyText = `          Atestamos, para os devidos fins, que o(a) estudante ${aluno.nome_do_aluno} está ` +
        `regularmente matriculado(a) em nosso estabelecimento de ensino no ano letivo de 2024. ` +
        `O(a) aluno(a) está cursando, atualmente, o ${aluno.ano_do_ensino_fundamental} do ensino fundamental, ` +
        `no turno da ${aluno.turno}.`;

       autoTable(doc, {
        startY: 90,
        theme: 'plain',
        head: [['']],
        body: [[bodyText]],
        styles: { cellPadding: 5, fontSize: 12, halign: 'justify', overflow: 'linebreak' },
        columnStyles: { 0: { cellWidth: pageWidth - 25 } }, // Largura da coluna para encaixar no espaço da página
      });

      
      // Data centralizada
      const today = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('/')
      const todayDate = new Date();
      let paragraph;
      const formattedDate = `Caxias do Sul, ${todayDate.getDate()} de ${getMonthName(
        todayDate.getMonth()
      )} de ${todayDate.getFullYear()}.`;
      doc.setFontSize(11);
      doc.text(formattedDate, pageWidth / 2, 180, { align: 'center' });

      // Rodapé centralizado
      doc.setFontSize(10);
      const footer = "Av. Conceição, nº 1610\nFone: (54) 3698-4139 • emef.carlin.fabris@edu.caxias.rs.gov.br";
      const footerLines = doc.splitTextToSize(footer, maxWidth);
      doc.text(footerLines, pageWidth / 2, 280, { align: 'center' });

      // Gerar PDF
      const pdfBlob = doc.output('blob');
      saveAs(pdfBlob, `AtestadoEscolaridade-${aluno.nome_do_aluno}.pdf`);
    })
    .catch((error) => {
      console.error("Error getting download URL:", error);
    });
};
