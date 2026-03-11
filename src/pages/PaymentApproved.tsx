import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLanguage } from "@/context/LanguageContext";

type EmailStatus = "idle" | "sending" | "sent" | "error";

async function sendConfirmationEmail(
  email: string,
  name: string,
  lang: string,
): Promise<boolean> {
  try {
    const response = await fetch("/api/send-payment-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, lang }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export default function PaymentApproved() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const searchString = useSearch();
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const emailSentRef = useRef(false);

  const params = new URLSearchParams(searchString);
  const email = params.get("email") ?? "";
  const name = params.get("name") ?? "";

  useEffect(() => {
    if (!email || emailSentRef.current) return;
    emailSentRef.current = true;

    setEmailStatus("sending");
    sendConfirmationEmail(email, name, language).then((ok) => {
      setEmailStatus(ok ? "sent" : "error");
    });
  }, [email, name, language]);

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-0 z-50 w-full bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="group relative text-xl sm:text-2xl transition-transform duration-300 hover:rotate-[-5deg] flex-shrink-0 flex items-center gap-2"
            >
              <img
                src="/assets/logo-icon.png"
                alt="Julio Develop"
                className="h-12 w-12"
              />
            </Link>

            <div className="flex items-center space-x-4">
              <button
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition-colors"
                onClick={toggleLanguage}
                aria-label={
                  language === "pt"
                    ? "Switch to English"
                    : "Mudar para Português"
                }
              >
                {language.toUpperCase()}
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-24 w-24 text-primary mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("payment.title")}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {t("payment.description")}
          </p>

          {email && (
            <EmailStatusBadge status={emailStatus} email={email} lang={language} />
          )}

          {!email && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
              {t("payment.confirmation_note")}
            </p>
          )}

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            {t("payment.back_home")}
          </Link>
        </motion.div>
      </main>

      <footer className="py-6 text-center border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Julio Develop.{" "}
          {t("footer.all_rights_reserved")}
        </p>
      </footer>
    </div>
  );
}

function EmailStatusBadge({
  status,
  email,
  lang,
}: {
  status: EmailStatus;
  email: string;
  lang: string;
}) {
  const isPt = lang === "pt";

  const messages: Record<EmailStatus, string> = {
    idle: "",
    sending: isPt
      ? `Enviando confirmação para ${email}...`
      : `Sending confirmation to ${email}...`,
    sent: isPt
      ? `E-mail de confirmação enviado para ${email}`
      : `Confirmation email sent to ${email}`,
    error: isPt
      ? "Não foi possível enviar o e-mail de confirmação"
      : "Could not send confirmation email",
  };

  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex items-center justify-center gap-2 text-sm"
    >
      {status === "sending" && (
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
      )}
      {status === "sent" && <Mail className="h-4 w-4 text-primary" />}
      <span
        className={
          status === "error"
            ? "text-red-500"
            : "text-gray-500 dark:text-gray-400"
        }
      >
        {messages[status]}
      </span>
    </motion.div>
  );
}
