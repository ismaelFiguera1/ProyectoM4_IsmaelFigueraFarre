import { useState } from "react";
import type { Task } from "../types/task";
import { buildTaskSummary } from "../utils/buildTaskSummary";
import { sendTaskSummaryEmail } from "../services/taskEmailService";

interface SendTaskSummaryButtonProps {
  userEmail: string;
  tasks: Task[];
}

export function SendTaskSummaryButton({
  userEmail,
  tasks,
}: SendTaskSummaryButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSendSummary() {
    setIsSending(true);
    setMessage(null);
    setIsError(false);

    try {
      const summary = buildTaskSummary(tasks);
      await sendTaskSummaryEmail({ to: userEmail, summary });
      setMessage("Resumen enviado correctamente.");
    } catch (err) {
      setIsError(true);
      setMessage(
        err instanceof Error ? err.message : "No se pudo enviar el resumen."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section>
      <button
        className="btn btn-outline-warning btn-sm"
        type="button"
        onClick={handleSendSummary}
        disabled={isSending}
      >
        {isSending ? "Enviando..." : "Enviar resumen por email"}
      </button>
      {message && (
        <p
          className={`mt-2 mb-0 small ${
            isError ? "text-danger" : "text-success"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
