const sqlQueries = {
    countEmandates:`SELECT COUNT(id) AS count FROM e_mandates `,
    getTotalNachStatusCount:` SELECT
    organizations.id AS org_id,
    organizations.name AS org_name,
    COUNT(dm.id) AS totalRecodes,
    COUNT(CASE WHEN dm.status = 0 THEN 1 ELSE NULL END) AS pending,
     COUNT(CASE WHEN dm.status = 3 THEN 1 ELSE NULL END) AS rejectedByAdmin,
    COUNT(CASE WHEN dm.status = 4 THEN 1 ELSE NULL END) AS accepted,
    COUNT(CASE WHEN dm.status = 5 THEN 1 ELSE NULL END) AS processing,
    COUNT(CASE WHEN dm.status = 6 THEN 1 ELSE NULL END) AS incomplete
  FROM nach_mandates AS dm
  LEFT JOIN organizations
      ON dm.org_id = organizations.id
      GROUP BY organizations.id`,
  InsertInVPA:`INSERT INTO checkvpaapi (pgMerchantId, pspRefNo, payeeType)
  VALUES (?,?,?)`
}


module.exports = sqlQueries