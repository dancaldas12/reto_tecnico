export const INSERT = `INSERT INTO appointments_country (
  appointments_country_id,
  insured_id,
  center_id,
  medical_id,
  specialty_id,
  schedule_id,
  country_iso,
  status,
  date_time,
  created_at
) VALUES (
  null,
  :insuredId,
  :centerId,
  :medicalId,
  :specialtyId,
  :scheduleId,
  :countryIso,
  :status,
  :dateTime,
	now()
);`;