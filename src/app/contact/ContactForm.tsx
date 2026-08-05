"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.service) errors.service = "Select a service of interest.";
  if (!values.message.trim()) errors.message = "Enter a short message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const formId = useId();

  function updateField<K extends keyof FormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: wire to real endpoint
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-border bg-surface-sunken p-8 text-center"
      >
        <h2 className="font-serif text-xl font-semibold text-content-strong">
          Thank you — your message was sent.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-content-muted">
          A member of our team will follow up with you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-control border border-content-strong px-5 py-2 text-sm font-medium text-content-strong transition-colors hover:bg-surface-inverted hover:text-content-inverted"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && (
        <div
          role="alert"
          className="rounded-control border border-critical bg-surface-critical px-4 py-3 text-sm text-critical-strong"
        >
          Something went wrong sending your message. Please try again.
        </div>
      )}

      <Field
        id={`${formId}-name`}
        label="Full name"
        required
        error={errors.name}
      >
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <Field
        id={`${formId}-email`}
        label="Work email"
        required
        error={errors.email}
      >
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? `${formId}-email-error` : undefined
          }
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <Field
        id={`${formId}-company`}
        label="Company"
        required
        error={errors.company}
      >
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => updateField("company", e.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={
            errors.company ? `${formId}-company-error` : undefined
          }
          className={inputClass(Boolean(errors.company))}
        />
      </Field>

      <Field id={`${formId}-phone`} label="Phone" optional>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <Field
        id={`${formId}-service`}
        label="Service of interest"
        required
        error={errors.service}
      >
        <select
          id={`${formId}-service`}
          name="service"
          value={values.service}
          onChange={(e) => updateField("service", e.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={
            errors.service ? `${formId}-service-error` : undefined
          }
          className={inputClass(Boolean(errors.service))}
        >
          <option value="">Select a service&hellip;</option>
          {siteConfig.services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="General inquiry">General inquiry</option>
        </select>
      </Field>

      <Field
        id={`${formId}-message`}
        label="Message"
        required
        error={errors.message}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
          className={inputClass(Boolean(errors.message))}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-control bg-interactive px-6 py-3 text-sm font-semibold text-on-interactive transition-colors hover:bg-interactive-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-control border bg-surface px-3 py-2 text-sm text-content-strong",
    hasError ? "border-critical" : "border-border-control",
  ].join(" ");
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-content-strong">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {optional && (
          <span className="font-normal text-content-muted"> (optional)</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-critical">
          {error}
        </p>
      )}
    </div>
  );
}
