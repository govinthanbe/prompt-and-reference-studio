import { useState } from "react";
import { z } from "zod";
import { Loader2, Check, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});
type Fields = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Fields] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: r.data.name,
        email: r.data.email,
        subject: r.data.subject,
        message: r.data.message,
      });
      if (error) throw error;
      setStatus("success");
      e.currentTarget?.reset?.();
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full border-b bg-transparent py-4 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ember";
  const fields: { name: keyof Fields; label: string; type?: string }[] = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "subject", label: "Subject" },
  ];
  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="sr-only">{f.label}</label>
          <input id={f.name} name={f.name} type={f.type ?? "text"} placeholder={f.label} className={field} aria-invalid={!!errors[f.name]} />
          {errors[f.name] && <p className="mt-2 text-sm text-destructive">{errors[f.name]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea id="message" name="message" rows={4} placeholder="Message" className={`${field} resize-none`} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-2 text-sm text-destructive">{errors.message}</p>}
      </div>
      <button type="submit" disabled={status === "loading"} className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-secondary px-9 py-5 eyebrow text-foreground transition-all duration-500 hover:bg-primary hover:text-primary-foreground disabled:opacity-60 sm:w-auto">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : status === "success" ? <><Check className="h-4 w-4" /> Sent</> : <>Send Message <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></>}
      </button>
      <p role="status" className="text-sm text-muted-foreground">
        {status === "success" && "Thanks! Your email app should open with the message ready to send."}
        {status === "error" && <span className="text-destructive">Something went wrong. Please email me directly.</span>}
      </p>
    </form>
  );
}
