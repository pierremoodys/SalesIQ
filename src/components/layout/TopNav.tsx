import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/config/routes";
import ThemeToggleWrapper from "@/components/ui/ThemeToggleWrapper";

export default function TopNav() {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div
        className="flex justify-between items-center py-3 px-6 w-full border-b"
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-border-light)",
        }}
      >
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center rounded">
            <div className="flex items-center p-2">
              <Bars3Icon
                className="w-6 h-6"
                style={{ color: "var(--color-moodys-white)" }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2.5">
            <div className="flex flex-col justify-center items-center gap-2.5">
              <div className="flex flex-col justify-center items-center gap-2.5">
                <svg
                  width={97}
                  height={16}
                  viewBox="0 0 97 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.00114174 0.266171H6.1665L8.08911 8.22162L8.55291 10.431L9.01671 8.22162L10.9393 0.266171H17.1047V15.735H13.1487V5.7027L12.5957 8.00114L10.5406 15.735H6.47494L4.41982 8.00114L3.86691 5.7027V15.735H0V0.266171H0.00114174ZM33.2372 9.39255C33.2372 13.5245 30.5195 16 25.9672 16C21.4148 16 18.6971 13.5473 18.6971 9.39255V6.6086C18.6971 2.47665 21.4148 0.00114174 25.9672 0.00114174C30.5195 0.00114174 33.2372 2.45381 33.2372 6.6086V9.39255ZM25.9672 3.42596C24.0891 3.42596 22.9399 4.48722 22.9399 6.23276V9.76839C22.9399 11.4922 24.0891 12.5752 25.9672 12.5752C27.8452 12.5752 28.9944 11.4922 28.9944 9.76839V6.23276C28.9944 4.48722 27.8452 3.42596 25.9672 3.42596ZM49.2589 9.39255C49.2589 13.5245 46.5412 16 41.9889 16C37.4365 16 34.7188 13.5473 34.7188 9.39255V6.6086C34.7188 2.47665 37.4365 0.00114174 41.9889 0.00114174C46.5412 0.00114174 49.2589 2.45381 49.2589 6.6086V9.39255ZM41.9889 3.42596C40.1108 3.42596 38.9616 4.48722 38.9616 6.23276V9.76839C38.9616 11.4922 40.1108 12.5752 41.9889 12.5752C43.8669 12.5752 45.0161 11.4922 45.0161 9.76839V6.23276C45.0161 4.48722 43.8669 3.42596 41.9889 3.42596ZM64.5506 8.95045C64.5506 13.2378 61.8101 15.735 57.059 15.735H50.8274V0.266171H57.059C61.8101 0.266171 64.5506 2.76339 64.5506 7.05069V8.95159V8.95045ZM57.059 3.73554H55.0256V12.2656H57.059C59.2249 12.2656 60.3079 11.1609 60.3079 9.01671V6.98329C60.3079 4.81736 59.2249 3.7344 57.059 3.7344V3.73554ZM68.903 8.92874L63.2677 0.266171H68.0189L71.0016 5.12809L73.9626 0.266171H78.5149L72.8796 8.92874V15.735H68.9019V8.92874H68.903ZM78.9353 0.266171H83.1335V4.13309L80.4375 7.75668H79.5316L80.7254 4.46437H78.9353V0.266171ZM96.5472 10.9176C96.5472 14.1219 94.1825 16 90.1385 16C86.0945 16 83.7527 14.1654 83.7527 11.0947V10.4093H87.8412V11.0056C87.8412 12.0885 88.5266 12.5523 90.1397 12.5523C91.6202 12.5523 92.3936 12.1102 92.3936 11.2706C92.3936 10.3201 91.7527 10.1214 90.8022 9.98886L88.0183 9.56847C86.2065 9.30344 83.8418 8.3747 83.8418 5.03784C83.8418 1.70099 86.1619 0 90.1397 0C94.1174 0 96.3713 1.81179 96.3713 4.86192V5.45823H92.2827V4.94988C92.2827 3.88862 91.6419 3.44767 90.1397 3.44767C88.7254 3.44767 87.9966 3.86806 87.9966 4.68485C87.9966 5.59075 88.6157 5.78952 89.4988 5.92203L92.261 6.34242C94.1836 6.62916 96.5483 7.5579 96.5483 10.9165L96.5472 10.9176Z"
                    style={{ fill: "var(--color-moodys-white)" }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center gap-3 max-w-[600px] mx-4">
          <div
            className="search_box-1 flex justify-center items-center gap-2 h-10 w-full rounded-full border"
            style={{
              borderColor: "var(--color-border-light)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div className="flex items-center pl-3">
              <MagnifyingGlassIcon
                className="w-6 h-6"
                style={{ color: "var(--color-text-muted)" }}
              />
            </div>
            <input
              type="text"
              placeholder="Search ratings, research, analysts, and more..."
              className="flex-1 bg-transparent focus:outline-none pr-3"
              style={{ color: "var(--color-text)" }}
            />
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-end items-center gap-3">
          <ThemeToggleWrapper />
          <Link href={ROUTES.NOTIFICATIONS} className="relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              <span className="text-lg font-medium">JS</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
