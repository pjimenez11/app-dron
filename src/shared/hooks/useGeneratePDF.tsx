import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useGeneratePDF = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (!contentRef.current) return;

    const input = contentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let yPos = 10;
    let imagesCount = 0;

    const imagesPromises: Promise<void>[] = [];

    // Añadir título centrado en la primera página
    const addTitle = () => {
      pdf.setFontSize(16);
      pdf.text("Informe UAV", pdfWidth / 2, 15, { align: "center" });
    };

    // Función para agregar una nueva página si es necesario
    const addNewPageIfNeeded = () => {
      if (imagesCount > 0 && imagesCount % 8 === 0) { // 4 filas x 2 columnas = 8 imágenes por página
        pdf.addPage();
        yPos = 10;
        addTitle(); // Añadir título en la nueva página
      }
    };

    // Iterar sobre las imágenes
    input.querySelectorAll(".chart-container").forEach((chartContainer, index) => {
      const chartCanvas = chartContainer.querySelector("div");
      if (chartCanvas) {
        imagesPromises.push(
          html2canvas(chartCanvas).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            addNewPageIfNeeded(); // Verificar si es necesario agregar una nueva página

            const colIndex = imagesCount % 2;
            const rowIndex = Math.floor(imagesCount / 2) % 4; // Máximo 4 filas

            const xPos = 10 + colIndex * (pdfWidth / 2);
            yPos = 20 + rowIndex * (pdfHeight / 4); // Ajustar yPos para dejar espacio para el título

            pdf.addImage(imgData, "PNG", xPos, yPos, pdfWidth / 2 - 20, imgHeight / 4);
            imagesCount++;
          })
        );
      }
    });

    // Asegurar que todas las promesas de imágenes se resuelvan antes de guardar el PDF
    Promise.all(imagesPromises).then(() => {
      addTitle(); // Añadir título en la última página si es necesario
      pdf.save("admin_content.pdf");
    });
  };

  return { contentRef, generatePDF };
};

export default useGeneratePDF;
