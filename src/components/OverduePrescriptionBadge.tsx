import { useEffect, useState } from "react"
import { getStoredAppointments } from "@/lib/storage" // or API
import type { Appointment } from "@/types/appointment"
import type { MedicalRecord, Prescription } from "@/types/medical-record"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getMedicalRecordsByPatientId } from "@/lib/medical-records"

interface Props {
  patientId: string
}
export function OverduePrescriptionBadge({ patientId }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const appts = getStoredAppointments().filter((a) => a.patientId === patientId)
    const recs = getMedicalRecordsByPatientId(patientId)
    setAppointments(appts)
    setMedicalRecords(recs)
  }, [patientId])

  const today = new Date().toISOString().split("T")[0]

  const futureAppointments = appointments
    .filter((a) => a.patientId === patientId && a.date > today)
    .map((a) => a.date)

  const overduePrescriptions: { record: MedicalRecord; prescription: Prescription }[] = []

  for (const record of medicalRecords) {
    if (record.patientId !== patientId || !record.prescriptions) continue

    for (const prescription of record.prescriptions) {
      const reviewDate = prescription.nextReviewDate
      if (
        reviewDate &&
        reviewDate < today &&
        !futureAppointments.some((date) => date > reviewDate)
      ) {
        overduePrescriptions.push({ record, prescription })
      }
    }
  }

  if (overduePrescriptions.length === 0) return null

  return (
    <>
      <Badge
        variant="destructive"
        className="ml-2 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        ⚠️ Overdue
      </Badge>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Overdue Prescriptions</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            {overduePrescriptions.map(({ record, prescription }, i) => (
              <div key={`${record.id}-${prescription.id}`} className="border p-2 rounded">
                <p className="font-medium">#{i + 1} - Visit: {record.visitDate}</p>
                {prescription.medicines.map((med, j) => (
                  <p key={j}>
                    • <strong>{med.medicineName}</strong> – {med.dosage}, {med.frequency},{" "}
                    {med.duration}
                  </p>
                ))}
                {prescription.notes && (
                  <p className="text-xs text-muted-foreground">📝 {prescription.notes}</p>
                )}
                <p className="text-xs text-red-500 font-medium">
                  📅 Next Review Date: {prescription.nextReviewDate} (Overdue)
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 text-right">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
