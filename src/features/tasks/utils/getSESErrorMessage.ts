const SES_ERROR_MESSAGES: Record<string, string> = {
  MessageRejected:
    "El email fue rechazado. Es posible que la dirección de correo electronico no esté verificada.",
  MailFromDomainNotVerifiedException:
    "El dominio de origen no está verificado en AWS SES.",
  ConfigurationSetDoesNotExistException:
    "La configuración de envío no existe. Contacta con soporte.",
  LimitExceededException:
    "Se ha superado el límite de envíos. Espera unos minutos e inténtalo de nuevo.",
  TooManyRequestsException:
    "Demasiadas solicitudes en poco tiempo. Espera unos segundos e inténtalo de nuevo.",
  AccountSendingPausedException:
    "El envío de emails está pausado en esta cuenta. Contacta con soporte.",
  SendingPausedException:
    "El envío está temporalmente pausado. Inténtalo más tarde.",
  InvalidParameterValueException:
    "Los datos del email no son válidos. Revisa el destinatario y el contenido.",
  AccessDeniedException:
    "Sin permisos para enviar emails. Contacta con el administrador.",
};

export function getSESErrorMessage(code: string): string {
  return (
    SES_ERROR_MESSAGES[code] ??
    "No se pudo enviar el resumen. Inténtalo de nuevo."
  );
}
