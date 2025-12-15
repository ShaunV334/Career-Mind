"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function ResumeBuilder() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [generated, setGenerated] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const generatePDF = async () => {
    if (!previewRef.current) return;
    // Helper to load external script
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });

    let jsPDF: any = null;

    // Try to import jsPDF from node_modules, otherwise fall back to UMD
    try {
      // @ts-ignore
      const jspdfMod = await import('jspdf');
      jsPDF = jspdfMod?.jsPDF ?? jspdfMod?.default?.jsPDF ?? jspdfMod?.default ?? jspdfMod;
    } catch (err) {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
        // @ts-ignore
        const jspdfGlobal = (window as any).jspdf || (window as any).jsPDF || (window as any).jspdf?.jsPDF;
        jsPDF = jspdfGlobal?.jsPDF ?? jspdfGlobal ?? (window as any).jsPDF;
      } catch (err2) {
        console.error('jsPDF not available', err, err2);
        alert('PDF generation requires jsPDF. Please run `npm install jspdf` and restart the dev server.');
        return;
      }
    }

    if (!jsPDF) {
      alert('jsPDF is not available. Install `jspdf` or allow external script loading.');
      return;
    }

    // Build PDF using text rendering (avoids html2canvas and CSS parsing issues)
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const maxWidth = pageWidth - margin * 2;
    let y = 40;

    const addWrappedText = (text: string, fontSize = 12, fontStyle: any = 'normal', gap = 8) => {
      pdf.setFontSize(fontSize);
      if (fontStyle === 'bold') pdf.setFont(undefined, 'bold');
      else pdf.setFont(undefined, 'normal');
      const lines = pdf.splitTextToSize(text, maxWidth);
      for (const line of lines) {
        if (y > pageHeight - 40) {
          pdf.addPage();
          y = 40;
        }
        pdf.text(line, margin, y);
        y += fontSize + 4;
      }
      y += gap;
    };

    // Header
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text(form.fullName || 'Full Name', margin, y);
    y += 22;

    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    const contactLine = [form.title, form.email, form.phone, form.location].filter(Boolean).join(' | ');
    if (contactLine) {
      addWrappedText(contactLine, 11, 'normal', 10);
    }

    if (form.summary) {
      addWrappedText('Summary', 13, 'bold', 6);
      addWrappedText(form.summary, 11, 'normal', 10);
    }

    if (form.experience) {
      addWrappedText('Experience', 13, 'bold', 6);
      const expLines = form.experience.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      for (const ex of expLines) addWrappedText(ex, 11, 'normal', 6);
    }

    if (form.education) {
      addWrappedText('Education', 13, 'bold', 6);
      const eduLines = form.education.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      for (const ed of eduLines) addWrappedText(ed, 11, 'normal', 6);
    }

    if (form.skills) {
      addWrappedText('Skills', 13, 'bold', 6);
      addWrappedText(form.skills, 11, 'normal', 6);
    }

    pdf.save(`${form.fullName || 'resume'}-resume.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    // small delay to ensure preview renders before PDF generation if user clicks download next
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CareerMind
              </h1>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Resume Builder (ATS Friendly)</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" className="p-3 border rounded-lg" required />
                <input name="title" value={form.title} onChange={handleChange} placeholder="Professional title (e.g. Software Engineer)" className="p-3 border rounded-lg" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 border rounded-lg" required />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-3 border rounded-lg" />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="p-3 border rounded-lg" />
              </div>

              <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Professional summary (1-3 sentences)" className="p-3 border rounded-lg h-24" />

              <textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (each role on new line: Company - Role - Dates - bullets)" className="p-3 border rounded-lg h-32" />

              <textarea name="education" value={form.education} onChange={handleChange} placeholder="Education (each on new line: Degree - Institution - Year)" className="p-3 border rounded-lg h-24" />

              <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="p-3 border rounded-lg h-24" />

              <div className="flex gap-4 mt-4">
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Generate Resume</Button>
                {generated && (
                  <Button onClick={generatePDF} className="bg-gray-200 text-gray-900">Download PDF</Button>
                )}
              </div>
            </form>

            {/* Preview area (ATS simple formatting) */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Preview</h3>
              <div ref={previewRef} className="bg-white p-6 border rounded-lg text-black" style={{width: '800px', maxWidth: '100%'}}>
                <div className="text-2xl font-bold">{form.fullName || 'Full Name'}</div>
                <div className="font-medium text-gray-700 mb-2">{form.title}</div>
                <div className="text-sm text-gray-700 mb-4">{form.email}{form.phone ? ` | ${form.phone}` : ''}{form.location ? ` | ${form.location}` : ''}</div>

                {form.summary && (
                  <div className="mb-4">
                    <div className="font-semibold">Summary</div>
                    <div className="text-sm">{form.summary}</div>
                  </div>
                )}

                {form.experience && (
                  <div className="mb-4">
                    <div className="font-semibold">Experience</div>
                    <div className="text-sm whitespace-pre-line">{form.experience}</div>
                  </div>
                )}

                {form.education && (
                  <div className="mb-4">
                    <div className="font-semibold">Education</div>
                    <div className="text-sm whitespace-pre-line">{form.education}</div>
                  </div>
                )}

                {form.skills && (
                  <div>
                    <div className="font-semibold">Skills</div>
                    <div className="text-sm">{form.skills}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 CareerMind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
