import { createFileRoute } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <div className="flex-1 h-screen w-full bg-[#0F1020]">hi</div>;
}
