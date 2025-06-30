import html2pdf from "html2pdf.js";

export const saveInvoiceAsPDF = (element: HTMLElement, filename: string) => {
  console.log("heml element", element);
  console.log("invoice id", filename);
  html2pdf()
    .set({
      margin: 0.5,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    })
    .from(element)
    .save();
};
