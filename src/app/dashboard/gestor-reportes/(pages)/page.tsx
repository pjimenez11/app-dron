"use client";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import useGeneratePDF from "@/shared/hooks/useGeneratePDF";
import SeccionPanelSolares from "../components/PanelesSolares/SeccionPanelSolares";
import SeccionUAV from "../components/UAV/SeccionUAV";

const GestorReportesPage: React.FC = () => {


  const { user } = useAuthStore();

  const { contentRef, generatePDF } = useGeneratePDF();


  return (
    <div className="h-full flex flex-col gap-4" ref={contentRef}>
      <SeccionPanelSolares generatePDF={generatePDF} />
      <SeccionUAV />

      {/* <div className="flex flex-row gap-4">
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <TablePanelesSolares reports={reports} />
        </div>
        <div className="w-1/3 gap-4 flex flex-col">
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
        </div>
      </div> */}
    </div>
  );
};

export default GestorReportesPage;
