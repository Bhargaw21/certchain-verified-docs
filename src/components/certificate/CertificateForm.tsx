
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCertificates } from "@/context/CertificateContext";
import { Certificate } from "@/types";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientEmail: z.string().email("Invalid email address"),
  issuerName: z.string().min(2, "Issuer name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  template: z.enum(["standard", "professional", "academic"]),
  issueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  expiryDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CertificateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCertificate } = useCertificates();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      recipientName: "",
      recipientEmail: "",
      issuerName: "",
      description: "",
      template: "standard",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure all required fields are present for the Certificate type
      const certificateData = {
        title: values.title,
        recipientName: values.recipientName,
        recipientEmail: values.recipientEmail,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate,
        issuerName: values.issuerName,
        description: values.description,
        template: values.template
      };
      
      const certificate = await addCertificate(certificateData);
      // Navigate to the certificate view page
      navigate(`/certificate/${certificate.id}`);
    } catch (error) {
      console.error("Error creating certificate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Blockchain Developer Certification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Template</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Blockchain Academy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Leave blank if certificate doesn't expire
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what this certificate represents..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-certify-purple hover:bg-certify-purpleDark"
          >
            {isSubmitting ? "Creating Certificate..." : "Issue Certificate"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
