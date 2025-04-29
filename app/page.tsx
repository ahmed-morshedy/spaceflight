import { Suspense } from "react";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <div className="  min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Suspense>
        <MainPage />
      </Suspense>
    </div>
  );
}
