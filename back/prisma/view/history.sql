-- CreateView
CREATE VIEW "vw_document_history" AS
SELECT 
    f.id,
    d.id as documento_id,
    d.nombre as documento_nombre,
    d.tipo_documento as documento_tipo,
    d.documento_blob,
    d.id_historial,
    u.name as user_name,
    u.ci as user_ci,
    u.tipo_user as user_tipo,
    t.tipo_token as token_tipo,
    c.tipo_certificado as certificado_tipo,
    tc.ci as titular_ci,
    tc.nombre as titular_nombre,
    tc.email as titular_email,
    ec.entidad as emisor_entidad
FROM "Firmar" f
LEFT JOIN "Documento" d ON f."idDocumento" = d.id
LEFT JOIN "User" u ON f."idUser" = u.id
LEFT JOIN "AsignacionToken" at ON u.id = at.id_user_asignado
LEFT JOIN "Token" t ON at.id_token = t.id
LEFT JOIN "Certificado" c ON t.id_certificado = c.id
LEFT JOIN "TitularCertificado" tc ON c.id_titular = tc.id
LEFT JOIN "EmisorCertificado" ec ON c.id_emisor = ec.id;