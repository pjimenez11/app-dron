import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useGeneratePDF = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (!contentRef.current) return;

    const input = contentRef.current;

    html2canvas(input).then(() => {
      const pdf = new jsPDF("p", "mm", "a4");
      let yPos = 10;
      const imagesPromises: Promise<void>[] = [];

      input.querySelectorAll(".chart-container").forEach((chartContainer, index) => {
        const chartCanvas = chartContainer.querySelector("canvas");
        if (chartCanvas) {
          imagesPromises.push(
            html2canvas(chartCanvas).then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const imgProps = pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
              const pdfHeight = ((imgProps.height * pdfWidth) / imgProps.width)-20;

              if (index % 2 === 0) {
                if (yPos + pdfHeight > pdf.internal.pageSize.getHeight() - 10) {
                  pdf.addPage();
                  yPos = 10;
                }
                pdf.addImage(imgData, "PNG", 10, yPos, pdfWidth / 2 - 5, pdfHeight/2);
              } else {
                pdf.addImage(imgData, "PNG", pdfWidth / 2 + 10, yPos, pdfWidth / 2, pdfHeight/2);
                yPos += pdfHeight/2;
              }
            })
          );
        }
      });

      Promise.all(imagesPromises).then(() => {
        pdf.save("admin_content.pdf");
      });
    });
  };

  return { contentRef, generatePDF };
};

export default useGeneratePDF;
