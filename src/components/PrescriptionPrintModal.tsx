import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import SampleVetLogo from '/sample_vet_clinic_logo.jpg'
import { getPrescriptionById } from "../lib/prescription-storage";

// Print-specific styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #printable-prescription, #printable-prescription * {
      visibility: visible;
    }
    #printable-prescription {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: white !important;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }
    .no-print {
      display: none !important;
    }
  }
`;

export const PrescriptionPrintModal = ({ open, onClose, prescription, patient }) => {
    const [hospitalDetails,] = useState({
        hospitalName: 'Veterinary Teaching Hospital',
        hospitalAddress: 'Hajee Modammad Danesh Science & Technology Unversity, Dinajpur - 5200',
        hospitalLogo: SampleVetLogo
    })
    const [prescriptionDetails, setPrescriptionDetails] = useState({})
    const printRef = useRef(null)
    const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: `Prescription` })

    useEffect(() => {
        const prescriptionData = getPrescriptionById(prescription)
        setPrescriptionDetails(prescriptionData)
    }, [prescription])

    return (
        <>
            <style>{printStyles}</style>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="w-full max-w-[90vw] sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto overflow-x-auto">
                    <DialogHeader className="no-print">
                        <DialogTitle>Prescription Preview</DialogTitle>
                    </DialogHeader>

                    <div id="printable-prescription" className="bg-white p-6 text-black font-mono text-sm border border-neutral-500" ref={printRef}>
                        {/* Header */}
                        <div className="text-center mb-4">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <img src={hospitalDetails.hospitalLogo} alt="hospital logo" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">{hospitalDetails.hospitalName}</h1>
                                    <p className="text-xs">{hospitalDetails.hospitalAddress}</p>
                                </div>
                            </div>
                        </div>
                        {/* Case Information */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-xs mt-2 border border-neutral-950 p-2">
                            <div className="border-r-blue-300 border-r-1">
                                <p><strong>Case No:</strong> {patient?.caseNo || "01"}</p>
                                <p><strong>Address:</strong> {patient?.address || 'N/A'}</p>
                                <p><strong>Species:</strong> {patient?.species}</p>
                                <p><strong>No of Animal:</strong> {patient?.noOfAnimals || '01'}</p>
                            </div>
                            <div>
                                <p><strong>Owner's Name:</strong> {patient?.ownerName || 'N/A'}</p>
                                <p><strong>Age:</strong> {patient?.age || 'N/A'}</p>
                                <p><strong>Breed:</strong> {patient?.gender || 'N/A'}</p>
                                <p><strong>Water Intake:</strong> {patient?.weight || 'N/A'}</p>
                            </div>
                        </div>

                        {/* History and Clinical Signs */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-xs">
                                <p><strong>History:</strong></p>
                                <ul>
                                    {
                                        patient.history?.map(hstry => <li>{hstry}</li>)
                                    }
                                </ul>

                                <p className="mt-2"><strong>Clinical Sign:</strong></p>
                                <ul className="list-disc list-inside text-xs">
                                    {
                                        patient.clinicalSigns?.map(cs => <li>{cs}</li>)
                                    }
                                </ul>

                                <p className="mt-2"><strong>Postmortem Lesions:</strong></p>
                                <ul className="list-disc list-inside text-xs">
                                    {
                                        patient.postmortemLesions?.map(pl => <li>{pl}</li>)
                                    }
                                </ul>

                                <p className="mt-2"><strong>Tentative Diagnosis:</strong></p>
                                <p><strong>{patient.tentativeDiagnosis || 'N/A'}</strong></p>
                            </div>

                            {/* Prescription Section */}
                            <div className="border-l-2 border-green-600 pl-4 col-span-1">
                                <div className="flex items-center mb-2">
                                    <span className="text-green-600 text-2xl mr-2">℞</span>
                                </div>

                                <div className="text-xs space-y-2">
                                    {prescriptionDetails?.medicines?.map((med, index) => (
                                        <div key={index} className="mb-3">
                                            <p className="font-semibold">
                                                {index + 1}. {med.medicineName}
                                            </p>
                                            <p className="ml-4 text-xs">
                                                Sig. - {med.dosage} {med.frequency} {med.duration}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Doctor signature */}
                        <div className="text-right mt-8 mb-4">
                            <div className="inline-block">
                                <p className="text-xs mb-8">Dr. Nahid</p>
                                <div className="border-t border-black w-32 mb-1"></div>
                                <p className="text-xs">Signature</p>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-6 text-xs">
                            <p><strong>Instruction:</strong></p>
                            <ul className="list-disc list-inside text-xs mt-1">
                                {
                                    prescriptionDetails.instructions?.map(instruction => <li>{instruction}</li>)
                                }
                            </ul>
                        </div>

                        {/* Advice */}
                        <div className="mt-4 text-xs">
                            <p><strong>Advice:</strong></p>
                            <div className="mt-1 text-xs">
                                {prescriptionDetails?.notes}
                            </div>
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="no-print flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700">
                            🖨️ Proceed to Print
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};