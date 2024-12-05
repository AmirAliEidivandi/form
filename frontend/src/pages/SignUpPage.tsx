import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SignUpForm } from "../components/form/SignUpForm";
import { DarkModeToggle } from "../components/layout/DarkModeToggle";
import { LanguageSwitcher } from "../components/layout/LanguageSwitcher";
import { PageContainer } from "../components/layout/PageContainer";
import { useTheme } from "../contexts/ThemeContext";

export function SignUpPage() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-between">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
        <h2
          className={`text-center text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t("auth.createAccount")}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignUpForm />
        <p
          className={`mt-4 text-center text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {t("auth.login")}
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}