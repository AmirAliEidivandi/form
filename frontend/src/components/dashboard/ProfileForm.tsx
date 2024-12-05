import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { FormInput } from "../form/FormInput";
import { GenreCheckbox } from "../form/GenreCheckbox";
import { PhoneIcon, AtSymbolIcon, UserIcon, BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ProfileData {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  phone: string;
  occupation: string;
  location: string;
  bio: string;
  favoriteGenres: string[];
}

export function ProfileForm() {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    phone: "",
    occupation: "",
    location: "",
    bio: "",
    favoriteGenres: [],
  });

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", 
    "Horror", "Romance", "Sci-Fi", "Thriller", "Documentary"
  ];

  const handleGenreChange = (genre: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      favoriteGenres: checked
        ? [...prev.favoriteGenres, genre]
        : prev.favoriteGenres.filter((g) => g !== genre),
    }));
  };

  return (
    <form className="space-y-6 max-w-3xl mx-auto pb-8">
      {/* Basic Information */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg shadow-sm`}>
        <h2 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t("profile.basicInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label={t("profile.firstName")}
            id="firstName"
            name="firstName"
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            icon={<UserIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />

          <FormInput
            label={t("profile.lastName")}
            id="lastName"
            name="lastName"
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            icon={<UserIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg shadow-sm`}>
        <h2 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t("profile.contactInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label={t("profile.email")}
            id="email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, email: e.target.value }))
            }
            icon={<AtSymbolIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />

          <FormInput
            label={t("profile.phone")}
            id="phone"
            name="phone"
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, phone: e.target.value }))
            }
            icon={<PhoneIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg shadow-sm`}>
        <h2 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t("profile.additionalInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label={t("profile.occupation")}
            id="occupation"
            name="occupation"
            type="text"
            value={profileData.occupation}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, occupation: e.target.value }))
            }
            icon={<BriefcaseIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />

          <FormInput
            label={t("profile.location")}
            id="location"
            name="location"
            type="text"
            value={profileData.location}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, location: e.target.value }))
            }
            icon={<MapPinIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />

          <FormInput
            label={t("profile.nickname")}
            id="nickname"
            name="nickname"
            type="text"
            value={profileData.nickname}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, nickname: e.target.value }))
            }
            icon={<UserIcon className="w-5 h-5" />}
            className={`${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="bio"
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {t("profile.bio")}
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className={`mt-1 block w-full rounded-lg shadow-sm
              ${isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
              }
              ${isRTL ? 'text-right pr-3' : 'text-left pl-3'}
              focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            `}
            value={profileData.bio}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Favorite Genres */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg shadow-sm`}>
        <h2 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t("profile.favoriteGenres")}
        </h2>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isRTL ? "text-right" : "text-left"}`}>
          {genres.map((genre) => (
            <GenreCheckbox
              key={genre}
              label={t(`genres.${genre.toLowerCase()}`)}
              checked={profileData.favoriteGenres.includes(genre)}
              onChange={(checked) => handleGenreChange(genre, checked)}
              className={isRTL ? "space-x-reverse" : ""}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white
            ${isDarkMode ? "bg-indigo-500 hover:bg-indigo-600" : "bg-indigo-600 hover:bg-indigo-700"}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition-colors duration-200
          `}
        >
          {t("common.saveChanges")}
        </button>
      </div>
    </form>
  );
}