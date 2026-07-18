import { Download, FileText, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DownloadsPage() {
  const materials = [
    { title: "R23 Regulations Syllabus (CSE)", category: "SYLLABUS", size: "2.4 MB", type: "PDF", downloads: 1240 },
    { title: "Data Structures - 2023 Previous Year Question Paper", category: "PYQ", size: "1.1 MB", type: "PDF", downloads: 890 },
    { title: "Database Systems Complete Lecture Notes (Sem 5)", category: "STUDY_MATERIAL", size: "14.5 MB", type: "PDF", downloads: 2150 },
    { title: "Machine Learning Fundamentals Lab Manual", category: "NOTES", size: "4.8 MB", type: "PDF", downloads: 640 },
    { title: "Software Engineering Unit 1 to 5 Formula Sheet", category: "STUDY_MATERIAL", size: "850 KB", type: "PDF", downloads: 1420 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Study Materials & Downloads</h1>
        <p className="text-sm text-muted-foreground">Syllabus documents, previous year question papers (PYQs), and lecture notes</p>
      </div>

      <div className="space-y-3">
        {materials.map((m, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl gradient-primary text-white shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{m.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Badge variant="glass" className="text-[10px] text-primary">{m.category}</Badge>
                  <span>{m.size}</span>
                  <span>•</span>
                  <span>{m.downloads} downloads</span>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 shrink-0">
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
