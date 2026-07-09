// app/components/AddTodoForm.tsx
//
// Plain Server Component. The <form action={addTodoAction}> wiring is what
// makes this a Server Action mutation — no client JS, no onSubmit handler,
// and it still works with JavaScript disabled thanks to progressive
// enhancement of React/Next.js forms.
import { addTodoAction } from "../actions";

export default function AddTodoForm() {
  return (
    <form action={addTodoAction} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="What needs doing?"
        required
        className="flex-1 rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
      />
      <button
        type="submit"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Add
      </button>
    </form>
  );
}
