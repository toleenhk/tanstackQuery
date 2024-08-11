"use client";
import Projects from "@/components/Projects";
import Todo from "../components/Todo";
export default function Home() {
  return (
    <div className="">
      <Todo />
      <div className="text-yellow-600 py-10">---End of Todo component.---</div>
      <div className="text-red-600 py-3">start of Project component.</div>

      <Projects />
    </div>
  );
}
