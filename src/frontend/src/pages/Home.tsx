import type { ExternalBlob } from "@/backend";
import { ImageUpload } from "@/components/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useDetectPlatform,
  useGeneratePlaybook,
} from "@/hooks/useGeneratePlaybook";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Eye,
  FileText,
  Github,
  Globe,
  Layers,
  Monitor,
  Palette,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const PLATFORM_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: Github,
  figma: Palette,
  lovable: Sparkles,
  vscode: Code2,
  vercel: Zap,
  netlify: Globe,
  default: Monitor,
};

function getPlatformIcon(
  name: string,
): React.ComponentType<{ className?: string }> {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(PLATFORM_ICONS)) {
    if (key.includes(k)) return v;
  }
  return PLATFORM_ICONS.default;
}

const EXAMPLE_GOALS = [
  "Push my Lovable project to GitHub",
  "Set up a custom domain",
  "Invite a collaborator",
  "Create a new branch and PR",
  "Configure environment variables",
];

const PLATFORMS = [
  { name: "GitHub", icon: Github },
  { name: "Figma", icon: Palette },
  { name: "VS Code", icon: Code2 },
  { name: "Vercel", icon: Zap },
  { name: "Any App", icon: Globe },
];

export default function HomePage() {
  const [screenshotBlob, setScreenshotBlob] = useState<ExternalBlob | null>(
    null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [taskGoal, setTaskGoal] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [detecting, setDetecting] = useState(false);

  const navigate = useNavigate();
  const detectPlatform = useDetectPlatform();
  const generatePlaybook = useGeneratePlaybook();
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const mutateAsyncRef = useRef(detectPlatform.mutateAsync);
  mutateAsyncRef.current = detectPlatform.mutateAsync;

  // Auto-detect platform after image upload
  useEffect(() => {
    if (!screenshotBlob) return;
    const run = async () => {
      setDetecting(true);
      try {
        const detected = await mutateAsyncRef.current(screenshotBlob);
        setPlatformName(detected);
        // Smooth scroll to step 3 after detection
        setTimeout(() => {
          step3Ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 400);
      } catch {
        toast.error("Could not detect platform. Please type it manually.");
      } finally {
        setDetecting(false);
      }
    };
    run();
  }, [screenshotBlob]);

  const handleUpload = (blob: ExternalBlob, url: string) => {
    setScreenshotBlob(blob);
    setPreviewUrl(url);
    setPlatformName("");
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const handleGenerate = async () => {
    if (!screenshotBlob || !taskGoal.trim() || !platformName.trim()) return;
    try {
      const id = await generatePlaybook.mutateAsync({
        screenshot: screenshotBlob,
        taskGoal: taskGoal.trim(),
        platformName: platformName.trim(),
      });
      navigate({ to: "/playbook/$id", params: { id: id.toString() } });
    } catch {
      toast.error("Failed to generate playbook. Please try again.");
    }
  };

  const isReady =
    !!screenshotBlob &&
    taskGoal.trim().length > 0 &&
    platformName.trim().length > 0 &&
    !detecting;

  const PlatformIcon = platformName ? getPlatformIcon(platformName) : Globe;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        {/* Decorative grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border,#334) 1px,transparent 1px),linear-gradient(90deg,var(--color-border,#334) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Teal radial glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-primary/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <Badge
              variant="secondary"
              className="gap-1.5 text-xs font-mono border-primary/30 bg-primary/10 text-primary px-3 py-1"
            >
              <Sparkles className="w-3 h-3" />
              AI-Powered · No sign-in needed
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-hero text-foreground mb-4"
          >
            Playbook{" "}
            <span className="text-primary relative">
              Studio
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Turn any app screenshot into a{" "}
            <span className="text-foreground font-medium">
              step-by-step visual guide
            </span>{" "}
            — powered by AI, ready to share.
          </motion.p>

          {/* Platform logos strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <span className="text-xs text-muted-foreground mr-1">
              Works with
            </span>
            {PLATFORMS.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/40 border border-border text-xs text-muted-foreground"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sequential Steps ───────────────────── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {/* STEP 1 — Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
          data-ocid="home.step1_card"
        >
          <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-border/50">
            <div className="step-badge">1</div>
            <div>
              <h2 className="text-subheading text-foreground">
                Upload Screenshot
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Drag &amp; drop, paste (Ctrl+V), or click to browse
              </p>
            </div>
          </div>
          <div className="p-6">
            <ImageUpload
              onUpload={handleUpload}
              value={previewUrl}
              onClear={() => {
                setScreenshotBlob(null);
                setPreviewUrl(null);
                setPlatformName("");
              }}
              data-ocid="home.image_upload"
            />
          </div>
        </motion.div>

        {/* STEP 2 — Preview + Platform detection */}
        <AnimatePresence>
          {screenshotBlob && (
            <motion.div
              ref={step2Ref}
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
              data-ocid="home.step2_card"
            >
              <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-border/50">
                <div className="step-badge">2</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-subheading text-foreground">
                    Platform Detected
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    AI is analyzing your screenshot
                  </p>
                </div>
                {/* Detection status */}
                {detecting ? (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary"
                    data-ocid="home.detecting_state"
                  >
                    <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Detecting…
                  </div>
                ) : platformName ? (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-xs text-primary font-medium"
                    data-ocid="home.platform_badge"
                  >
                    <PlatformIcon className="w-3.5 h-3.5" />
                    {platformName}
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </motion.div>
                ) : null}
              </div>

              <div className="p-6 space-y-4">
                {/* Screenshot preview */}
                {previewUrl && (
                  <div className="rounded-xl overflow-hidden border border-border/60 shadow-elevated">
                    <img
                      src={previewUrl}
                      alt="Uploaded screenshot"
                      className="w-full object-cover max-h-64 object-top"
                    />
                  </div>
                )}

                {/* Platform name editable field */}
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
                  <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      Platform name (editable)
                    </p>
                    <input
                      id="platform"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      placeholder={
                        detecting
                          ? "Detecting…"
                          : "e.g. GitHub, Lovable, Figma…"
                      }
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      data-ocid="home.platform_input"
                    />
                  </div>
                  {platformName && (
                    <PlatformIcon className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3 — Task Goal */}
        <AnimatePresence>
          {screenshotBlob && (
            <motion.div
              ref={step3Ref}
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
              data-ocid="home.step3_card"
            >
              <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-border/50">
                <div className="step-badge">3</div>
                <div>
                  <h2 className="text-subheading text-foreground">
                    What do you want to accomplish?
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Describe the task for this walkthrough guide
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <Textarea
                  id="taskGoal"
                  value={taskGoal}
                  onChange={(e) => setTaskGoal(e.target.value)}
                  placeholder="e.g. Push my Lovable project to GitHub for the first time"
                  rows={3}
                  className="resize-none text-sm"
                  data-ocid="home.task_goal_textarea"
                />

                {/* Example goal chips */}
                <div className="space-y-2">
                  <p className="text-label">Quick examples</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_GOALS.map((ex) => (
                      <button
                        key={ex}
                        type="button"
                        onClick={() => setTaskGoal(ex)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-muted/40 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-smooth"
                        data-ocid="home.example_goal_button"
                      >
                        <ChevronRight className="w-3 h-3" />
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4 — Generate */}
        <AnimatePresence>
          {screenshotBlob && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
              data-ocid="home.step4_card"
            >
              <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-border/50">
                <div className="step-badge">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-subheading text-foreground">
                    Generate Playbook
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    AI will create a full step-by-step visual guide
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Readiness checklist */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Screenshot", done: !!screenshotBlob, icon: Eye },
                    {
                      label: "Platform",
                      done: !!platformName.trim(),
                      icon: Cpu,
                    },
                    { label: "Goal", done: !!taskGoal.trim(), icon: Target },
                  ].map(({ label, done, icon: Icon }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs transition-smooth ${
                        done
                          ? "border-primary/40 bg-primary/8 text-primary"
                          : "border-border bg-muted/20 text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-medium">{label}</span>
                      {done && <CheckCircle2 className="w-3 h-3 ml-auto" />}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  type="button"
                  className="w-full gap-2 h-12 text-base font-semibold shadow-elevated"
                  onClick={handleGenerate}
                  disabled={!isReady || generatePlaybook.isPending}
                  data-ocid="home.generate_button"
                >
                  {generatePlaybook.isPending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Generating your playbook…
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Playbook
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </Button>

                {/* Inline hint */}
                {!isReady &&
                  !generating(
                    screenshotBlob,
                    detecting,
                    taskGoal,
                    platformName,
                  ) && (
                    <p
                      className="text-xs text-muted-foreground text-center"
                      data-ocid="home.hint_state"
                    >
                      {!screenshotBlob
                        ? "↑ Upload a screenshot to begin"
                        : detecting
                          ? "⏳ Detecting platform…"
                          : !platformName.trim()
                            ? "Enter the platform name above"
                            : "Describe your goal to continue"}
                    </p>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state — before upload */}
        {!screenshotBlob && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-10 space-y-3"
            data-ocid="home.empty_state"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/40 border border-border mx-auto">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Your playbook will appear here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Upload a screenshot above to get started
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2">
              {[
                { icon: FileText, label: "Auto-detected steps" },
                { icon: Layers, label: "Visual hierarchy" },
                { icon: Zap, label: "Ready in seconds" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}

// Helper to check if we're in "generating" state for the hint
function generating(
  screenshot: ExternalBlob | null,
  detecting: boolean,
  taskGoal: string,
  platformName: string,
) {
  return (
    !!screenshot && !detecting && !!taskGoal.trim() && !!platformName.trim()
  );
}
